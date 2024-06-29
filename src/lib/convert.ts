import {
  AssignmentExpression,
  BinaryExpression,
  BlockStatement,
  CallExpression,
  Expression,
  FunctionDeclaration,
  Identifier,
  IfStatement,
  Literal,
  LogicalExpression,
  MemberExpression,
  Node,
  Pattern,
  Program,
  Statement,
  VariableDeclaration,
  SpreadElement,
} from 'acorn';

import type * as Block from './blocks/index';
import {
  isValue,
  isMaybeBooleanValue,
  isMaybeNumberValue,
  isMaybeStringValue,
  isStatement,
  functionNameMap,
  findBlockDefinition,
} from './blocks/index';
import { Argument, Check } from '../../schema/blockDefinitions';

export function functionExpressionToBlocks(
  functionExpression: Expression
): Block.Program {
  return rootBlockToProgram(convertFunctionExpressionTop(functionExpression));
}

export function programToBlocks(program: Program): Block.Program {
  return rootBlockToProgram(convertProgramTop(program));
}

function rootBlockToProgram(rootBlock: Block.Block): Block.Program {
  const variablesIdMap: { [name: string]: Block.Id } = {};
  findVariables(rootBlock, variablesIdMap);
  const variables: Block.Variable[] = [];
  for (const key of Object.keys(variablesIdMap)) {
    variables.push({
      name: key,
      id: variablesIdMap[key]!,
    });
  }

  return {
    blocks: {
      languageVersion: 0,
      blocks: [rootBlock],
    },
    variables: variables,
  };
}

function findVariables(
  block: Block.Block,
  variablesIdMap: { [name: string]: Block.Id }
) {
  if (block.type == 'variables_set' || block.type == 'variables_get') {
    const blockVar = block.fields.VAR;
    if (blockVar == null) {
      throw new ConvertError('Block must have VAR field');
    }
    const name = blockVar.id;
    if (variablesIdMap[name] == null) {
      variablesIdMap[name] = randomId();
    }
    blockVar.id = variablesIdMap[name];
  }
  if ('inputs' in block) {
    for (const key of Object.keys(block.inputs)) {
      const input = (block.inputs as { [key: string]: { block: Block.Block } })[
        key
      ];
      if (input?.block == null) {
        continue;
      }
      findVariables(input.block, variablesIdMap);
    }
  }
  if ('next' in block && block.next != null) {
    findVariables(block.next.block, variablesIdMap);
  }
}

export class ConvertError extends Error {
  node: Node | null;
  constructor(message: string, node?: Node) {
    super(message);
    this.name = 'ConvertError';
    this.node = node ?? null;
  }
}

export class AttachError extends Error {
  block: Block.Block;
  node: Node;
  constructor(message: string, node: Node, block: Block.Block) {
    super(message);
    this.name = 'AttachError';
    this.block = block;
    this.node = node;
  }
}

type Skip = { type: 'skip' };

