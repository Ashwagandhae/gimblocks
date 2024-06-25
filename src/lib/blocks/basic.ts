export type Id = string;

// colors look like #ff0000
export type Color = `#${string};`;

export type BlockBase = {
  x?: number;
  y?: number;
  id: Id;
};
