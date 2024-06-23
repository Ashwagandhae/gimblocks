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
} from 'acorn';

import type * as Block from './blocks/index';
import {
  blockDefinitions,
  isExpression,
  isExpressionBooleanOrUnknown,
  isExpressionNumberOrUnknown,
  isStatement,
} from './blocks/index';

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
    this.name = 'ConvertConvertError';
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
      const ctx: Context = { device: param.name };
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
      if (ctx.device != null) {
        throw new ConvertError(
          'Invalid function call: ' + identifier.name,
          identifier
        );
      }
      const ret = convertCallExpressionToFunctionBlock(
        ctx,
        expr,
        identifier.name
      );
      if (ret == null) {
        throw new ConvertError(
          'Invalid function name: ' + identifier.name,
          identifier
        );
      }
      return ret;
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

// eslint-disable-next-line @typescript-eslint/ban-types
function keysOf<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}

function convertCallExpressionToFunctionBlock(
  ctx: Context,
  expr: CallExpression,
  identifierName: string
): Block.Block | null {
  const keys = keysOf(blockDefinitions);
  for (const key of keys) {
    const definition = blockDefinitions[key];
    if (!('function' in definition) || definition.function != identifierName) {
      continue;
    }

    let definitionFields: {
      [key: string]: number | string | boolean | readonly string[];
    } = {};
    let definitionInputs: { [key: string]: string } = {};
    if ('fields' in definition) {
      definitionFields = definition.fields;
    }
    if ('inputs' in definition) {
      definitionInputs = definition.inputs;
    }
    const fieldKeys = keysOf(definitionFields);
    const inputKeys = keysOf(definitionInputs);

    if (inputKeys.length + fieldKeys.length != expr.arguments.length) {
      throw new ConvertError(
        `Number of arguments for ${identifierName} does not match; expected ${
          inputKeys.length + fieldKeys.length
        }, got ${expr.arguments.length}`,
        expr
      );
    }

    const fields: { [key: string]: any } = {};
    for (let i = 0; i < fieldKeys.length; i++) {
      const field = definitionFields[fieldKeys[i]!];
      const arg = expr.arguments[i]!;
      if (arg.type != 'Literal') {
        throw new ConvertError(
          'Block fields must be literals, got non literal',
          arg
        );
      }
      switch (typeof field) {
        case 'number':
        case 'string':
        case 'boolean':
          if (typeof arg.value != typeof field) {
            throw new ConvertError(
              `Invalid argument type for ${identifierName}; expected ${typeof field}, got ${typeof arg.value}`,
              arg
            );
          }
          break;
        case 'object':
          if (!Array.isArray(field)) {
            throw new ConvertError(
              `Invalid argument type for ${identifierName}; expected array, got object`,
              arg
            );
          }
          if (typeof arg.value != 'string' || !field.includes(arg.value)) {
            throw new ConvertError(
              `Invalid argument value for ${identifierName}; expected ${field.join(
                ', '
              )}, got ${arg.value}`,
              arg
            );
          }
          break;
        default:
          throw new ConvertError(
            `Invalid field type for ${identifierName}: ${typeof field}`,
            arg
          );
      }
      fields[fieldKeys[i]!] = arg.value;
    }

    const inputs: { [key: string]: { block: Block.Block } } = {};
    for (let i = 0; i < inputKeys.length; i++) {
      const arg = expr.arguments[i + fieldKeys.length]!;
      if (arg.type == 'SpreadElement') {
        throw new ConvertError('SpreadElement not supported', arg);
      }
      const argExpr = convertExpression(ctx, arg);
      if (argExpr.type == 'skip') {
        throw new ConvertError('Invalid argument expression', arg);
      }
      if (!isExpression(argExpr)) {
        throw new AttachError(
          `Argument of function call must be expression, got ${argExpr.type}`,
          arg,
          argExpr
        );
      }
      if (
        definitionInputs[inputKeys[i]!] != blockDefinitions[argExpr.type].attach
      ) {
        throw new ConvertError(
          `Invalid argument type for ${identifierName}; expected ${
            definitionInputs[inputKeys[i]!]
          }, got ${argExpr.type}`,
          arg
        );
      }
      inputs[inputKeys[i]!] = {
        block: argExpr,
      };
    }
    return {
      type: key,
      id: randomId(),
      inputs: inputs,
    } as Block.Block;
  }
  return null;
}

function convertAssignmentExpression(
  ctx: Context,
  expr: AssignmentExpression
): Block.VariablesSetBlock {
  const rightExpr = convertExpression(ctx, expr.right);
  if (rightExpr.type == 'skip') {
    throw new ConvertError('Invalid right expression', expr.right);
  }
  if (!isExpression(rightExpr)) {
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
  const block: Block.VariablesSetBlock = {
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
  return block;
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
): Block.LogicCompareBlock | Block.MathArithmeticBlock {
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
    if (!isExpression(leftExpr)) {
      throw new AttachError(
        `Left of logic_compare must be expression, got ${leftExpr.type}`,

        left,
        leftExpr
      );
    }
    if (!isExpression(rightExpr)) {
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
    if (!isExpressionNumberOrUnknown(leftExpr)) {
      throw new AttachError(
        `Left of math_arithmetic must be number, got ${leftExpr.type}`,
        left,
        leftExpr
      );
    }
    if (!isExpressionNumberOrUnknown(rightExpr)) {
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
  if (!isExpressionBooleanOrUnknown(leftExpr)) {
    throw new AttachError(
      `Left of logical expression must be boolean, got ${leftExpr.type}`,
      left,
      leftExpr
    );
  }
  if (!isExpressionBooleanOrUnknown(rightExpr)) {
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
  return convertStatementList(ctx, blockStatement.body);
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
        `Can't attach ${block.type} to ${block.type} sequentially`,
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
    if (!isExpression(initExpr)) {
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
    if (!isExpressionBooleanOrUnknown(testExpr)) {
      throw new AttachError(
        `If test must be boolean, got ${testExpr.type}`,
        current.test,
        testExpr
      );
    }
    const doExpr = convertStatement(ctx, current.consequent);
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
    const elseExpr = convertStatement(ctx, lastFlattened.alternate);
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
