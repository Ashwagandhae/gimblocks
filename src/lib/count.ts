import { Block, Program } from './blocks';

export function countProgramBlocks(program: Program): number {
  return program.blocks.blocks.map(countBlocks).reduce((a, b) => a + b, 0);
}

export function countBlocks(block: Block): number {
  let count = 1;
  if ('inputs' in block) {
    for (let input of Object.values(block.inputs)) {
      if (input.block) {
        count += countBlocks(input.block);
      }
    }
  }
  if ('next' in block && block.next) {
    count += countBlocks(block.next.block);
  }
  return count;
}
