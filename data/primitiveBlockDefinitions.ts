import { BlockDefinitions } from '../schema/blockDefinitions';

// https://github.com/google/blockly/blob/master/blocks/lists.ts

// logical operations
const logical: BlockDefinitions = [
  // Block for boolean data type: true and false.
  {
    type: 'logic_boolean',
    message0: '%1',
    args0: [
      {
        type: 'field_dropdown',
        name: 'BOOL',
        options: [
          ['%{BKY_LOGIC_BOOLEAN_TRUE}', 'TRUE'],
          ['%{BKY_LOGIC_BOOLEAN_FALSE}', 'FALSE'],
        ],
      },
    ],
    output: 'Boolean',
    style: 'logic_blocks',
    tooltip: '%{BKY_LOGIC_BOOLEAN_TOOLTIP}',
    helpUrl: '%{BKY_LOGIC_BOOLEAN_HELPURL}',
  },
  // Block for if/elseif/else condition.
  {
    type: 'controls_if',
    message0: '%{BKY_CONTROLS_IF_MSG_IF} %1',
    args0: [
      {
        type: 'input_value',
        name: 'IF0',
        check: 'Boolean',
      },
    ],
    message1: '%{BKY_CONTROLS_IF_MSG_THEN} %1',
    args1: [
      {
        type: 'input_statement',
        name: 'DO0',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    style: 'logic_blocks',
    helpUrl: '%{BKY_CONTROLS_IF_HELPURL}',
    suppressPrefixSuffix: true,
    mutator: 'controls_if_mutator',
    extensions: ['controls_if_tooltip'],
    $codegenCustomInputsType:
      "Partial<Record<`IF${number}`, {block: BooleanValueBlock | MaybeBooleanValueBlock}> & Record<`DO${number}` | 'ELSE', {block: StatementBlock}>>",
    $codegenIntersectsWith:
      '{ extraState?: { hasElse?: true; elseIfCount?: number; } }',
    $codegenNoFunction: true,
  },
  // Block for comparison operator.
  {
    type: 'logic_compare',
    message0: '%1 %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'A',
      },
      {
        type: 'field_dropdown',
        name: 'OP',
        options: [
          ['=', 'EQ'],
          ['\u2260', 'NEQ'],
          ['\u200F<', 'LT'],
          ['\u200F\u2264', 'LTE'],
          ['\u200F>', 'GT'],
          ['\u200F\u2265', 'GTE'],
        ],
      },
      {
        type: 'input_value',
        name: 'B',
      },
    ],
    inputsInline: true,
    output: 'Boolean',
    style: 'logic_blocks',
    helpUrl: '%{BKY_LOGIC_COMPARE_HELPURL}',
    extensions: ['logic_compare', 'logic_op_tooltip'],
  },
  // Block for logical operations: 'and', 'or'.
  {
    type: 'logic_operation',
    message0: '%1 %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'A',
        check: 'Boolean',
      },
      {
        type: 'field_dropdown',
        name: 'OP',
        options: [
          ['%{BKY_LOGIC_OPERATION_AND}', 'AND'],
          ['%{BKY_LOGIC_OPERATION_OR}', 'OR'],
        ],
      },
      {
        type: 'input_value',
        name: 'B',
        check: 'Boolean',
      },
    ],
    inputsInline: true,
    output: 'Boolean',
    style: 'logic_blocks',
    helpUrl: '%{BKY_LOGIC_OPERATION_HELPURL}',
    extensions: ['logic_op_tooltip'],
  },
  // Block for negation.
  // {
  //   type: 'logic_negate',
  //   message0: '%{BKY_LOGIC_NEGATE_TITLE}',
  //   args0: [
  //     {
  //       type: 'input_value',
  //       name: 'BOOL',
  //       check: 'Boolean',
  //     },
  //   ],
  //   output: 'Boolean',
  //   style: 'logic_blocks',
  //   tooltip: '%{BKY_LOGIC_NEGATE_TOOLTIP}',
  //   helpUrl: '%{BKY_LOGIC_NEGATE_HELPURL}',
  // },
];

