import { get as getSchemas } from './lib/schema';
import { type BlockDefinitions } from '../../schema/blockDefinitions';

import * as worldOptions from '../../data/worldOptions.json';

import { definitions as primitiveBlockDefinitionsRaw } from '../../data/primitiveBlockDefinitions';
import { generate as generateBlockTypes } from './lib/blocks';
import { generate as generateDeviceTypes } from './lib/device';
import { generate as generateDocs } from './lib/docs';

import { writeFileSync } from 'fs';

import Ajv from 'ajv';
import { BlockCategories } from '../../schema/blockCategories';
import { primitiveBlocksMatchesBlockCategories } from './lib/primitive';
const ajv = new Ajv();

const schemas = getSchemas();
const validateBlockDefinitions = ajv.compile(schemas['blockDefinitions']!);
const validateBlockCategories = ajv.compile(schemas['blockCategories']!);

function getBlockCategories(): BlockCategories {
  let ret = JSON.parse(worldOptions.codeGrids.blockCategories);
  if (!validateBlockCategories(ret)) {
    console.error(validateBlockCategories.errors);
    throw new Error('Invalid block categories');
  }
  return ret;
}

function getCustomBlocks(): BlockDefinitions {
  let ret = JSON.parse(worldOptions.codeGrids.customBlocks);
  if (!validateBlockDefinitions(ret)) {
    console.error(validateBlockDefinitions.errors);
    throw new Error('Invalid custom blocks');
  }
  return ret;
}
function getPrimitiveBlocks(): BlockDefinitions {
  if (!validateBlockDefinitions(primitiveBlockDefinitionsRaw)) {
    console.error(validateBlockDefinitions.errors);
    throw new Error('Invalid primitive blocks');
  }

  return primitiveBlockDefinitionsRaw;
}

let primitiveBlockDefinitions: BlockDefinitions = getPrimitiveBlocks();
let customBlockDefinitions: BlockDefinitions = getCustomBlocks();
let blockDefs: BlockDefinitions = [
  ...primitiveBlockDefinitions,
  ...customBlockDefinitions,
];

primitiveBlocksMatchesBlockCategories(
  primitiveBlockDefinitions,
  customBlockDefinitions,
  getBlockCategories()
);

writeFileSync('./src/lib/blocks/generated.ts', generateBlockTypes(blockDefs));
writeFileSync('./src/lib/device/generated.ts', generateDeviceTypes(blockDefs));
writeFileSync('./docs/functions.md', generateDocs(blockDefs));
