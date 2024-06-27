import { BlockCategories } from '../../../schema/blockCategories';
import { BlockDefinitions } from '../../../schema/blockDefinitions';

export function primitiveBlocksMatchesBlockCategories(
  primitiveBlocks: BlockDefinitions,
  customBlocks: BlockDefinitions,
  blockCategories: BlockCategories
): void {
  let definitionsTypeSet = new Set(primitiveBlocks.map((block) => block.type));
  let forceIncludeTypeSet = new Set(
    primitiveBlocks
      .filter((block) => block.$codegenForceInclude)
      .map((block) => block.type)
  );
  let customTypeSet = new Set(customBlocks.map((block) => block.type));
  let categoriesTypeSet = new Set(
    blockCategories
      .filter((category) => category.name != 'Essentials')
      .flatMap((category) => category.blocks.map((block) => block.type))
  );
  // find any missing types in definitionsTypeSet that are also missing in customTypeSet
  let missingTypes = Array.from(categoriesTypeSet.values()).filter(
    (type) => !definitionsTypeSet.has(type) && !customTypeSet.has(type)
  );
  if (missingTypes.length > 0) {
    throw new Error(
      `Block definitions missing for types: ${missingTypes.join(', ')}`
    );
  }
  // find any extra types in definitionsTypeSet
  let extraTypes = Array.from(definitionsTypeSet.values()).filter(
    (type) => !categoriesTypeSet.has(type) && !forceIncludeTypeSet.has(type)
  );
  if (extraTypes.length > 0) {
    throw new Error(
      `Extra block definitions for types: ${extraTypes.join(', ')}`
    );
  }
}