// math operations
const math: BlockDefinitions = [
  // Block for numeric value.
  {
    type: 'math_number',
    message0: '%1',
    args0: [
      {
        type: 'field_number',
        name: 'NUM',
        value: 0,
      },
    ],
    output: 'Number',
    helpUrl: '%{BKY_MATH_NUMBER_HELPURL}',
    style: 'math_blocks',
    tooltip: '%{BKY_MATH_NUMBER_TOOLTIP}',
    extensions: ['parent_tooltip_when_inline'],
  },

  // Block for basic arithmetic operator.
  {
    type: 'math_arithmetic',
    message0: '%1 %2 %3',
    args0: [
      {
        type: 'input_value',
        name: 'A',
        check: 'Number',
      },
      {
        type: 'field_dropdown',
        name: 'OP',
        options: [
          ['%{BKY_MATH_ADDITION_SYMBOL}', 'ADD'],
          ['%{BKY_MATH_SUBTRACTION_SYMBOL}', 'MINUS'],
          ['%{BKY_MATH_MULTIPLICATION_SYMBOL}', 'MULTIPLY'],
          ['%{BKY_MATH_DIVISION_SYMBOL}', 'DIVIDE'],
          ['%{BKY_MATH_POWER_SYMBOL}', 'POWER'],
        ],
      },
      {
        type: 'input_value',
        name: 'B',
        check: 'Number',
      },
    ],
    inputsInline: true,
    output: 'Number',
    style: 'math_blocks',
    helpUrl: '%{BKY_MATH_ARITHMETIC_HELPURL}',
    extensions: ['math_op_tooltip'],
  },

  // Block for advanced math operators with single operand.
  {
    type: 'math_single',
    message0: '%1 %2',
    args0: [
      {
        type: 'field_dropdown',
        name: 'OP',
        options: [
          ['%{BKY_MATH_SINGLE_OP_ROOT}', 'ROOT'],
          ['%{BKY_MATH_SINGLE_OP_ABSOLUTE}', 'ABS'],
          ['-', 'NEG'],
          ['ln', 'LN'],
          ['log10', 'LOG10'],
          ['e^', 'EXP'],
          ['10^', 'POW10'],
        ],
      },
      {
        type: 'input_value',
        name: 'NUM',
        check: 'Number',
      },
    ],
    output: 'Number',
    style: 'math_blocks',
    helpUrl: '%{BKY_MATH_SINGLE_HELPURL}',
    extensions: ['math_op_tooltip'],
  },

  // Block for trigonometry operators.
  {
    type: 'math_trig',
    message0: '%1 %2',
    args0: [
      {
        type: 'field_dropdown',
        name: 'OP',
        options: [
          ['%{BKY_MATH_TRIG_SIN}', 'SIN'],
          ['%{BKY_MATH_TRIG_COS}', 'COS'],
          ['%{BKY_MATH_TRIG_TAN}', 'TAN'],
          ['%{BKY_MATH_TRIG_ASIN}', 'ASIN'],
          ['%{BKY_MATH_TRIG_ACOS}', 'ACOS'],
          ['%{BKY_MATH_TRIG_ATAN}', 'ATAN'],
        ],
      },
      {
        type: 'input_value',
        name: 'NUM',
        check: 'Number',
      },
    ],
    output: 'Number',
    style: 'math_blocks',
    helpUrl: '%{BKY_MATH_TRIG_HELPURL}',
    extensions: ['math_op_tooltip'],
  },

  // Block for constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  // {
  //   type: 'math_constant',
  //   message0: '%1',
  //   args0: [
  //     {
  //       type: 'field_dropdown',
  //       name: 'CONSTANT',
  //       options: [
  //         ['\u03c0', 'PI'],
  //         ['e', 'E'],
  //         ['\u03c6', 'GOLDEN_RATIO'],
  //         ['sqrt(2)', 'SQRT2'],
  //         ['sqrt(\u00bd)', 'SQRT1_2'],
  //         ['\u221e', 'INFINITY'],
  //       ],
  //     },
  //   ],
  //   output: 'Number',
  //   style: 'math_blocks',
  //   tooltip: '%{BKY_MATH_CONSTANT_TOOLTIP}',
  //   helpUrl: '%{BKY_MATH_CONSTANT_HELPURL}',
  // },

  // Block for checking if a number is even, odd, prime, whole, positive,
  // negative or if it is divisible by certain number.
  {
    type: 'math_number_property',
    message0: '%1 %2',
    args0: [
      {
        type: 'input_value',
        name: 'NUMBER_TO_CHECK',
        check: 'Number',
      },
      {
        type: 'field_dropdown',
        name: 'PROPERTY',
        options: [
          ['%{BKY_MATH_IS_EVEN}', 'EVEN'],
          ['%{BKY_MATH_IS_ODD}', 'ODD'],
          ['%{BKY_MATH_IS_PRIME}', 'PRIME'],
          ['%{BKY_MATH_IS_WHOLE}', 'WHOLE'],
          ['%{BKY_MATH_IS_POSITIVE}', 'POSITIVE'],
          ['%{BKY_MATH_IS_NEGATIVE}', 'NEGATIVE'],
          ['%{BKY_MATH_IS_DIVISIBLE_BY}', 'DIVISIBLE_BY'],
        ],
      },
    ],
    inputsInline: true,
    output: 'Boolean',
    style: 'math_blocks',
    tooltip: '%{BKY_MATH_IS_TOOLTIP}',
    mutator: 'math_is_divisibleby_mutator',
  },

  // Block for adding to a variable in place.
  {
    type: 'math_change',
    message0: '%{BKY_MATH_CHANGE_TITLE}',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: '%{BKY_MATH_CHANGE_TITLE_ITEM}',
      },
      {
        type: 'input_value',
        name: 'DELTA',
        check: 'Number',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    style: 'variable_blocks',
    helpUrl: '%{BKY_MATH_CHANGE_HELPURL}',
    extensions: ['math_change_tooltip'],
    $codegenNoFunction: true,
    $codegenForceInclude: true,
  },

  // Block for rounding functions.
  {
    type: 'math_round',
    message0: '%1 %2',
    args0: [
      {
        type: 'field_dropdown',
        name: 'OP',
        options: [
          ['%{BKY_MATH_ROUND_OPERATOR_ROUND}', 'ROUND'],
          ['%{BKY_MATH_ROUND_OPERATOR_ROUNDUP}', 'ROUNDUP'],
          ['%{BKY_MATH_ROUND_OPERATOR_ROUNDDOWN}', 'ROUNDDOWN'],
        ],
      },
      {
        type: 'input_value',
        name: 'NUM',
        check: 'Number',
      },
    ],
    output: 'Number',
    style: 'math_blocks',
    helpUrl: '%{BKY_MATH_ROUND_HELPURL}',
    tooltip: '%{BKY_MATH_ROUND_TOOLTIP}',
  },

  // Block for remainder of a division.
  // {
  //   type: 'math_modulo',
  //   message0: '%{BKY_MATH_MODULO_TITLE}',
  //   args0: [
  //     {
  //       type: 'input_value',
  //       name: 'DIVIDEND',
  //       check: 'Number',
  //     },
  //     {
  //       type: 'input_value',
  //       name: 'DIVISOR',
  //       check: 'Number',
  //     },
  //   ],
  //   inputsInline: true,
  //   output: 'Number',
  //   style: 'math_blocks',
  //   tooltip: '%{BKY_MATH_MODULO_TOOLTIP}',
  //   helpUrl: '%{BKY_MATH_MODULO_HELPURL}',
  // },

  // Block for constraining a number between two limits.
  // {
  //   type: 'math_constrain',
  //   message0: '%{BKY_MATH_CONSTRAIN_TITLE}',
  //   args0: [
  //     {
  //       type: 'input_value',
  //       name: 'VALUE',
  //       check: 'Number',
  //     },
  //     {
  //       type: 'input_value',
  //       name: 'LOW',
  //       check: 'Number',
  //     },
  //     {
  //       type: 'input_value',
  //       name: 'HIGH',
  //       check: 'Number',
  //     },
  //   ],
  //   inputsInline: true,
  //   output: 'Number',
  //   style: 'math_blocks',
  //   tooltip: '%{BKY_MATH_CONSTRAIN_TOOLTIP}',
  //   helpUrl: '%{BKY_MATH_CONSTRAIN_HELPURL}',
  // },

  // Block for random integer between [X] and [Y].
  {
    type: 'math_random_int',
    message0: '%{BKY_MATH_RANDOM_INT_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'FROM',
        check: 'Number',
      },
      {
        type: 'input_value',
        name: 'TO',
        check: 'Number',
      },
    ],
    inputsInline: true,
    output: 'Number',
    style: 'math_blocks',
    tooltip: '%{BKY_MATH_RANDOM_INT_TOOLTIP}',
    helpUrl: '%{BKY_MATH_RANDOM_INT_HELPURL}',
  },

  // Block for random integer between [X] and [Y].
  // {
  //   type: 'math_random_float',
  //   message0: '%{BKY_MATH_RANDOM_FLOAT_TITLE_RANDOM}',
  //   output: 'Number',
  //   style: 'math_blocks',
  //   tooltip: '%{BKY_MATH_RANDOM_FLOAT_TOOLTIP}',
  //   helpUrl: '%{BKY_MATH_RANDOM_FLOAT_HELPURL}',
  // },

  // Block for calculating atan2 of [X] and [Y].
  // {
  //   type: 'math_atan2',
  //   message0: '%{BKY_MATH_ATAN2_TITLE}',
  //   args0: [
  //     {
  //       type: 'input_value',
  //       name: 'X',
  //       check: 'Number',
  //     },
  //     {
  //       type: 'input_value',
  //       name: 'Y',
  //       check: 'Number',
  //     },
  //   ],
  //   inputsInline: true,
  //   output: 'Number',
  //   style: 'math_blocks',
  //   tooltip: '%{BKY_MATH_ATAN2_TOOLTIP}',
  //   helpUrl: '%{BKY_MATH_ATAN2_HELPURL}',
  // },
];

