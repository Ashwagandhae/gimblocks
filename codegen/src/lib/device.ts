import {
  Argument,
  BlockDefinition,
  BlockDefinitions,
  Check,
} from '../../../schema/blockDefinitions';
import { generateFunctionNameMap } from './function';

export function generate(defs: BlockDefinitions): string {
  let map = generateFunctionNameMap(defs);
  // reverese the map
  let reverseMap: Record<string, string> = {};
  for (let key in map) {
    reverseMap[map[key]!] = key;
  }
  let out = `
/**
 * The color type. A hex string, rgb value, etc.
 * 
 * @example
 * '#ff0000'
 * 'rgb(255, 0, 0)'
 */
export type Color = string;

/**
 * The union of all possible devices.
 * 
 * @remarks
 * No actual device will have all of these functions. The user
 * must ensure that the device they are using has these functions.
 */
export type Union = {`;
  for (let def of defs) {
    let functionString = generateFunction(def, reverseMap);
    if (functionString == null) {
      continue;
    }
    out += functionString;
  }
  out += `
};`;
  return out;
}

function generateFunction(
  def: BlockDefinition,
  map: Record<string, string>
): string | null {
  if (def.$codegenNoFunction) {
    return null;
  }
  let functionName = map[def.type];
  let out = `
/**
 * Function generated for "${def.type}" block. 
 */
${functionName}: (`;
  let args = def.args0 ?? [];
  for (let arg of args) {
    let argString = generateArg(arg);
    if (argString == null) continue;
    out += argString + ', ';
  }
  out += `) => ${generateReturnType(def)};`;
  return out;
}

function generateArg(arg: Argument): string | null {
  if (arg.type == 'input_dummy') {
    return null;
  }
  let argName = arg.name;
  let argType;
  switch (arg.type) {
    case 'input_value': {
      argType = checkToType(arg.check);
      break;
    }
    case 'input_statement': {
      throw new Error('Statement args not supported');
    }
    case 'field_colour': {
      argType = 'Color';
      break;
    }
    case 'field_dropdown': {
      argType = arg.options.map((o) => `'${o[1]}'`).join(' | ');
      break;
    }
    case 'field_number': {
      argType = 'number';
      break;
    }
    case 'field_variable': {
      throw new Error('Variable args not supported');
    }
    case 'field_input': {
      argType = 'string';
      break;
    }
    default:
      throw new Error('Unknown argument type: ' + arg);
  }
  return `${argName}: ${argType}`;
}

function generateReturnType(def: BlockDefinition): string {
  if (!def.hasOwnProperty('output')) {
    return 'void';
  }
  return checkToType(def.output);
}

function checkToType(check: Check | null | undefined): string {
  if (check == null) {
    return 'void';
  }
  switch (check) {
    case 'Number':
      return 'number';
    case 'String':
      return 'string';
    case 'Boolean':
      return 'boolean';
    case null:
      return 'any';
    default:
      return check.map(checkToType).join(' | ');
  }
}