type Context = {
  device: string;
  level: number;
};
function convertProgramTop(program: Program): Block.Block {
  const statements: Statement[] = [];
  for (const node of program.body) {
    if (
      node.type != 'ImportDeclaration' &&
      node.type != 'ExportNamedDeclaration' &&
      node.type != 'ExportDefaultDeclaration' &&
      node.type != 'ExportAllDeclaration'
    ) {
      statements.push(node);
    }
  }
  // check if it's just a single function statement, if so then convert it as a function expression
  if (statements.length == 1) {
    const statement = statements[0]!;
    if (statement.type == 'FunctionDeclaration') {
      return convertFunctionExpressionTop(statement);
    }
    if (
      statement.type == 'ExpressionStatement' &&
      (statement.expression.type == 'FunctionExpression' ||
        statement.expression.type == 'ArrowFunctionExpression')
    ) {
      return convertFunctionExpressionTop(statement.expression);
    }
  }
  throw new ConvertError("Program isn't a function", program);
}
function convertFunctionExpressionTop(
  expr: Expression | FunctionDeclaration
): Block.Block {
  switch (expr.type) {
    case 'FunctionDeclaration':
    case 'FunctionExpression':
    case 'ArrowFunctionExpression': {
      // check if function has arguments
      if (expr.params.length != 1) {
        throw new ConvertError(
          'Function must have only one device argument',
          expr
        );
      }
      const param = expr.params[0]!;
      if (param.type != 'Identifier') {
        throw new ConvertError('Invalid function argument', param);
      }
      const ctx: Context = { device: param.name, level: 0 };
      if (expr.body.type == 'BlockStatement') {
        return convertBlockStatement(ctx, expr.body);
      } else {
        const ret = convertExpression(ctx, expr.body);
        if (ret.type == 'skip') {
          throw new ConvertError('Invalid function body', expr.body);
        }
      }
      throw new ConvertError('Invalid function body', expr.body);
    }
    default:
      throw new ConvertError('Invalid top expression type: ' + expr.type, expr);
  }
}
function convertExpression(ctx: Context, expr: Expression): Block.Block | Skip {
  switch (expr.type) {
    case 'FunctionExpression':
      throw new ConvertError('FunctionExpression not supported', expr);
    case 'Literal':
      return convertLiteral(expr);
    case 'BinaryExpression':
      return convertBinaryExpression(ctx, expr);
    case 'LogicalExpression':
      return convertLogicalExpression(ctx, expr);
    case 'Identifier':
      return convertIdentifier(ctx, expr);
    case 'AssignmentExpression':
      return convertAssignmentExpression(ctx, expr);
    case 'CallExpression':
      return convertCallExpression(ctx, expr);
    default:
      throw new ConvertError('Invalid expression type: ' + expr.type, expr);
  }
}

function convertCallExpression(
  ctx: Context,
  expr: CallExpression
): Block.Block | Skip {
  switch (expr.callee.type) {
    case 'Identifier':
      return convertIdentifierCallExpression(ctx, expr, expr.callee);
    case 'MemberExpression':
      return convertMemberCallExpression(ctx, expr, expr.callee);
    default:
      throw new ConvertError(
        'Invalid callee type: ' + expr.callee.type,
        expr.callee
      );
  }
}

function convertIdentifierCallExpression(
  ctx: Context,
  expr: CallExpression,
  identifier: Identifier
): Block.Block | Skip {
  switch (identifier.name) {
    case 'alert':
      return { type: 'skip' };
    default: {
      throw new ConvertError(
        'Invalid function call: ' + identifier.name,
        identifier
      );
    }
  }
}

function convertMemberCallExpression(
  ctx: Context,
  expr: CallExpression,
  member: MemberExpression
): Block.Block | Skip {
  if (member.object.type != 'Identifier') {
    throw new ConvertError('Invalid object type', member.object);
  }
  if (member.property.type != 'Identifier') {
    throw new ConvertError('Invalid property type', member.property);
  }
  switch (member.object.name + '.' + member.property.name) {
    case 'console.log':
      return { type: 'skip' };
    case 'Math.sin':
      return convertTrig(ctx, expr, 'SIN');
    case 'Math.cos':
      return convertTrig(ctx, expr, 'COS');
    case 'Math.tan':
      return convertTrig(ctx, expr, 'TAN');
    case 'Math.asin':
      return convertTrig(ctx, expr, 'ASIN');
    case 'Math.acos':
      return convertTrig(ctx, expr, 'ACOS');
    case 'Math.atan':
      return convertTrig(ctx, expr, 'ATAN');
    default: {
      if (ctx.device == null) {
        throw new ConvertError(
          'Invalid member call expression: ' +
            member.object.name +
            '.' +
            member.property.name,
          expr
        );
      }
      if (ctx.device != member.object.name) {
        throw new ConvertError(
          `Invalid function-calling object name: ${member.object.name}, only the device ${ctx.device} is allowed`,
          member.object
        );
      }
      const ret = convertCallExpressionToFunctionBlock(
        ctx,
        expr,
        member.property.name
      );
      if (ret == null) {
        throw new ConvertError(
          'Invalid function name: ' + member.property.name,
          member.property
        );
      }
      return ret;
    }
  }
}

