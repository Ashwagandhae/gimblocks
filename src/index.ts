import { Options as AcornOptions, parse, parseExpressionAt } from 'acorn';

import type { Program } from './lib/blocks/index';
import { functionExpressionToBlocks, programToBlocks } from './lib/convert';
export {
  programToBlocks as acornProgramToBlocks,
  functionExpressionToBlocks as acornFunctionExpressionToBlocks,
  ConvertError,
  AttachError,
} from './lib/convert';

export type * from './lib/blocks/index';

export type Options = Partial<FullOptions>;

export type FullOptions = {
  jsStringType: 'program' | 'functionExpression';
  acornOptions: AcornOptions;
};

export const defaultOptions: FullOptions = {
  jsStringType: 'program',
  acornOptions: {
    ecmaVersion: 2020,
  },
};

export function jsToBlocks(jsString: string, options: Options = {}): Program {
  const optionsWithDefaults = { ...defaultOptions, ...options };
  if (optionsWithDefaults.jsStringType === 'program') {
    const ast = parse(jsString, optionsWithDefaults.acornOptions);
    return programToBlocks(ast);
  } else {
    const ast = parseExpressionAt(
      jsString,
      0,
      optionsWithDefaults.acornOptions
    );
    return functionExpressionToBlocks(ast);
  }
}
