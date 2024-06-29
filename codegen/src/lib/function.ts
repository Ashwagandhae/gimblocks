import {
  Argument,
  BlockDefinition,
  BlockDefinitions,
  Check,
} from '../../../schema/blockDefinitions';
import { en } from '../../../data/en';

export function generateFunctionNameMap(
  blockDefinitions: BlockDefinitions
): Record<string, string> {
  let out: Record<string, string> = {};
  for (let def of blockDefinitions) {
    addNewFunctionName(def, out);
  }
  return out;
}
function addNewFunctionName(def: BlockDefinition, out: Record<string, string>) {
  let message = getEn(def.message0);
  let functionName = processMessage(message).trim();
  if (functionName.length == 0) {
    functionName = processType(def.type);
  }
  if (out[functionName] != null) {
    functionName = processType(def.type);
  }
  if (out[functionName] != null) {
    throw new Error(`Duplicate, unresolvable function name ${functionName}`);
  }
  out[functionName] = def.type;
}

export function getEn(text: string): string {
  // find any occurences of %{BKY_...}, and replace them with the corresponding value in en

  let match;
  let newText = text;
  while ((match = newText.match(/%{BKY_([^}]+)}/))) {
    let key = match[1]!;
    let value = en[key];
    if (value == null) {
      throw new Error(`Could not find key ${key} in en`);
    }
    newText = newText.replace(match[0], value);
  }
  return newText;
}

function processMessage(message: string): string {
  // remove all %1, %2, etc.
  // then only keep alphanumeric characters and spaces
  // then split into words
  // then join with camel case

  let cleaned = message.replace(/%[0-9]+/g, '');
  cleaned = cleaned.replace(/[^a-zA-Z0-9 ]/g, '');
  let words = cleaned.split(' ');
  return words
    .map((word, i) => {
      if (i === 0) {
        return word.toLowerCase();
      } else {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }
    })
    .join('');
}

function processType(type: string) {
  // convert from snake case to camel case
  let parts = type.split('_');
  return parts
    .map((part, i) => {
      if (i === 0) {
        return part;
      } else {
        return part.charAt(0).toUpperCase() + part.slice(1);
      }
    })
    .join('');
}

const genericVarNames = ['T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
export function generateFunction(
  def: BlockDefinition,
  map: Record<string, string>,
  style: 'codegen' | 'docs' = 'codegen'
): string | null {
  if (def.$codegenNoFunction) {
    return null;
  }
  let functionName = map[def.type];
  let out = '';
  if (style == 'codegen') {
    out += `
    /**
     * Function generated for "${def.type}" block. 
     * 
    `;
  }
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
  if (style == 'codegen') {
    for (let desc of argDescs) {
      out += ` * ${desc}\n`;
    }
    out += ` */\n`;
  }
  if (style == 'codegen') {
    out += `${functionName}: `;
  } else {
    out += `function ${functionName}`;
  }
  if (genericStrings.length > 0) {
    out += `<${genericStrings.join(', ')}>`;
  }
  out += `(`;
  if (def.$codegenCustomFunctionArgs) {
    out += def.$codegenCustomFunctionArgs;
  } else {
    out += argStrings.join(', ');
  }
  if (style == 'codegen') {
    out += `) => ${generateReturnType(def)};`;
  } else {
    out += `): ${generateReturnType(def)};`;
  }
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
  function normal(
    type: string,
    input: boolean
  ): {
    tag: 'normal';
    argString: string;
    argDesc: string;
  } {
    return {
      tag: 'normal',
      argString: `${argName}: ${type}`,
      argDesc: input
        ? `@param ${argName} - An input block.`
        : `@param ${argName} - A field. It must be a literal, non-dynamic value.`,
    };
  }
  // function generic(
  //   generic: string,
  //   bounds: string
  // ): {
  //   tag: 'generic';
  //   create: (varName: string) => {
  //     argString: string;
  //     argDesc: string;
  //     genericString: string;
  //   };
  // } {
  //   return {
  //     tag: 'generic',
  //     create: (varName: string) => {
  //       return {
  //         argString: `${argName}: ${generic}<${varName}>`,
  //         argDesc: `@param ${argName} - A field of type \`${bounds}\`. It must be a literal, non-dynamic value.`,
  //         genericString: `${varName} extends ${bounds}`,
  //       };
  //     },
  //   };
  // }
  switch (arg.type) {
    case 'input_value': {
      return normal(checkToType(arg.check), true);
    }
    case 'input_statement': {
      throw new Error('Statement args not supported');
    }
    case 'field_colour': {
      return normal('Color', false);
    }
    case 'field_dropdown': {
      return normal(arg.options.map((o) => `'${o[1]}'`).join(' | '), false);
    }
    case 'field_number': {
      return normal('number', false);
    }
    case 'field_variable': {
      throw new Error('Variable args not supported');
    }
    case 'field_input': {
      return normal('string', false);
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