function convertFunctionArg(
  ctx: Context,
  expr: Expression | SpreadElement
): Block.ValueBlock {
  if (expr.type == 'SpreadElement') {
    throw new ConvertError('SpreadElement in function argument not supported');
  }
  const ret = convertExpression(ctx, expr);
  if (ret.type == 'skip') {
    throw new ConvertError('Invalid function argument', expr);
  }
  if (!isValue(ret)) {
    throw new AttachError(
      `Function argument must be value, got ${ret.type}`,
      expr,
      ret
    );
  }
  return ret;
}
function convertTrig(
  ctx: Context,
  expr: CallExpression,
  trigFunc: Exclude<Block.MathTrigBlock['fields']['OP'], undefined>
): Block.Block | Skip {
  if (expr.arguments.length != 1) {
    throw new ConvertError(
      `Trig function ${trigFunc} requires 1 argument, got ${expr.arguments.length}`,
      expr
    );
  }
  const argBlock = convertFunctionArg(ctx, expr.arguments[0]!);
  if (!isMaybeNumberValue(argBlock)) {
    throw new AttachError(
      `Trig function argument must be number, got ${argBlock.type}`,
      expr.arguments[0]!,
      argBlock
    );
  }
  if (trigFunc == 'SIN' || trigFunc == 'COS' || trigFunc == 'TAN') {
    return {
      id: randomId(),
      type: 'math_trig',
      fields: {
        OP: trigFunc,
      },
      inputs: {
        NUM: {
          // 360/(2pi)
          block: withArithmetic(argBlock, 57.2957795131, 'MULTIPLY'),
        },
      },
    };
  } else {
    return withArithmetic(
      {
        id: randomId(),
        type: 'math_trig',
        fields: { OP: trigFunc },
        inputs: { NUM: { block: argBlock } },
      },
      // 2pi/360
      0.01745329251,
      'MULTIPLY'
    );
  }
}

function withArithmetic(
  left: Block.MaybeNumberValueBlock | Block.NumberValueBlock | number,
  right: Block.MaybeNumberValueBlock | Block.NumberValueBlock | number,
  arithmetic: Exclude<Block.MathArithmeticBlock['fields']['OP'], undefined>
): Block.MathArithmeticBlock {
  return {
    id: randomId(),
    type: 'math_arithmetic',
    fields: {
      OP: arithmetic,
    },
    inputs: {
      A: {
        block:
          typeof left == 'number'
            ? { type: 'math_number', id: randomId(), fields: { NUM: left } }
            : left,
      },
      B: {
        block:
          typeof right == 'number'
            ? { type: 'math_number', id: randomId(), fields: { NUM: right } }
            : right,
      },
    },
  };
}

// eslint-disable-next-line @typescript-eslint/ban-types
function keysOf<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

function convertCallExpressionToFunctionBlock(
  ctx: Context,
  expr: CallExpression,
  identifierName: string
): Block.Block | null {
  const key = keysOf(functionNameMap).find(
    (functionName) => functionName == identifierName
  );
  if (key == null) {
    return null;
  }
  const blockType = functionNameMap[key]!;
  if (blockType == 'text_join') {
    return convertTextJoin(ctx, expr);
  }
  let def = findBlockDefinition(blockType);
  let defArgs = def?.args0 ?? [];
  let args = defArgs.filter((arg) => arg.type != 'input_dummy');
  if (args.length != expr.arguments.length) {
    throw new ConvertError(
      `Function ${identifierName} requires ${
        defArgs.length
      } arguments, got ${expr.arguments.length}`,
      expr
    );
  }
  let inputs: { [key: string]: any } = {};
  let fields: { [key: string]: any } = {};
  for (let i = 0; i < expr.arguments.length; i++) {
    let arg = args[i]!;
    let argExpr = expr.arguments[i]!;
    if (argExpr.type == 'SpreadElement') {
      throw new ConvertError(
        'SpreadElement in function call not supported',
        argExpr
      );
    }
    addArgument(ctx, arg, argExpr, inputs, fields);
  }
  let ret: any = {
    id: randomId(),
    type: blockType as any,
  };
  // check if inputs is empty
  if (Object.keys(inputs).length > 0) {
    ret.inputs = inputs;
  }
  // check if fields is empty
  if (Object.keys(fields).length > 0) {
    ret.fields = fields;
  }
  return ret;
}

