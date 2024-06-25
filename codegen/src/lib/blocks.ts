import {
  BlockDefinition,
  BlockDefinitions,
  Check,
} from '../../../schema/blockDefinitions';
import { createFunctionName } from './function';

export function generate(definitions: BlockDefinitions): string {
  let out = `import * as Basic from './basic'\n`;
  let groups: {
    NumberValueBlock: string[];
    StringValueBlock: string[];
    BooleanValueBlock: string[];

    MaybeNumberValueBlock: string[];
    MaybeStringValueBlock: string[];
    MaybeBooleanValueBlock: string[];

    ValueBlock: string[];

    StatementBlock: string[];
    Block: string[];
  } = {
    NumberValueBlock: [],
    StringValueBlock: [],
    BooleanValueBlock: [],

    MaybeNumberValueBlock: [],
    MaybeStringValueBlock: [],
    MaybeBooleanValueBlock: [],

    ValueBlock: [],

    StatementBlock: [],
    Block: [],
  };
  for (let definition of definitions) {
    out += generateBlock(definition);
    let name = definitionBlockTypeName(definition);
    groups.Block.push(name);
    if (definition.hasOwnProperty('output')) {
      groups.ValueBlock.push(name);
      switch (definition.output) {
        case 'Boolean':
          groups.BooleanValueBlock.push(name);
          break;
        case 'String':
          groups.StringValueBlock.push(name);
          break;
        case 'Number':
          groups.NumberValueBlock.push(name);
          break;
        case null:
          groups.MaybeBooleanValueBlock.push(name);
          groups.MaybeStringValueBlock.push(name);
          groups.MaybeNumberValueBlock.push(name);
          break;
        default:
          for (let check of definition.output) {
            switch (check) {
              case 'Boolean':
                groups.MaybeBooleanValueBlock.push(name);
                break;
              case 'String':
                groups.MaybeStringValueBlock.push(name);
                break;
              case 'Number':
                groups.MaybeNumberValueBlock.push(name);
                break;
              default:
                throw new Error(`Unknown check ${check}`);
            }
          }
      }
    } else if (definition.hasOwnProperty('previousStatement')) {
      groups.StatementBlock.push(name);
    } else {
      throw new Error(`Block is neither statement nor value ${definition}`);
    }
  }
  for (let [name, blocks] of Object.entries(groups)) {
    out += `export type ${name} = ${blocks.join(' | ')};\n`;
  }
  out += `export const blockDefinitions = ${JSON.stringify(
    definitions
  )} as const;\n`;

  out += generateFunctionNameMap(definitions);

  return out;
}

function generateFunctionNameMap(definitions: BlockDefinitions): string {
  let out = 'export const functionNameMap: Record<string, string> = {\n';
  for (const def of definitions) {
    if (def.$codegenNoFunction) {
      continue;
    }
    let name = createFunctionName(def);
    out += `  '${def.type}': '${name}',\n`;
  }
  out += '};\n';
  return out;
}

function generateBlock(definition: BlockDefinition): string {
  let out = `export type ${definitionBlockTypeName(
    definition
  )} = Basic.BlockBase & `;
  if (definition?.$codegenIntersectsWith != null) {
    out += `(${definition.$codegenIntersectsWith}) & `;
  }
  out += `{
  type: '${definition.type}';`;

  let [fields, inputs] = definitionFieldsInputs(definition);
  if (fields != null) {
    out += `fields: ${fields};`;
  }
  if (inputs != null) {
    out += `inputs: ${inputs};`;
  }
  if (definition.hasOwnProperty('nextStatement')) {
    out += `next?: { block: StatementBlock };`;
  }
  out += `};\n`;

  return out;
}

function definitionBlockTypeName(definition: BlockDefinition): string {
  let parts = definition.type.split('_');
  return (
    parts
      .map((part) => {
        let firstChar = part.at(0);
        if (firstChar === undefined) {
          return '';
        }
        return firstChar.toUpperCase() + part.slice(1);
      })
      .join('') + 'Block'
  );
}

function definitionFieldsInputs(
  definition: BlockDefinition
): [string | null, string | null] {
  let fields: string[] = [];
  let inputs: string[] = [];
  for (let arg of definition.args0 ?? []) {
    switch (arg.type) {
      case 'input_value': {
        inputs.push(`${arg.name}?: { block: ${checkToBlockType(arg.check)} }`);
        break;
      }
      case 'input_dummy': {
        // ignore
        break;
      }
      case 'input_statement': {
        inputs.push(`${arg.name}?: { block: StatementBlock }`);
        break;
      }
      case 'field_colour': {
        fields.push(`${arg.name}?: Basic.Color`);
        break;
      }
      case 'field_dropdown': {
        fields.push(
          `${arg.name}?: ${arg.options.map((o) => `"${o[1]}"`).join(' | ')}`
        );
        break;
      }
      case 'field_variable': {
        fields.push(`${arg.name}?: { id: Basic.Id }`);
        break;
      }
      case 'field_number': {
        fields.push(`${arg.name}?: number`);
        break;
      }
      case 'field_input': {
        fields.push(`${arg.name}?: string`);
        break;
      }
      default:
        throw new Error(`Unknown arg type ${arg}`);
    }
  }
  let inputsRet = inputs.length > 0 ? `{${inputs.join(', ')}}` : null;
  let fieldsRet = fields.length > 0 ? `{${fields.join(', ')}}` : null;
  if (definition.$codegenCustomInputsType != null) {
    inputsRet = definition.$codegenCustomInputsType;
  }
  return [fieldsRet, inputsRet];
}

function checkToBlockType(check: Check | undefined): string {
  if (check == null) {
    return 'ValueBlock';
  }
  switch (check) {
    case 'Number':
      return '(NumberValueBlock | MaybeNumberValueBlock)';
    case 'String':
      return '(StringValueBlock | MaybeStringValueBlock)';
    case 'Boolean':
      return '(BooleanValueBlock | MaybeBooleanValueBlock)';
    case null:
      return 'ValueBlock';
    default:
      return check.map((c) => checkToBlockType(c)).join(' | ');
  }
}