const text: BlockDefinitions = [
  // Block for text value
  {
    type: 'text',
    message0: '%1',
    args0: [
      {
        type: 'field_input',
        name: 'TEXT',
        text: '',
      },
    ],
    output: 'String',
    style: 'text_blocks',
    helpUrl: '%{BKY_TEXT_TEXT_HELPURL}',
    tooltip: '%{BKY_TEXT_TEXT_TOOLTIP}',
    extensions: ['text_quotes', 'parent_tooltip_when_inline'],
  },
  {
    type: 'text_join',
    message0: '',
    output: 'String',
    style: 'text_blocks',
    helpUrl: '%{BKY_TEXT_JOIN_HELPURL}',
    tooltip: '%{BKY_TEXT_JOIN_TOOLTIP}',
    mutator: 'text_join_mutator',
    $codegenCustomInputsType:
      'Partial<Record<`ADD${number}`, {block: ValueBlock}>>',
    $codegenIntersectsWith: '{ extraState?: { itemCount?: number; } }',
    $codegenNoFunction: true,
  },
  // {
  //   type: 'text_append',
  //   message0: '%{BKY_TEXT_APPEND_TITLE}',
  //   args0: [
  //     {
  //       type: 'field_variable',
  //       name: 'VAR',
  //       variable: '%{BKY_TEXT_APPEND_VARIABLE}',
  //     },
  //     {
  //       type: 'input_value',
  //       name: 'TEXT',
  //     },
  //   ],
  //   previousStatement: null,
  //   nextStatement: null,
  //   style: 'text_blocks',
  //   extensions: ['text_append_tooltip'],
  // },
  {
    type: 'text_length',
    message0: '%{BKY_TEXT_LENGTH_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'VALUE',
        check: ['String'],
      },
    ],
    output: 'Number',
    style: 'text_blocks',
    tooltip: '%{BKY_TEXT_LENGTH_TOOLTIP}',
    helpUrl: '%{BKY_TEXT_LENGTH_HELPURL}',
  },
  // {
  //   type: 'text_isEmpty',
  //   message0: '%{BKY_TEXT_ISEMPTY_TITLE}',
  //   args0: [
  //     {
  //       type: 'input_value',
  //       name: 'VALUE',
  //       check: ['String'],
  //     },
  //   ],
  //   output: 'Boolean',
  //   style: 'text_blocks',
  //   tooltip: '%{BKY_TEXT_ISEMPTY_TOOLTIP}',
  //   helpUrl: '%{BKY_TEXT_ISEMPTY_HELPURL}',
  // },
  {
    type: 'text_indexOf',
    message0: '%{BKY_TEXT_INDEXOF_TITLE}',
    args0: [
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'String',
      },
      {
        type: 'field_dropdown',
        name: 'END',
        options: [
          ['%{BKY_TEXT_INDEXOF_OPERATOR_FIRST}', 'FIRST'],
          ['%{BKY_TEXT_INDEXOF_OPERATOR_LAST}', 'LAST'],
        ],
      },
      {
        type: 'input_value',
        name: 'FIND',
        check: 'String',
      },
    ],
    output: 'Number',
    style: 'text_blocks',
    helpUrl: '%{BKY_TEXT_INDEXOF_HELPURL}',
    inputsInline: true,
    extensions: ['text_indexOf_tooltip'],
  },
  {
    type: 'text_charAt',
    message0: '%{BKY_TEXT_CHARAT_TITLE}', // "in text %1 %2"
    args0: [
      {
        type: 'input_value',
        name: 'VALUE',
        check: 'String',
      },
      {
        type: 'field_dropdown',
        name: 'WHERE',
        options: [
          ['%{BKY_TEXT_CHARAT_FROM_START}', 'FROM_START'],
          ['%{BKY_TEXT_CHARAT_FROM_END}', 'FROM_END'],
          ['%{BKY_TEXT_CHARAT_FIRST}', 'FIRST'],
          ['%{BKY_TEXT_CHARAT_LAST}', 'LAST'],
          ['%{BKY_TEXT_CHARAT_RANDOM}', 'RANDOM'],
        ],
      },
    ],
    output: 'String',
    style: 'text_blocks',
    helpUrl: '%{BKY_TEXT_CHARAT_HELPURL}',
    inputsInline: true,
    mutator: 'text_charAt_mutator',
    $codegenNoFunction: true,
  },
  // function (this: GetSubstringBlock) {
  //   this['WHERE_OPTIONS_1'] = [
  //     [Msg['TEXT_GET_SUBSTRING_START_FROM_START'], 'FROM_START'],
  //     [Msg['TEXT_GET_SUBSTRING_START_FROM_END'], 'FROM_END'],
  //     [Msg['TEXT_GET_SUBSTRING_START_FIRST'], 'FIRST'],
  //   ];
  //   this['WHERE_OPTIONS_2'] = [
  //     [Msg['TEXT_GET_SUBSTRING_END_FROM_START'], 'FROM_START'],
  //     [Msg['TEXT_GET_SUBSTRING_END_FROM_END'], 'FROM_END'],
  //     [Msg['TEXT_GET_SUBSTRING_END_LAST'], 'LAST'],
  //   ];
  //   this.setHelpUrl(Msg['TEXT_GET_SUBSTRING_HELPURL']);
  //   this.setStyle('text_blocks');
  //   this.appendValueInput('STRING')
  //     .setCheck('String')
  //     .appendField(Msg['TEXT_GET_SUBSTRING_INPUT_IN_TEXT']);
  //   this.appendDummyInput('AT1');
  //   this.appendDummyInput('AT2');
  //   if (Msg['TEXT_GET_SUBSTRING_TAIL']) {
  //     this.appendDummyInput('TAIL').appendField(Msg['TEXT_GET_SUBSTRING_TAIL']);
  //   }
  //   this.setInputsInline(true);
  //   this.setOutput(true, 'String');
  //   this.updateAt_(1, true);
  //   this.updateAt_(2, true);
  //   this.setTooltip(Msg['TEXT_GET_SUBSTRING_TOOLTIP']);
  // }
  {
    type: 'text_getSubstring',
    message0: 'get substring',
    args0: [
      {
        type: 'input_value',
        name: 'STRING',
        check: 'String',
      },
      {
        type: 'field_dropdown',
        name: 'WHERE1',
        options: [
          ['%{BKY_TEXT_GET_SUBSTRING_START_FROM_START}', 'FROM_START'],
          ['%{BKY_TEXT_GET_SUBSTRING_START_FROM_END}', 'FROM_END'],
          ['%{BKY_TEXT_GET_SUBSTRING_START_FIRST}', 'FIRST'],
        ],
      },
      {
        type: 'input_value',
        name: 'AT1',
        check: 'Number',
      },
      {
        type: 'field_dropdown',
        name: 'WHERE2',
        options: [
          ['%{BKY_TEXT_GET_SUBSTRING_END_FROM_START}', 'FROM_START'],
          ['%{BKY_TEXT_GET_SUBSTRING_END_FROM_END}', 'FROM_END'],
          ['%{BKY_TEXT_GET_SUBSTRING_END_LAST}', 'LAST'],
        ],
      },
      {
        type: 'input_value',
        name: 'AT2',
        check: 'Number',
      },
    ],
    output: 'String',
    style: 'text_blocks',
    helpUrl: '%{BKY_TEXT_GET_SUBSTRING_HELPURL}',
    inputsInline: true,
    extensions: ['text_getSubstring_tooltip'],
  },
];
const variables: BlockDefinitions = [
  // Block for variable getter.
  {
    type: 'variables_get',
    message0: '%1',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: '%{BKY_VARIABLES_DEFAULT_NAME}',
      },
    ],
    output: null,
    style: 'variable_blocks',
    helpUrl: '%{BKY_VARIABLES_GET_HELPURL}',
    tooltip: '%{BKY_VARIABLES_GET_TOOLTIP}',
    extensions: ['contextMenu_variableSetterGetter'],
    $codegenNoFunction: true,
    $codegenForceInclude: true,
  },
  // Block for variable setter.
  {
    type: 'variables_set',
    message0: '%{BKY_VARIABLES_SET}',
    args0: [
      {
        type: 'field_variable',
        name: 'VAR',
        variable: '%{BKY_VARIABLES_DEFAULT_NAME}',
      },
      {
        type: 'input_value',
        name: 'VALUE',
      },
    ],
    previousStatement: null,
    nextStatement: null,
    style: 'variable_blocks',
    tooltip: '%{BKY_VARIABLES_SET_TOOLTIP}',
    helpUrl: '%{BKY_VARIABLES_SET_HELPURL}',
    extensions: ['contextMenu_variableSetterGetter'],
    $codegenNoFunction: true,
    $codegenForceInclude: true,
  },
];
export const definitions: BlockDefinitions = [
  ...logical,
  ...math,
  ...text,
  ...variables,
];