function convertTextJoin(
  ctx: Context,
  expr: CallExpression
): Block.TextJoinBlock | null {
  let inputs: Block.TextJoinBlock['inputs'] = {};
  for (let i = 0; i < expr.arguments.length; i++) {
    let argExpr = expr.arguments[i]!;
    let block = convertFunctionArg(ctx, argExpr);
    inputs[`ADD${i}`] = { block };
  }
  return {
    id: randomId(),
    type: 'text_join',
    inputs,
    extraState: {
      itemCount: expr.arguments.length,
    },
  };
}

function addArgument(
  ctx: Context,
  arg: Argument,
  expr: Expression,
  inputs: { [key: string]: any },
  fields: { [key: string]: any }
): void {
  switch (arg.type) {
    case 'input_value': {
      let block = convertExpression(ctx, expr);
      if (block.type == 'skip') {
        throw new ConvertError('Invalid argument expression', expr);
      }
      if (!isValue(block)) {
        throw new AttachError(
          `Argument must be value, got ${block.type}`,
          expr,
          block
        );
      }
      let argDef = findBlockDefinition(block.type);
      if (!checkMatches(arg?.check, argDef.output)) {
        throw new ConvertError(
          `Argument type mismatch: ${displayCheck(arg.check)} != ${displayCheck(
            argDef.output
          )}`,
          expr
        );
      }
      inputs[arg.name] = { block };
      break;
    }
    case 'input_dummy': {
      throw new ConvertError('Dummy argument not supported', expr);
    }
    case 'input_statement': {
      throw new ConvertError('Statement args not supported', expr);
    }
    case 'field_colour': {
      let literal = getLiteralString(expr);
      if (literal == null) {
        throw new ConvertError('Color argument must be literal string', expr);
      }
      fields[arg.name] = literal;
      break;
    }
    case 'field_dropdown': {
      let literal = getLiteralString(expr);
      if (literal == null) {
        throw new ConvertError(
          'Dropdown argument must be literal string',
          expr
        );
      }
      let argOptions = arg.options.map((option) => option[1]);
      if (!argOptions.includes(literal)) {
        throw new ConvertError(
          `Dropdown argument must be one of these options: ${argOptions.join(
            ', '
          )}`,
          expr
        );
      }
      break;
    }
    case 'field_number': {
      let literal = getLiteralNumber(expr);
      if (literal == null) {
        throw new ConvertError('Number argument must be literal number', expr);
      }
      fields[arg.name] = literal;
      break;
    }
    case 'field_variable': {
      throw new ConvertError('Variable argument not supported', expr);
    }
    case 'field_input': {
      let literal = getLiteralString(expr);
      if (literal == null) {
        throw new ConvertError('Input argument must be literal string', expr);
      }
      fields[arg.name] = literal;
      break;
    }
    default:
      throw new ConvertError('Unknown argument type: ' + arg);
  }
}

function checkMatches(
  recieve: Check | undefined,
  give: Check | undefined | null
): boolean {
  if (recieve == null || give == null) {
    return true;
  }
  if (
    typeof recieve == 'string' &&
    typeof give == 'string' &&
    recieve == give
  ) {
    return true;
  }
  if (typeof recieve == 'string') {
    for (let check of give) {
      if (check == recieve) {
        return true;
      }
    }
  }
  if (typeof give == 'string') {
    for (let check of recieve) {
      if (check == give) {
        return true;
      }
    }
  }
  return false;
}

