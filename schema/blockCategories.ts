export type BlockCategories = BlockCategory[];

export type Color = string;
export type BlockCategory = {
  name: string;
  color: Color;
  blocks: { type: string }[];
  custom?: string;
};
