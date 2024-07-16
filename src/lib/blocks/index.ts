export * from './basic';
export * from './generated';

import { Id } from './basic';
import {
  blockDefinitions,
  Block,
  ValueBlock,
  NumberValueBlock,
  MaybeBooleanValueBlock,
  MaybeStringValueBlock,
  MaybeNumberValueBlock,
  StringValueBlock,
  BooleanValueBlock,
  StatementBlock,
} from './generated';
import { BlockDefinition } from '../../../schema/blockDefinitions';

export type Variable = {
  name: string;
  id: Id;
};

export type Program = {
  blocks: { languageVersion: 0; blocks: Block[] };
  variables: Variable[];
};

export function findBlockDefinition(type: string): BlockDefinition {
  for (let def of blockDefinitions) {
    if (def.type === type) {
      return def as BlockDefinition;
    }
  }
  throw new Error(`Block definition not found for ${type}`);
}
export function isValue(block: Block): block is ValueBlock {
  return findBlockDefinition(block.type).hasOwnProperty('output');
}
export function isNumberValue(block: Block): block is NumberValueBlock {
  return findBlockDefinition(block.type)?.output === 'Number';
}
export function isStringValue(block: Block): block is StringValueBlock {
  return findBlockDefinition(block.type)?.output === 'String';
}
export function isBooleanValue(block: Block): block is BooleanValueBlock {
  return findBlockDefinition(block.type)?.output === 'Boolean';
}
export function isStatement(block: Block): block is StatementBlock {
  return !isValue(block);
}
function isUnknown(
  block: Block
): block is
  | MaybeBooleanValueBlock
  | MaybeStringValueBlock
  | MaybeNumberValueBlock {
  return isValue(block) && findBlockDefinition(block.type).output === null;
}
function blockValueContains(
  block: Block,
  check: 'Number' | 'String' | 'Boolean'
) {
  if (isUnknown(block)) {
    return true;
  }
  if (!isValue(block)) {
    return false;
  }
  const def = findBlockDefinition(block.type);
  switch (typeof def.output) {
    case 'string':
      return def.output === check;
    case 'object':
      if (def.output === null || def.output === undefined) {
        return true;
      }
      return def.output.includes(check);
    case 'undefined':
      return true;
    default:
      throw new Error(`Unexpected output type ${def.output}`);
  }
  // return (
  //   isUnknown(block) ||
  //   (isValue(block) && findBlockDefinition(block.type).output )
  // );
}
export function isMaybeNumberValue(
  block: Block
): block is MaybeNumberValueBlock | NumberValueBlock {
  return isNumberValue(block) || blockValueContains(block, 'Number');
}
export function isMaybeStringValue(
  block: Block
): block is MaybeStringValueBlock | StringValueBlock {
  return isStringValue(block) || blockValueContains(block, 'String');
}

export function isMaybeBooleanValue(
  block: Block
): block is MaybeBooleanValueBlock | BooleanValueBlock {
  return isBooleanValue(block) || blockValueContains(block, 'Boolean');
}
