import { get as getSchemas } from './lib/schema';
import { type BlockDefinitions } from '../../schema/blockDefinitions';

import * as worldOptions from '../../data/worldOptions.json';

import { definitions as primitiveBlockDefinitions } from '../../data/primitiveBlockDefinitions';
import { generate as generateBlockTypes } from './lib/blocks';
import { generate as generateDeviceTypes } from './lib/device';

import { writeFileSync } from 'fs';

import Ajv from 'ajv';
const ajv = new Ajv();

const schemas = getSchemas();
const validateBlockDefinitions = ajv.compile(schemas['blockDefinitions']!);

function getCustomBlocks(): BlockDefinitions {
  let ret = JSON.parse(worldOptions.codeGrids.customBlocks);
  if (!validateBlockDefinitions(ret)) {
    console.error(validateBlockDefinitions.errors);
    throw new Error('Invalid custom blocks');
  }
  return ret;
}
function getPrimitiveBlocks(): BlockDefinitions {
  if (!validateBlockDefinitions(primitiveBlockDefinitions)) {
    console.error(validateBlockDefinitions.errors);
    throw new Error('Invalid primitive blocks');
  }
  return primitiveBlockDefinitions;
}
let blockDefs: BlockDefinitions = [
  ...getPrimitiveBlocks(),
  ...getCustomBlocks(),
];

writeFileSync('./src/lib/blocks/generated.ts', generateBlockTypes(blockDefs));

writeFileSync('./src/lib/device/generated.ts', generateDeviceTypes(blockDefs));
