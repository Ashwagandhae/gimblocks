import {
  BlockDefinition,
  BlockDefinitions,
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

function getEn(text: string) {
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
