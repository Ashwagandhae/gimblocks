import * as fs from 'fs';
import * as crypto from 'crypto';
import * as path from 'path';

import * as TJS from 'typescript-json-schema';
import { AnySchema } from 'ajv';

const schemas: {
  name: string;
  typeTarget: string;
  path: string;
}[] = [
  {
    name: 'blockDefinitions',
    typeTarget: 'BlockDefinitions',
    path: path.resolve('./schema/blockDefinitions.ts'),
  },
];

const hashDir = path.resolve('./schema/hashes');

if (!fs.existsSync(hashDir)) {
  fs.mkdirSync(hashDir);
}

function generateHash(filePath: string): string {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash('sha256');
  hashSum.update(fileBuffer);
  return hashSum.digest('hex');
}

function readStoredHash(hashFilePath: string): string | null {
  if (!fs.existsSync(hashFilePath)) {
    return null;
  }
  return fs.readFileSync(hashFilePath, 'utf-8');
}

function writeHash(hashFilePath: string, hash: string): void {
  fs.writeFileSync(hashFilePath, hash, 'utf-8');
}
function getSchema(filePath: string): AnySchema {
  const name = path.basename(filePath).replace('.ts', '');
  const schemaPath = path.resolve(`./schema/${name}.json`);
  if (fs.existsSync(schemaPath)) {
    return JSON.parse(fs.readFileSync(schemaPath, 'utf-8'));
  }
  throw new Error(`Schema for ${name} does not exist.`);
}

function generateSchema(filePath: string, typeTarget: string) {
  const program = TJS.getProgramFromFiles([filePath]);
  const schema = TJS.generateSchema(program, typeTarget, {
    noExtraProps: true,
    strictNullChecks: true,
  });
  const name = path.basename(filePath).replace('.ts', '');
  fs.writeFileSync(
    path.resolve(`./schema/${name}.json`),
    JSON.stringify(schema, null, 2)
  );
  return schema as AnySchema;
}

function generate() {
  let hasChanges = false;

  for (const { path: tsFilePath, typeTarget } of schemas) {
    const fileName = path.basename(tsFilePath);
    const hashFilePath = path.join(hashDir, `${fileName}.hash`);

    const currentHash = generateHash(tsFilePath);
    const storedHash = readStoredHash(hashFilePath);

    if (currentHash !== storedHash) {
      console.log(`File ${fileName} has changed. Regenerating schema...`);
      generateSchema(tsFilePath, typeTarget);
      writeHash(hashFilePath, currentHash);
      hasChanges = true;
    } else {
      console.log(
        `File ${fileName} has not changed. No need to regenerate schema.`
      );
    }
  }
}

export function get() {
  generate();

  let ret: { [key: string]: AnySchema } = {};
  for (const { name, path } of schemas) {
    const schema = getSchema(path);
    ret[name] = schema;
  }
  return ret;
}
