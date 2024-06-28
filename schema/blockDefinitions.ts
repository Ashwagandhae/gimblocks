export type BlockDefinitions = BlockDefinition[];

export type BlockDefinition = {
  type: string;
  message0: string;
  message1?: string;
  args0?: Argument[];
  args1?: Argument[];
  /**
   * The block's color hue.
   *
   * @minimum 0
   * @maximum 360
   */
  colour?: number;
  tooltip?: string;
  helpUrl?: string;
  previousStatement?: null;
  nextStatement?: null;
  /**
   * @nullable true
   */
  output?: Check | null;
  style?: Style;
  inputsInline?: boolean;
  extensions?: string[];
  suppressPrefixSuffix?: boolean;
  mutator?: string;

  $codegenCustomInputsType?: string;
  $codegenIntersectsWith?: string;
  $codegenNoFunction?: boolean;
  $codegenForceInclude?: boolean;
  $codegenSugar?: string;
};
type Style = 'logic_blocks' | 'math_blocks' | 'variable_blocks' | 'text_blocks';
export type Argument =
  | {
      type: 'input_value';
      name: string;
      check?: Check;
      align?: Align;
    }
  | {
      type: 'input_dummy';
    }
  | {
      type: 'input_statement';
      name: string;
    }
  | {
      type: 'field_colour';
      name: string;
      colour: `#${string}`;
    }
  | {
      type: 'field_dropdown';
      name: string;
      options: [string, string][];
    }
  | {
      type: 'field_number';
      name: string;
      value: number;
    }
  | {
      type: 'field_variable';
      name: string;
      variable: string;
    }
  | {
      type: 'field_input';
      name: string;
      text: string;
    };

export type Check = CheckSingle | CheckSingle[];
export type CheckSingle = 'Number' | 'String' | 'Boolean';

export type Align = 'RIGHT';
