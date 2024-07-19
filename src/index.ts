import {
  Options as AcornOptions,
  parse,
  parseExpressionAt,
  Expression,
} from 'acorn';

import type { Block, Program } from './lib/blocks/index';
import {
  CustomConvertExpression,
  functionExpressionToBlocks,
  programToBlocks,
} from './lib/convert';
export {
  programToBlocks as acornProgramToBlocks,
  functionExpressionToBlocks as acornFunctionExpressionToBlocks,
  ConvertError,
  AttachError,
} from './lib/convert';

export type * from './lib/blocks/index';
export type * from './lib/count';

export type Options = Partial<FullOptions>;

export type FullOptions = {
  jsStringType: 'program' | 'functionExpression';
  acornOptions: AcornOptions;
  customConvertExpression?: CustomConvertExpression;
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
    return programToBlocks(ast, optionsWithDefaults);
  } else {
    const ast = parseExpressionAt(
      jsString,
      0,
      optionsWithDefaults.acornOptions
    );
    return functionExpressionToBlocks(ast, optionsWithDefaults);
  }
}
