export * from './basic';
export * from './generated';

import { Id } from './basic';
import { Block, blockDefinitions, ExpressionBlock } from './generated';

export type Variable = {
  name: string;
  id: Id;
};

export type Program = {
  blocks: { languageVersion: 0; blocks: Block[] };
  variables: Variable[];
};