function displayCheck(check: Check | undefined | null): string {
  if (check == null) {
    return 'any';
  }
  if (typeof check == 'string') {
    return check;
  }
  return check.join(' | ');
}

function getLiteralString(expr: Expression): string | null {
  if (expr.type != 'Literal') {
    return null;
  }
  if (typeof expr.value != 'string') {
    return null;
  }
  return expr.value;
}

function getLiteralNumber(expr: Expression): number | null {
  if (expr.type != 'Literal') {
    return null;
  }
  if (typeof expr.value != 'number') {
    return null;
  }
  return expr.value;
}

function convertAssignmentExpression(
  ctx: Context,
  expr: AssignmentExpression
): Block.VariablesSetBlock | Block.MathChangeBlock {
  const rightExpr = convertExpression(ctx, expr.right);
  if (rightExpr.type == 'skip') {
    throw new ConvertError('Invalid right expression', expr.right);
  }
  if (!isValue(rightExpr)) {
    throw new AttachError(
      `Right of assignment must be expression, got ${rightExpr.type}`,
      expr,
      rightExpr
    );
  }
  const name = convertPattern(expr.left);
  if (ctx.device != null && name == ctx.device) {
    throw new ConvertError(
      `Can't declare variable with name ${name}, it's reserved for device`,
      expr.left
    );
  }
  switch (expr.operator) {
    case '=':
      return {
        id: randomId(),
        type: 'variables_set',
        fields: {
          VAR: {
            id: name,
          },
        },
        inputs: {
          VALUE: { block: rightExpr },
        },
      };
    case '+=': {
      if (!isMaybeNumberValue(rightExpr)) {
        throw new AttachError(
          `Right of math_change must be number, got ${rightExpr.type}`,
          expr.right,
          rightExpr
        );
      }
      return {
        id: randomId(),
        type: 'math_change',
        fields: {
          VAR: {
            id: name,
          },
        },
        inputs: {
          DELTA: { block: rightExpr },
        },
      };
    }
    default:
      throw new ConvertError(
        'Unsupported assignment operator: ' + expr.operator
      );
  }
}

function convertLiteral(
  expr: Literal
): Block.MathNumberBlock | Block.TextBlock | Block.LogicBooleanBlock {
  switch (typeof expr.value) {
    case 'number':
      return {
        id: randomId(),
        type: 'math_number',
        fields: {
          NUM: expr.value,
        },
      };
    case 'string':
      return {
        id: randomId(),
        type: 'text',
        fields: {
          TEXT: expr.value,
        },
      };
    case 'boolean':
      return {
        id: randomId(),
        type: 'logic_boolean',
        fields: {
          BOOL: expr.value ? 'TRUE' : 'FALSE',
        },
      };
    default:
      throw new ConvertError(
        'Invalid literal type: ' + typeof expr.value,
        expr
      );
  }
}

