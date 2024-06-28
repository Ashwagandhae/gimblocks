import {
  Argument,
  BlockDefinition,
  BlockDefinitions,
  Check,
} from '../../../schema/blockDefinitions';
import { generateFunction, generateFunctionNameMap } from './function';

export function generate(defs: BlockDefinitions): string {
  let map = generateFunctionNameMap(defs);
  // reverese the map
  let reverseMap: Record<string, string> = {};
  for (let key in map) {
    reverseMap[map[key]!] = key;
  }
  let out = `
import { Color } from './basic';

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
