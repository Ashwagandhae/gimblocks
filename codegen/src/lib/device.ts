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
import { Color, LiteralString, LiteralNumber } from './basic';

/**
 * A literal number which isn't dynamically created. Used to specify block fields, which can't be dynamic.

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

const genericVarNames = ['T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
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
 * 
`;
  let args = def.args0 ?? [];
  let genericStrings: string[] = [];
  let argStrings: string[] = [];
  let argDescs: string[] = [];

  let genericVarNameIndex = 0;
  for (let arg of args) {
    let res = generateArg(arg);
    if (res == null) continue;
    switch (res.tag) {
      case 'normal': {
        argStrings.push(res.argString);
        argDescs.push(res.argDesc);
        break;
      }
      case 'generic': {
        let next = genericVarNames[genericVarNameIndex];
        if (next == null) {
          throw new Error(`Too many generic variables in ${def.type}`);
        }
        let { argString, argDesc, genericString } = res.create(next);
        argStrings.push(argString);
        argDescs.push(argDesc);
        genericStrings.push(genericString);
        break;
      }
    }
  }
  for (let desc of argDescs) {
    out += ` * ${desc}\n`;
  }
  out += ` */\n`;
  out += `${functionName}: `;
  if (genericStrings.length > 0) {
    out += `<${genericStrings.join(', ')}>`;
  }
  out += `(`;
  out += argStrings.join(', ');
  out += `) => ${generateReturnType(def)};`;
  return out;
}

function generateArg(arg: Argument):
  | { tag: 'normal'; argString: string; argDesc: string }
  | {
      tag: 'generic';
      create: (varName: string) => {
        argString: string;
        argDesc: string;
        genericString: string;
      };
    }
  | null {
  if (arg.type == 'input_dummy') {
    return null;
  }

  let argName = arg.name;
  function normal(type: string): {
    tag: 'normal';
    argString: string;
    argDesc: string;
  } {
    return {
      tag: 'normal',
      argString: `${argName}: ${type}`,
      argDesc: `@param ${argName} - An input block of type \`${type}\`.`,
    };
  }
  function generic(
    generic: string,
    bounds: string
  ): {
    tag: 'generic';
    create: (varName: string) => {
      argString: string;
      argDesc: string;
      genericString: string;
    };
  } {
    return {
      tag: 'generic',
      create: (varName: string) => {
        return {
          argString: `${argName}: ${generic}<${varName}>`,
          argDesc: `@param ${argName} - A field of type \`${bounds}\`. It must be a literal, non-dynamic value.`,
          genericString: `${varName} extends ${bounds}`,
        };
      },
    };
  }
  switch (arg.type) {
    case 'input_value': {
      return normal(checkToType(arg.check));
    }
    case 'input_statement': {
      throw new Error('Statement args not supported');
    }
    case 'field_colour': {
      return generic('Color', 'string');
    }
    case 'field_dropdown': {
      return generic(
        'LiteralString',
        arg.options.map((o) => `'${o[1]}'`).join(' | ')
      );
    }
    case 'field_number': {
      return generic('LiteralNumber', 'number');
    }
    case 'field_variable': {
      throw new Error('Variable args not supported');
    }
    case 'field_input': {
      return generic('LiteralString', 'string');
    }
    default:
      throw new Error('Unknown argument type: ' + arg);
  }
}

function generateReturnType(def: BlockDefinition): string {
  if (!def.hasOwnProperty('output')) {
    return 'void';
  }
  return checkToType(def.output);
}

function checkToType(check: Check | null | undefined): string {
  switch (check) {
    case 'Number':
      return 'number';
    case 'String':
      return 'string';
    case 'Boolean':
      return 'boolean';
    case null:
      return 'any';
    case undefined:
      return 'any';
    default:
      return check.map(checkToType).join(' | ');
  }
}