function convertBinaryExpression(
  ctx: Context,
  expr: BinaryExpression
): Block.LogicCompareBlock | Block.MathArithmeticBlock | Block.TextJoinBlock {
  const left = expr.left;
  if (left.type == 'PrivateIdentifier') {
    throw new ConvertError('PrivateIdentifier not supported', expr);
  }
  const op = convertBinaryOperator(expr.operator);
  if (op == null) {
    throw new ConvertError('Invalid operator: ' + expr.operator, expr);
  }
  const leftExpr = convertExpression(ctx, left);
  if (leftExpr.type == 'skip') {
    throw new ConvertError('Invalid left expression', left);
  }
  const rightExpr = convertExpression(ctx, expr.right);
  if (rightExpr.type == 'skip') {
    throw new ConvertError('Invalid right expression', expr.right);
  }
  if (op.tag == 'logic_compare') {
    if (!isValue(leftExpr)) {
      throw new AttachError(
        `Left of logic_compare must be expression, got ${leftExpr.type}`,

        left,
        leftExpr
      );
    }
    if (!isValue(rightExpr)) {
      throw new AttachError(
        `Right of logic_compare must be expression, got ${rightExpr.type}`,
        expr.right,
        rightExpr
      );
    }
    return {
      id: randomId(),
      inputs: {
        A: {
          block: leftExpr,
        },
        B: {
          block: rightExpr,
        },
      },
      type: 'logic_compare',
      fields: {
        OP: op.operator,
      },
    };
  } else {
    // try joining strings if it will fail as a number
    if (
      (!isMaybeNumberValue(leftExpr) || !isMaybeNumberValue(rightExpr)) &&
      op.operator == 'ADD'
    ) {
      if (isMaybeStringValue(leftExpr) && isMaybeStringValue(rightExpr)) {
        return {
          type: 'text_join',
          id: randomId(),
          inputs: {
            ADD0: {
              block: leftExpr,
            },
            ADD1: {
              block: rightExpr,
            },
          },
          extraState: {
            itemCount: 2,
          },
        };
      }
    }
    if (!isMaybeNumberValue(leftExpr)) {
      throw new AttachError(
        `Left of math_arithmetic must be number, got ${leftExpr.type}`,
        left,
        leftExpr
      );
    }
    if (!isMaybeNumberValue(rightExpr)) {
      throw new AttachError(
        `Right of math_arithmetic must be number, got ${rightExpr.type}`,
        expr.right,
        rightExpr
      );
    }
    return {
      id: randomId(),
      inputs: {
        A: {
          block: leftExpr,
        },
        B: {
          block: rightExpr,
        },
      },
      type: 'math_arithmetic',
      fields: {
        OP: op.operator,
      },
    };
  }
}

function convertLogicalExpression(
  ctx: Context,
  expr: LogicalExpression
): Block.LogicOperationBlock {
  const left = expr.left;
  const op = convertLogicalOperator(expr.operator);
  if (op == null) {
    throw new ConvertError('Invalid operator: ' + expr.operator, expr);
  }
  const leftExpr = convertExpression(ctx, left);
  if (leftExpr.type == 'skip') {
    throw new ConvertError('Invalid left expression', left);
  }
  const rightExpr = convertExpression(ctx, expr.right);
  if (rightExpr.type == 'skip') {
    throw new ConvertError('Invalid right expression', expr.right);
  }
  if (!isMaybeBooleanValue(leftExpr)) {
    throw new AttachError(
      `Left of logical expression must be boolean, got ${leftExpr.type}`,
      left,
      leftExpr
    );
  }
  if (!isMaybeBooleanValue(rightExpr)) {
    throw new AttachError(
      `Right of logical expression must be boolean, got ${rightExpr.type}`,
      expr.right,
      rightExpr
    );
  }
  return {
    id: randomId(),
    inputs: {
      A: {
        block: leftExpr,
      },
      B: {
        block: rightExpr,
      },
    },
    type: 'logic_operation',
    fields: {
      OP: op,
    },
  };
}

function convertLogicalOperator(
  operator: string
): Block.LogicOperationBlock['fields']['OP'] | null {
  switch (operator) {
    case '&&':
      return 'AND';
    case '||':
      return 'OR';
    default:
      return null;
  }
}

function convertBinaryOperator(operator: string):
  | {
      tag: 'logic_compare';
      operator: Exclude<Block.LogicCompareBlock['fields']['OP'], undefined>;
    }
  | {
      tag: 'math_arithmetic';
      operator: Exclude<Block.MathArithmeticBlock['fields']['OP'], undefined>;
    }
  | null {
  function ret<T, U>(tag: T, operator: U): { tag: T; operator: U } {
    return { tag, operator };
  }
  switch (operator) {
    case '==':
      return ret('logic_compare', 'EQ');
    case '===':
      return ret('logic_compare', 'EQ');
    case '!=':
      return ret('logic_compare', 'NEQ');
    case '!==':
      return ret('logic_compare', 'NEQ');
    case '<':
      return ret('logic_compare', 'LT');
    case '<=':
      return ret('logic_compare', 'LTE');
    case '>':
      return ret('logic_compare', 'GT');
    case '>=':
      return ret('logic_compare', 'GTE');
    case '+':
      return ret('math_arithmetic', 'ADD');
    case '-':
      return ret('math_arithmetic', 'MINUS');
    case '*':
      return ret('math_arithmetic', 'MULTIPLY');
    case '**':
      return ret('math_arithmetic', 'POWER');
    case '/':
      return ret('math_arithmetic', 'DIVIDE');
    default:
      return null;
  }
}

function convertBlockStatement(
  ctx: Context,
  blockStatement: BlockStatement
): Block.Block {
  return convertStatementList(
    { ...ctx, level: ctx.level + 1 },
    blockStatement.body
  );
}

function convertStatementList(
  ctx: Context,
  statements: Statement[]
): Block.Block {
  const blocks: Block.Block[] = [];
  for (const statement of statements) {
    const block = convertStatement(ctx, statement);
    if (block.type == 'skip') {
      continue;
    }
    blocks.push(block);
  }
  const ret = blocks.at(0);
  if (ret == null) {
    throw new ConvertError('Empty statement list');
  }
  for (let i = 0; i < blocks.length - 1; i++) {
    const block = blocks[i]!;
    const nextBlock = blocks[i + 1]!;
    if (!isStatement(block) || !isStatement(nextBlock)) {
      throw new AttachError(
        `Can't attach ${block.type} to ${nextBlock.type} sequentially`,
        statements[i]!,
        isStatement(block) ? nextBlock : block
      );
    }
    block.next = { block: nextBlock };
  }
  return ret;
}

function convertStatement(
  ctx: Context,
  statement: Statement
): Block.Block | Skip {
  switch (statement.type) {
    case 'VariableDeclaration':
      return convertVariableDeclaration(ctx, statement);
    case 'IfStatement':
      return convertIfStatement(ctx, statement);
    case 'BlockStatement':
      return convertBlockStatement(ctx, statement);
    case 'ExpressionStatement':
      return convertExpression(ctx, statement.expression);
    default:
      throw new ConvertError(
        'Invalid statement type: ' + statement.type,
        statement
      );
  }
}

function convertVariableDeclaration(
  ctx: Context,
  statement: VariableDeclaration
): Block.VariablesSetBlock {
  const declarations: Block.VariablesSetBlock[] = [];
  if (ctx.level > 1 && (statement.kind == 'let' || statement.kind == 'const')) {
    throw new ConvertError(
      "Let and const are only allowed in top level block (Blockly variables don't have block scope)",
      statement
    );
  }
  for (const declaration of statement.declarations) {
    const declarationInit = declaration.init;
    if (declarationInit == null) {
      throw new ConvertError(
        'Variable declaration must have init',
        declaration
      );
    }
    const initExpr = convertExpression(ctx, declarationInit);
    if (initExpr.type == 'skip') {
      throw new ConvertError('Invalid init expression', declarationInit);
    }
    if (!isValue(initExpr)) {
      throw new AttachError(
        `Init of variable declaration must be expression, got ${initExpr.type}`,
        declaration,
        initExpr
      );
    }
    const name = convertPattern(declaration.id);
    if (ctx.device != null && name == ctx.device) {
      throw new ConvertError(
        `Can't declare variable with name ${name}, it's reserved for device`,
        declaration.id
      );
    }
    const block: Block.VariablesSetBlock = {
      id: randomId(),
      type: 'variables_set',
      fields: {
        VAR: {
          id: name,
        },
      },
      inputs: {
        VALUE: { block: initExpr },
      },
    };
    declarations.push(block);
  }
  const ret = declarations.at(0);
  if (ret == null) {
    throw new ConvertError('Empty variable declaration', statement);
  }
  for (let i = 0; i < declarations.length - 1; i++) {
    const block = declarations[i]!;
    block.next = { block: declarations[i + 1]! };
  }
  return ret;
}

function convertPattern(pattern: Pattern): string {
  switch (pattern.type) {
    case 'Identifier':
      return pattern.name;
    default:
      throw new ConvertError('Invalid pattern type: ' + pattern.type, pattern);
  }
}

function convertIdentifier(
  ctx: Context,
  identifier: Identifier
): Block.VariablesGetBlock {
  if (ctx.device != null && identifier.name == ctx.device) {
    throw new ConvertError(
      `Can't use ${identifier.name} as a variable, it's reserved for device functions`,
      identifier
    );
  }
  return {
    id: randomId(),
    type: 'variables_get',
    fields: {
      VAR: {
        id: identifier.name,
      },
    },
  };
}

function convertIfStatement(
  ctx: Context,
  statement: IfStatement
): Block.ControlsIfBlock {
  const flattened = flattenIfStatement(statement);
  const block: Block.ControlsIfBlock = {
    id: randomId(),
    type: 'controls_if',
    inputs: {},
  };
  if (flattened.length > 1) {
    block.extraState = {
      elseIfCount: flattened.length - 1,
    };
  }
  for (let i = 0; i < flattened.length; i++) {
    const current = flattened[i]!;
    const testExpr = convertExpression(ctx, current.test);
    if (testExpr.type == 'skip') {
      throw new ConvertError('Invalid test expression', current.test);
    }
    if (!isMaybeBooleanValue(testExpr)) {
      throw new AttachError(
        `If test must be boolean, got ${testExpr.type}`,
        current.test,
        testExpr
      );
    }
    const doExpr = convertStatement(
      { ...ctx, level: ctx.level + 1 },
      current.consequent
    );
    if (doExpr.type == 'skip') {
      throw new ConvertError('Invalid do expression', current.consequent);
    }
    if (!isStatement(doExpr)) {
      throw new AttachError(
        `Do of if statement must be statement, got ${doExpr.type}`,
        current.consequent,
        doExpr
      );
    }

    block.inputs[`IF${i}`] = {
      block: testExpr,
    };
    block.inputs[`DO${i}`] = {
      block: doExpr,
    };
  }
  const lastFlattened = flattened[flattened.length - 1]!;
  if (lastFlattened.alternate != null) {
    const elseExpr = convertStatement(
      { ...ctx, level: ctx.level + 1 },
      lastFlattened.alternate
    );
    if (elseExpr.type == 'skip') {
      throw new ConvertError(
        'Invalid else expression',
        lastFlattened.alternate
      );
    }
    if (!isStatement(elseExpr)) {
      throw new AttachError(
        `Else of if statement must be statement, got ${elseExpr.type}`,
        lastFlattened.alternate,
        elseExpr
      );
    }
    block.inputs['ELSE'] = {
      block: elseExpr,
    };
    if (block.extraState == null) {
      block.extraState = {
        hasElse: true,
      };
    } else {
      block.extraState.hasElse = true;
    }
  }

  return block;
}

function flattenIfStatement(statement: IfStatement): IfStatement[] {
  const ret: IfStatement[] = [];
  let current: Statement | null | undefined = statement;
  while (current?.type == 'IfStatement') {
    ret.push(current);
    current = current.alternate;
  }
  return ret;
}

function randomId(): Block.Id {
  // return random ids like d-$H8.D^{W?Q,=jdUdBg or m5ud}`)w][QO:=nayvH^
  let ret = '';
  for (let i = 0; i < 20; i++) {
    const char = String.fromCharCode(Math.floor(Math.random() * 94) + 33);
    ret += char;
  }
  return ret;
}
