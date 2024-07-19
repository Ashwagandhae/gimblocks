// src/index.ts
import {
  parse,
  parseExpressionAt
} from "acorn";

// src/lib/blocks/generated.ts
var blockDefinitions = [
  {
    type: "logic_boolean",
    message0: "%1",
    args0: [
      {
        type: "field_dropdown",
        name: "BOOL",
        options: [
          ["%{BKY_LOGIC_BOOLEAN_TRUE}", "TRUE"],
          ["%{BKY_LOGIC_BOOLEAN_FALSE}", "FALSE"]
        ]
      }
    ],
    output: "Boolean",
    style: "logic_blocks",
    tooltip: "%{BKY_LOGIC_BOOLEAN_TOOLTIP}",
    helpUrl: "%{BKY_LOGIC_BOOLEAN_HELPURL}",
    $codegenSugar: "true;\nfalse;"
  },
  {
    type: "controls_if",
    message0: "%{BKY_CONTROLS_IF_MSG_IF} %1",
    args0: [{ type: "input_value", name: "IF0", check: "Boolean" }],
    message1: "%{BKY_CONTROLS_IF_MSG_THEN} %1",
    args1: [{ type: "input_statement", name: "DO0" }],
    previousStatement: null,
    nextStatement: null,
    style: "logic_blocks",
    helpUrl: "%{BKY_CONTROLS_IF_HELPURL}",
    suppressPrefixSuffix: true,
    mutator: "controls_if_mutator",
    extensions: ["controls_if_tooltip"],
    $codegenCustomInputsType: "Partial<Record<`IF${number}`, {block: BooleanValueBlock | MaybeBooleanValueBlock}> & Record<`DO${number}` | 'ELSE', {block: StatementBlock}>>",
    $codegenIntersectsWith: "{ extraState?: { hasElse?: true; elseIfCount?: number; } }",
    $codegenNoFunction: true,
    $codegenSugar: "if { ... } else { ... }"
  },
  {
    type: "logic_compare",
    message0: "%1 %2 %3",
    args0: [
      { type: "input_value", name: "A" },
      {
        type: "field_dropdown",
        name: "OP",
        options: [
          ["=", "EQ"],
          ["\u2260", "NEQ"],
          ["\u200F<", "LT"],
          ["\u200F\u2264", "LTE"],
          ["\u200F>", "GT"],
          ["\u200F\u2265", "GTE"]
        ]
      },
      { type: "input_value", name: "B" }
    ],
    inputsInline: true,
    output: "Boolean",
    style: "logic_blocks",
    helpUrl: "%{BKY_LOGIC_COMPARE_HELPURL}",
    extensions: ["logic_compare", "logic_op_tooltip"],
    $codegenSugar: "x == y; // or ===\nx != y; // or !==\nx < y;\nx <= y;\nx > y;\nx >= y;"
  },
  {
    type: "logic_operation",
    message0: "%1 %2 %3",
    args0: [
      { type: "input_value", name: "A", check: "Boolean" },
      {
        type: "field_dropdown",
        name: "OP",
        options: [
          ["%{BKY_LOGIC_OPERATION_AND}", "AND"],
          ["%{BKY_LOGIC_OPERATION_OR}", "OR"]
        ]
      },
      { type: "input_value", name: "B", check: "Boolean" }
    ],
    inputsInline: true,
    output: "Boolean",
    style: "logic_blocks",
    helpUrl: "%{BKY_LOGIC_OPERATION_HELPURL}",
    extensions: ["logic_op_tooltip"],
    $codegenSugar: "x && y;\nx || y;"
  },
  {
    type: "math_number",
    message0: "%1",
    args0: [{ type: "field_number", name: "NUM", value: 0 }],
    output: "Number",
    helpUrl: "%{BKY_MATH_NUMBER_HELPURL}",
    style: "math_blocks",
    tooltip: "%{BKY_MATH_NUMBER_TOOLTIP}",
    extensions: ["parent_tooltip_when_inline"],
    $codegenSugar: "42;\n21.5;\n// or any number"
  },
  {
    type: "math_arithmetic",
    message0: "%1 %2 %3",
    args0: [
      { type: "input_value", name: "A", check: "Number" },
      {
        type: "field_dropdown",
        name: "OP",
        options: [
          ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
          ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
          ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
          ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
          ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]
        ]
      },
      { type: "input_value", name: "B", check: "Number" }
    ],
    inputsInline: true,
    output: "Number",
    style: "math_blocks",
    helpUrl: "%{BKY_MATH_ARITHMETIC_HELPURL}",
    extensions: ["math_op_tooltip"],
    $codegenSugar: "x + y;\nx - y;\nx * y;\nx / y;\nx ** y;"
  },
  {
    type: "math_single",
    message0: "%1 %2",
    args0: [
      {
        type: "field_dropdown",
        name: "OP",
        options: [
          ["%{BKY_MATH_SINGLE_OP_ROOT}", "ROOT"],
          ["%{BKY_MATH_SINGLE_OP_ABSOLUTE}", "ABS"],
          ["-", "NEG"],
          ["ln", "LN"],
          ["log10", "LOG10"],
          ["e^", "EXP"],
          ["10^", "POW10"]
        ]
      },
      { type: "input_value", name: "NUM", check: "Number" }
    ],
    output: "Number",
    style: "math_blocks",
    helpUrl: "%{BKY_MATH_SINGLE_HELPURL}",
    extensions: ["math_op_tooltip"]
  },
  {
    type: "math_trig",
    message0: "%1 %2",
    args0: [
      {
        type: "field_dropdown",
        name: "OP",
        options: [
          ["%{BKY_MATH_TRIG_SIN}", "SIN"],
          ["%{BKY_MATH_TRIG_COS}", "COS"],
          ["%{BKY_MATH_TRIG_TAN}", "TAN"],
          ["%{BKY_MATH_TRIG_ASIN}", "ASIN"],
          ["%{BKY_MATH_TRIG_ACOS}", "ACOS"],
          ["%{BKY_MATH_TRIG_ATAN}", "ATAN"]
        ]
      },
      { type: "input_value", name: "NUM", check: "Number" }
    ],
    output: "Number",
    style: "math_blocks",
    helpUrl: "%{BKY_MATH_TRIG_HELPURL}",
    extensions: ["math_op_tooltip"],
    $codegenSugar: "Math.sin(x);\nMath.cos(x);\n// etc.\n// Will preserve JS behaviour by multiplying by Math.PI / 180"
  },
  {
    type: "math_number_property",
    message0: "%1 %2",
    args0: [
      { type: "input_value", name: "NUMBER_TO_CHECK", check: "Number" },
      {
        type: "field_dropdown",
        name: "PROPERTY",
        options: [
          ["%{BKY_MATH_IS_EVEN}", "EVEN"],
          ["%{BKY_MATH_IS_ODD}", "ODD"],
          ["%{BKY_MATH_IS_PRIME}", "PRIME"],
          ["%{BKY_MATH_IS_WHOLE}", "WHOLE"],
          ["%{BKY_MATH_IS_POSITIVE}", "POSITIVE"],
          ["%{BKY_MATH_IS_NEGATIVE}", "NEGATIVE"],
          ["%{BKY_MATH_IS_DIVISIBLE_BY}", "DIVISIBLE_BY"]
        ]
      }
    ],
    inputsInline: true,
    output: "Boolean",
    style: "math_blocks",
    tooltip: "%{BKY_MATH_IS_TOOLTIP}",
    mutator: "math_is_divisibleby_mutator"
  },
  {
    type: "math_change",
    message0: "%{BKY_MATH_CHANGE_TITLE}",
    args0: [
      {
        type: "field_variable",
        name: "VAR",
        variable: "%{BKY_MATH_CHANGE_TITLE_ITEM}"
      },
      { type: "input_value", name: "DELTA", check: "Number" }
    ],
    previousStatement: null,
    nextStatement: null,
    style: "variable_blocks",
    helpUrl: "%{BKY_MATH_CHANGE_HELPURL}",
    extensions: ["math_change_tooltip"],
    $codegenNoFunction: true,
    $codegenForceInclude: true,
    $codegenSugar: "x += y;"
  },
  {
    type: "math_round",
    message0: "%1 %2",
    args0: [
      {
        type: "field_dropdown",
        name: "OP",
        options: [
          ["%{BKY_MATH_ROUND_OPERATOR_ROUND}", "ROUND"],
          ["%{BKY_MATH_ROUND_OPERATOR_ROUNDUP}", "ROUNDUP"],
          ["%{BKY_MATH_ROUND_OPERATOR_ROUNDDOWN}", "ROUNDDOWN"]
        ]
      },
      { type: "input_value", name: "NUM", check: "Number" }
    ],
    output: "Number",
    style: "math_blocks",
    helpUrl: "%{BKY_MATH_ROUND_HELPURL}",
    tooltip: "%{BKY_MATH_ROUND_TOOLTIP}"
  },
  {
    type: "math_random_int",
    message0: "%{BKY_MATH_RANDOM_INT_TITLE}",
    args0: [
      { type: "input_value", name: "FROM", check: "Number" },
      { type: "input_value", name: "TO", check: "Number" }
    ],
    inputsInline: true,
    output: "Number",
    style: "math_blocks",
    tooltip: "%{BKY_MATH_RANDOM_INT_TOOLTIP}",
    helpUrl: "%{BKY_MATH_RANDOM_INT_HELPURL}"
  },
  {
    type: "text",
    message0: "%1",
    args0: [{ type: "field_input", name: "TEXT", text: "" }],
    output: "String",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_TEXT_HELPURL}",
    tooltip: "%{BKY_TEXT_TEXT_TOOLTIP}",
    extensions: ["text_quotes", "parent_tooltip_when_inline"],
    $codegenSugar: `'Hello';
"World";
// or any text`
  },
  {
    type: "text_join",
    message0: "create text with",
    output: "String",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_JOIN_HELPURL}",
    tooltip: "%{BKY_TEXT_JOIN_TOOLTIP}",
    mutator: "text_join_mutator",
    $codegenCustomInputsType: "Partial<Record<`ADD${number}`, {block: ValueBlock}>>",
    $codegenIntersectsWith: "{ extraState?: { itemCount?: number; } }",
    $codegenCustomFunctionArgs: "...args: any[]"
  },
  {
    type: "text_length",
    message0: "%{BKY_TEXT_LENGTH_TITLE}",
    args0: [{ type: "input_value", name: "VALUE", check: ["String"] }],
    output: "Number",
    style: "text_blocks",
    tooltip: "%{BKY_TEXT_LENGTH_TOOLTIP}",
    helpUrl: "%{BKY_TEXT_LENGTH_HELPURL}"
  },
  {
    type: "text_indexOf",
    message0: "%{BKY_TEXT_INDEXOF_TITLE}",
    args0: [
      { type: "input_value", name: "VALUE", check: "String" },
      {
        type: "field_dropdown",
        name: "END",
        options: [
          ["%{BKY_TEXT_INDEXOF_OPERATOR_FIRST}", "FIRST"],
          ["%{BKY_TEXT_INDEXOF_OPERATOR_LAST}", "LAST"]
        ]
      },
      { type: "input_value", name: "FIND", check: "String" }
    ],
    output: "Number",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_INDEXOF_HELPURL}",
    inputsInline: true,
    extensions: ["text_indexOf_tooltip"]
  },
  {
    type: "text_charAt",
    message0: "%{BKY_TEXT_CHARAT_TITLE}",
    args0: [
      { type: "input_value", name: "VALUE", check: "String" },
      {
        type: "field_dropdown",
        name: "WHERE",
        options: [
          ["%{BKY_TEXT_CHARAT_FROM_START}", "FROM_START"],
          ["%{BKY_TEXT_CHARAT_FROM_END}", "FROM_END"],
          ["%{BKY_TEXT_CHARAT_FIRST}", "FIRST"],
          ["%{BKY_TEXT_CHARAT_LAST}", "LAST"],
          ["%{BKY_TEXT_CHARAT_RANDOM}", "RANDOM"]
        ]
      },
      { type: "input_value", name: "AT", check: "Number" }
    ],
    output: "String",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_CHARAT_HELPURL}",
    inputsInline: true,
    mutator: "text_charAt_mutator"
  },
  {
    type: "text_getSubstring",
    message0: "in text %1 get substring from %2 %3 to %4 %5",
    args0: [
      { type: "input_value", name: "STRING", check: "String" },
      {
        type: "field_dropdown",
        name: "WHERE1",
        options: [
          ["%{BKY_TEXT_GET_SUBSTRING_START_FROM_START}", "FROM_START"],
          ["%{BKY_TEXT_GET_SUBSTRING_START_FROM_END}", "FROM_END"],
          ["%{BKY_TEXT_GET_SUBSTRING_START_FIRST}", "FIRST"]
        ]
      },
      { type: "input_value", name: "AT1", check: "Number" },
      {
        type: "field_dropdown",
        name: "WHERE2",
        options: [
          ["%{BKY_TEXT_GET_SUBSTRING_END_FROM_START}", "FROM_START"],
          ["%{BKY_TEXT_GET_SUBSTRING_END_FROM_END}", "FROM_END"],
          ["%{BKY_TEXT_GET_SUBSTRING_END_LAST}", "LAST"]
        ]
      },
      { type: "input_value", name: "AT2", check: "Number" }
    ],
    output: "String",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_GET_SUBSTRING_HELPURL}",
    inputsInline: true,
    extensions: ["text_getSubstring_tooltip"]
  },
  {
    type: "variables_get",
    message0: "%1",
    args0: [
      {
        type: "field_variable",
        name: "VAR",
        variable: "%{BKY_VARIABLES_DEFAULT_NAME}"
      }
    ],
    output: null,
    style: "variable_blocks",
    helpUrl: "%{BKY_VARIABLES_GET_HELPURL}",
    tooltip: "%{BKY_VARIABLES_GET_TOOLTIP}",
    extensions: ["contextMenu_variableSetterGetter"],
    $codegenNoFunction: true,
    $codegenSugar: "x // just use the variable name",
    $codegenForceInclude: true
  },
  {
    type: "variables_set",
    message0: "%{BKY_VARIABLES_SET}",
    args0: [
      {
        type: "field_variable",
        name: "VAR",
        variable: "%{BKY_VARIABLES_DEFAULT_NAME}"
      },
      { type: "input_value", name: "VALUE" }
    ],
    previousStatement: null,
    nextStatement: null,
    style: "variable_blocks",
    tooltip: "%{BKY_VARIABLES_SET_TOOLTIP}",
    helpUrl: "%{BKY_VARIABLES_SET_HELPURL}",
    extensions: ["contextMenu_variableSetterGetter"],
    $codegenNoFunction: true,
    $codegenForceInclude: true,
    $codegenSugar: "let x = ...;\nvar x = ...;\nconst x = ...;\nx = ...;"
  },
  {
    type: "message_broadcaster",
    message0: "Broadcast Message On Channel %1 ",
    args0: [
      {
        type: "input_value",
        name: "broadcast_message_on_channel",
        check: "String",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "set_property",
    message0: "Set Property %1 Value %2 ",
    args0: [
      {
        type: "input_value",
        name: "set_property",
        check: "String",
        align: "RIGHT"
      },
      {
        type: "input_value",
        name: "value",
        check: ["String", "Number", "Boolean"],
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "get_property",
    message0: "Get Property %1 ",
    args0: [
      {
        type: "input_value",
        name: "get_property",
        check: "String",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["String", "Number", "Boolean"]
  },
  {
    type: "current_character_name",
    message0: "Triggering Player's Name",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "String"
  },
  {
    type: "add_activity_feed_item_for_everyone",
    message0: "Add Activity Feed Item For Everyone %1 ",
    args0: [
      {
        type: "input_value",
        name: "add_activity_feed_item_for_everyone",
        check: "String",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "add_activity_feed_item_for_triggering_player",
    message0: "Add Activity Feed Item For Triggering Player %1 ",
    args0: [
      {
        type: "input_value",
        name: "add_activity_feed_item_for_triggering_player",
        check: "String",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "add_activity_feed_item_for_game_host",
    message0: "Add Activity Feed Item For Game Host %1 ",
    args0: [
      {
        type: "input_value",
        name: "add_activity_feed_item_for_game_host",
        check: "String",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "current_character_team_number",
    message0: "Triggering Player's Team Number",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Number"
  },
  {
    type: "triggering_player_score",
    message0: "Triggering Player's Score",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Number"
  },
  {
    type: "get_team_score",
    message0: "Get Score Of Team %1 ",
    args0: [
      {
        type: "input_value",
        name: "get_score_of_team",
        check: "Number",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Number"
  },
  {
    type: "is_a_live_game",
    message0: "Is A Live Game",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Boolean"
  },
  {
    type: "is_an_assignment",
    message0: "Is An Assignment",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Boolean"
  },
  {
    type: "seconds_into_game",
    message0: "Seconds Into Game",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Number"
  },
  {
    type: "set_assignment_objective",
    message0: "Set Objective To %1 ",
    args0: [
      {
        type: "input_value",
        name: "set_objective_to",
        check: "String",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "set_percentage_complete",
    message0: "Set Percentage Complete To %1 ",
    args0: [
      {
        type: "input_value",
        name: "set_percentage_complete_to",
        check: "Number",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "increment_percentage_complete",
    message0: "Increment Percentage Complete By %1 ",
    args0: [
      {
        type: "input_value",
        name: "increment_percentage_complete_by",
        check: "Number",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "send_custom_notification",
    message0: "Send Notification %1 Title %2 Content %3 ",
    args0: [
      { type: "input_dummy" },
      { type: "input_value", name: "title", check: "String", align: "RIGHT" },
      { type: "input_value", name: "content", check: "String", align: "RIGHT" }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "other_character_name",
    message0: "Other Player's Name",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "String"
  },
  {
    type: "other_character_team_number",
    message0: "Other Player's Team Number",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Number"
  },
  {
    type: "other_character_get_property",
    message0: "Get Property As Other Player %1 ",
    args0: [
      {
        type: "input_value",
        name: "get_property_as_other_player",
        check: "String",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["String", "Number", "Boolean"]
  },
  {
    type: "other_character_set_property",
    message0: "Set Property (As Other Player) %1 Value %2 ",
    args0: [
      {
        type: "input_value",
        name: "set_property_as_other_player",
        check: "String",
        align: "RIGHT"
      },
      {
        type: "input_value",
        name: "value",
        check: ["String", "Number", "Boolean"],
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "other_character_message_broadcaster",
    message0: "Broadcast Message (As Other Player) On Channel %1 ",
    args0: [
      {
        type: "input_value",
        name: "broadcast_message_as_other_player_on_channel",
        check: "String",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "grant",
    message0: "Grant Player Selected Item",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "grant_custom",
    message0: "Grant Player Selected Item (Custom Amount) %1 Amount %2 ",
    args0: [
      { type: "input_dummy" },
      { type: "input_value", name: "amount", check: "Number", align: "RIGHT" }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "set_billboard_text",
    message0: "Set Text %1 ",
    args0: [
      {
        type: "input_value",
        name: "set_text",
        check: "String",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "set_text_color",
    message0: "Set Text Color To %1 ",
    args0: [
      { type: "field_colour", name: "set_text_color_to", colour: "#ff0000" }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "set_image",
    message0: "Set Image URL %1 ",
    args0: [
      {
        type: "input_value",
        name: "set_image_url",
        check: "String",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "set_frame_color",
    message0: "Set Frame Color To %1 ",
    args0: [
      { type: "field_colour", name: "set_frame_color_to", colour: "#ff0000" }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "question_answering_streak",
    message0: "Questions Answered Correctly In A Row",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Number"
  },
  {
    type: "message_correct_answer",
    message0: "Set Message Shown When Player Answers Correctly %1 ",
    args0: [
      {
        type: "input_value",
        name: "set_message_shown_when_player_answers_correctly",
        check: "String",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "message_incorrect_answer",
    message0: "Set Message Shown When Player Answers Incorrectly %1 ",
    args0: [
      {
        type: "input_value",
        name: "set_message_shown_when_player_answers_incorrectly",
        check: "String",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "set_header",
    message0: "Set Header %1 ",
    args0: [
      {
        type: "input_value",
        name: "set_header",
        check: "String",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "set_content",
    message0: "Set Content %1 ",
    args0: [
      {
        type: "input_value",
        name: "set_content",
        check: "String",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "get_amount",
    message0: "Get Amount Of Current Item %1 ",
    args0: [{ type: "input_dummy" }],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["Number"]
  },
  {
    type: "set_gui_text",
    message0: "Set Text %1 ",
    args0: [
      {
        type: "input_value",
        name: "set_text",
        check: "String",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "get_minutes",
    message0: "Get Minutes %1 ",
    args0: [{ type: "input_dummy" }],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["Number"]
  },
  {
    type: "get_seconds",
    message0: "Get Seconds %1 ",
    args0: [{ type: "input_dummy" }],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["Number"]
  },
  {
    type: "get_time_left_formatted",
    message0: "Get Time Left Formatted %1 ",
    args0: [{ type: "input_dummy" }],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["String"]
  },
  {
    type: "get_player_count",
    message0: "Number Of Players On Team %1 ",
    args0: [{ type: "input_dummy" }],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["Number"]
  },
  {
    type: "knockout_manager_other_character_name",
    message0: "Knocked Player's Name",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "String"
  },
  {
    type: "knockout_manager_other_character_team_number",
    message0: "Knocked Player's Team Number",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Number"
  },
  {
    type: "knockout_manager_other_character_get_property",
    message0: "Get Property As Knocked Out Player %1 ",
    args0: [
      {
        type: "input_value",
        name: "get_property_as_knocked_out_player",
        check: "String",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["String", "Number", "Boolean"]
  },
  {
    type: "knockout_manager_other_character_set_property",
    message0: "Set Property (As Knocked Out Player) %1 Value %2 ",
    args0: [
      {
        type: "input_value",
        name: "set_property_as_knocked_out_player",
        check: "String",
        align: "RIGHT"
      },
      {
        type: "input_value",
        name: "value",
        check: ["String", "Number", "Boolean"],
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "knockout_manager_other_character_message_broadcaster",
    message0: "Broadcast Message (As Knocked Out Player) On Channel %1 ",
    args0: [
      {
        type: "input_value",
        name: "broadcast_message_as_knocked_out_player_on_channel",
        check: "String",
        align: "RIGHT"
      }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "tag_zone_other_character_name",
    message0: "Other Player's Name",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "String"
  },
  {
    type: "tag_zone_other_character_team_number",
    message0: "Other Player's Team Number",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Number"
  },
  {
    type: "player_position_detector_player_x_position",
    message0: "Player's X Position %1 ",
    args0: [{ type: "input_dummy" }],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["Number"]
  },
  {
    type: "player_position_detector_player_y_position",
    message0: "Player's Y Position %1 ",
    args0: [{ type: "input_dummy" }],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["Number"]
  },
  {
    type: "damage_custom",
    message0: "Damage Player (Custom Amount) %1 Amount %2 ",
    args0: [
      { type: "input_dummy" },
      { type: "input_value", name: "amount", check: "Number", align: "RIGHT" }
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null
  },
  {
    type: "number_with_commas",
    message0: "Convert Number To Text (With Commas) %1 ",
    args0: [
      {
        type: "input_value",
        name: "convert_number_to_text_with_commas",
        check: "Number",
        align: "RIGHT"
      }
    ],
    colour: 159.7,
    tooltip: "",
    helpUrl: "",
    output: "String"
  }
];
var functionNameMap = {
  logicBoolean: "logic_boolean",
  if: "controls_if",
  logicCompare: "logic_compare",
  logicOperation: "logic_operation",
  mathNumber: "math_number",
  mathArithmetic: "math_arithmetic",
  mathSingle: "math_single",
  mathTrig: "math_trig",
  mathNumberProperty: "math_number_property",
  changeBy: "math_change",
  mathRound: "math_round",
  randomIntegerFromTo: "math_random_int",
  text: "text",
  createTextWith: "text_join",
  lengthOf: "text_length",
  inText: "text_indexOf",
  textCharAt: "text_charAt",
  inTextGetSubstringFromTo: "text_getSubstring",
  variablesGet: "variables_get",
  setTo: "variables_set",
  broadcastMessageOnChannel: "message_broadcaster",
  setPropertyValue: "set_property",
  getProperty: "get_property",
  triggeringPlayersName: "current_character_name",
  addActivityFeedItemForEveryone: "add_activity_feed_item_for_everyone",
  addActivityFeedItemForTriggeringPlayer: "add_activity_feed_item_for_triggering_player",
  addActivityFeedItemForGameHost: "add_activity_feed_item_for_game_host",
  triggeringPlayersTeamNumber: "current_character_team_number",
  triggeringPlayersScore: "triggering_player_score",
  getScoreOfTeam: "get_team_score",
  isALiveGame: "is_a_live_game",
  isAnAssignment: "is_an_assignment",
  secondsIntoGame: "seconds_into_game",
  setObjectiveTo: "set_assignment_objective",
  setPercentageCompleteTo: "set_percentage_complete",
  incrementPercentageCompleteBy: "increment_percentage_complete",
  sendNotificationTitleContent: "send_custom_notification",
  otherPlayersName: "other_character_name",
  otherPlayersTeamNumber: "other_character_team_number",
  getPropertyAsOtherPlayer: "other_character_get_property",
  setPropertyAsOtherPlayerValue: "other_character_set_property",
  broadcastMessageAsOtherPlayerOnChannel: "other_character_message_broadcaster",
  grantPlayerSelectedItem: "grant",
  grantPlayerSelectedItemCustomAmountAmount: "grant_custom",
  setText: "set_billboard_text",
  setTextColorTo: "set_text_color",
  setImageUrl: "set_image",
  setFrameColorTo: "set_frame_color",
  questionsAnsweredCorrectlyInARow: "question_answering_streak",
  setMessageShownWhenPlayerAnswersCorrectly: "message_correct_answer",
  setMessageShownWhenPlayerAnswersIncorrectly: "message_incorrect_answer",
  setHeader: "set_header",
  setContent: "set_content",
  getAmountOfCurrentItem: "get_amount",
  setGuiText: "set_gui_text",
  getMinutes: "get_minutes",
  getSeconds: "get_seconds",
  getTimeLeftFormatted: "get_time_left_formatted",
  numberOfPlayersOnTeam: "get_player_count",
  knockedPlayersName: "knockout_manager_other_character_name",
  knockedPlayersTeamNumber: "knockout_manager_other_character_team_number",
  getPropertyAsKnockedOutPlayer: "knockout_manager_other_character_get_property",
  setPropertyAsKnockedOutPlayerValue: "knockout_manager_other_character_set_property",
  broadcastMessageAsKnockedOutPlayerOnChannel: "knockout_manager_other_character_message_broadcaster",
  tagZoneOtherCharacterName: "tag_zone_other_character_name",
  tagZoneOtherCharacterTeamNumber: "tag_zone_other_character_team_number",
  playersXPosition: "player_position_detector_player_x_position",
  playersYPosition: "player_position_detector_player_y_position",
  damagePlayerCustomAmountAmount: "damage_custom",
  convertNumberToTextWithCommas: "number_with_commas"
};

// src/lib/blocks/index.ts
function findBlockDefinition(type) {
  for (let def of blockDefinitions) {
    if (def.type === type) {
      return def;
    }
  }
  throw new Error(`Block definition not found for ${type}`);
}
function isValue(block) {
  return findBlockDefinition(block.type).hasOwnProperty("output");
}
function isNumberValue(block) {
  return findBlockDefinition(block.type)?.output === "Number";
}
function isStringValue(block) {
  return findBlockDefinition(block.type)?.output === "String";
}
function isBooleanValue(block) {
  return findBlockDefinition(block.type)?.output === "Boolean";
}
function isStatement(block) {
  return !isValue(block);
}
function isUnknown(block) {
  return isValue(block) && findBlockDefinition(block.type).output === null;
}
function blockValueContains(block, check) {
  if (isUnknown(block)) {
    return true;
  }
  if (!isValue(block)) {
    return false;
  }
  const def = findBlockDefinition(block.type);
  switch (typeof def.output) {
    case "string":
      return def.output === check;
    case "object":
      if (def.output === null || def.output === void 0) {
        return true;
      }
      return def.output.includes(check);
    case "undefined":
      return true;
    default:
      throw new Error(`Unexpected output type ${def.output}`);
  }
}
function isMaybeNumberValue(block) {
  return isNumberValue(block) || blockValueContains(block, "Number");
}
function isMaybeStringValue(block) {
  return isStringValue(block) || blockValueContains(block, "String");
}
function isMaybeBooleanValue(block) {
  return isBooleanValue(block) || blockValueContains(block, "Boolean");
}

// src/lib/convert.ts
function functionExpressionToBlocks(functionExpression, options) {
  return rootBlockToProgram(
    convertFunctionExpressionTop(functionExpression, options)
  );
}
function programToBlocks(program, options) {
  return rootBlockToProgram(convertProgramTop(program, options));
}
function rootBlockToProgram(rootBlock) {
  const variablesIdMap = {};
  findVariables(rootBlock, variablesIdMap);
  const variables = [];
  for (const key of Object.keys(variablesIdMap)) {
    variables.push({
      name: key,
      id: variablesIdMap[key]
    });
  }
  return {
    blocks: {
      languageVersion: 0,
      blocks: [rootBlock]
    },
    variables
  };
}
function findVariables(block, variablesIdMap) {
  if (block.type == "variables_set" || block.type == "variables_get" || block.type == "math_change") {
    const blockVar = block.fields.VAR;
    if (blockVar == null) {
      throw new ConvertError("Block must have VAR field");
    }
    const name = blockVar.id;
    if (variablesIdMap[name] == null) {
      variablesIdMap[name] = randomId();
    }
    blockVar.id = variablesIdMap[name];
  }
  if ("inputs" in block) {
    for (const key of Object.keys(block.inputs)) {
      const input = block.inputs[key];
      if (input?.block == null) {
        continue;
      }
      findVariables(input.block, variablesIdMap);
    }
  }
  if ("next" in block && block.next != null) {
    findVariables(block.next.block, variablesIdMap);
  }
}
var ConvertError = class extends Error {
  node;
  constructor(message, node) {
    super(message);
    this.name = "ConvertError";
    this.node = node ?? null;
  }
};
var AttachError = class extends Error {
  block;
  node;
  constructor(message, node, block) {
    super(message);
    this.name = "AttachError";
    this.block = block;
    this.node = node;
  }
};
function convertProgramTop(program, options) {
  const statements = [];
  for (const node of program.body) {
    if (node.type != "ImportDeclaration" && node.type != "ExportNamedDeclaration" && node.type != "ExportDefaultDeclaration" && node.type != "ExportAllDeclaration") {
      statements.push(node);
    }
  }
  if (statements.length == 1) {
    const statement = statements[0];
    if (statement.type == "FunctionDeclaration") {
      return convertFunctionExpressionTop(statement, options);
    }
    if (statement.type == "ExpressionStatement" && (statement.expression.type == "FunctionExpression" || statement.expression.type == "ArrowFunctionExpression")) {
      return convertFunctionExpressionTop(statement.expression, options);
    }
  }
  throw new ConvertError("Program isn't a function", program);
}
function convertFunctionExpressionTop(expr, options) {
  switch (expr.type) {
    case "FunctionDeclaration":
    case "FunctionExpression":
    case "ArrowFunctionExpression": {
      if (expr.params.length != 1) {
        throw new ConvertError(
          "Function must have only one device argument",
          expr
        );
      }
      const param = expr.params[0];
      if (param.type != "Identifier") {
        throw new ConvertError("Invalid function argument", param);
      }
      const ctx = { device: param.name, level: 0 };
      if (options.customConvertExpression != null) {
        ctx.customConvertExpression = options.customConvertExpression;
      }
      if (expr.body.type == "BlockStatement") {
        return convertBlockStatement(ctx, expr.body);
      } else {
        const ret = convertExpression(ctx, expr.body);
        if (ret.type == "$placeholder") {
          throw new ConvertError("Invalid function body", expr.body);
        } else {
        }
        return ret;
      }
    }
    default:
      throw new ConvertError("Invalid top expression type: " + expr.type, expr);
  }
}
function convertExpression(ctx, expr) {
  if (ctx.customConvertExpression != null) {
    let convertExpression2 = function(expr2) {
      return convertExpressionPure(ctx, expr2);
    };
    return ctx.customConvertExpression(expr, ctx, convertExpression2);
  } else {
    return convertExpressionPure(ctx, expr);
  }
}
function convertExpressionPure(ctx, expr) {
  switch (expr.type) {
    case "FunctionExpression":
      throw new ConvertError("FunctionExpression not supported", expr);
    case "Literal":
      return convertLiteral(expr);
    case "BinaryExpression":
      return convertBinaryExpression(ctx, expr);
    case "LogicalExpression":
      return convertLogicalExpression(ctx, expr);
    case "Identifier":
      return convertIdentifier(ctx, expr);
    case "AssignmentExpression":
      return convertAssignmentExpression(ctx, expr);
    case "CallExpression":
      return convertCallExpression(ctx, expr);
    case "TemplateLiteral":
      return convertTemplateLiteral(ctx, expr);
    default:
      throw new ConvertError("Invalid expression type: " + expr.type, expr);
  }
}
function convertCallExpression(ctx, expr) {
  switch (expr.callee.type) {
    case "Identifier":
      return convertIdentifierCallExpression(ctx, expr, expr.callee);
    case "MemberExpression":
      return convertMemberCallExpression(ctx, expr, expr.callee);
    default:
      throw new ConvertError(
        "Invalid callee type: " + expr.callee.type,
        expr.callee
      );
  }
}
function convertIdentifierCallExpression(ctx, expr, identifier) {
  switch (identifier.name) {
    case "alert":
      return { type: "$placeholder", kind: "skip" };
    default: {
      throw new ConvertError(
        "Invalid function call: " + identifier.name,
        identifier
      );
    }
  }
}
function convertMemberCallExpression(ctx, expr, member) {
  if (member.object.type != "Identifier") {
    throw new ConvertError("Invalid object type", member.object);
  }
  if (member.property.type != "Identifier") {
    throw new ConvertError("Invalid property type", member.property);
  }
  switch (member.object.name + "." + member.property.name) {
    case "console.log":
      return { type: "$placeholder", kind: "skip" };
    case "Math.sin":
      return convertTrig(ctx, expr, "SIN");
    case "Math.cos":
      return convertTrig(ctx, expr, "COS");
    case "Math.tan":
      return convertTrig(ctx, expr, "TAN");
    case "Math.asin":
      return convertTrig(ctx, expr, "ASIN");
    case "Math.acos":
      return convertTrig(ctx, expr, "ACOS");
    case "Math.atan":
      return convertTrig(ctx, expr, "ATAN");
    default: {
      if (ctx.device == null) {
        throw new ConvertError(
          "Invalid member call expression: " + member.object.name + "." + member.property.name,
          expr
        );
      }
      if (ctx.device != member.object.name) {
        throw new ConvertError(
          `Invalid function-calling object name: ${member.object.name}, only the device ${ctx.device} is allowed`,
          member.object
        );
      }
      const ret = convertCallExpressionToFunctionBlock(
        ctx,
        expr,
        member.property.name
      );
      if (ret == null) {
        throw new ConvertError(
          "Invalid function name: " + member.property.name,
          member.property
        );
      }
      return ret;
    }
  }
}
function convertFunctionArg(ctx, expr) {
  if (expr.type == "SpreadElement") {
    throw new ConvertError("SpreadElement in function argument not supported");
  }
  const ret = convertExpression(ctx, expr);
  if (ret.type == "$placeholder") {
    switch (ret.kind) {
      case "skip":
        throw new ConvertError("Invalid function argument", expr);
      case "hole":
        return ret;
    }
  }
  if (!isValue(ret)) {
    throw new AttachError(
      `Function argument must be value, got ${ret.type}`,
      expr,
      ret
    );
  }
  return ret;
}
function isHole(block) {
  return block.type == "$placeholder" && block.kind == "hole";
}
function isSkip(block) {
  return block.type == "$placeholder" && block.kind == "skip";
}
function convertTrig(ctx, expr, trigFunc) {
  if (expr.arguments.length != 1) {
    throw new ConvertError(
      `Trig function ${trigFunc} requires 1 argument, got ${expr.arguments.length}`,
      expr
    );
  }
  const argBlock = convertFunctionArg(ctx, expr.arguments[0]);
  if (!isHole(argBlock) && !isMaybeNumberValue(argBlock)) {
    throw new AttachError(
      `Trig function argument must be number, got ${argBlock.type}`,
      expr.arguments[0],
      argBlock
    );
  }
  if (trigFunc == "SIN" || trigFunc == "COS" || trigFunc == "TAN") {
    let inputs = {};
    if (!isHole(argBlock)) {
      inputs.NUM = {
        block: withArithmetic(argBlock, 57.2957795131, "MULTIPLY")
      };
    }
    return {
      id: randomId(),
      type: "math_trig",
      fields: {
        OP: trigFunc
      },
      inputs
    };
  } else {
    let inputs = {};
    if (!isHole(argBlock)) {
      inputs.NUM = {
        block: argBlock
      };
    }
    return withArithmetic(
      {
        id: randomId(),
        type: "math_trig",
        fields: { OP: trigFunc },
        inputs
      },
      // 2pi/360
      0.01745329251,
      "MULTIPLY"
    );
  }
}
function withArithmetic(left, right, arithmetic) {
  return {
    id: randomId(),
    type: "math_arithmetic",
    fields: {
      OP: arithmetic
    },
    inputs: {
      A: {
        block: typeof left == "number" ? { type: "math_number", id: randomId(), fields: { NUM: left } } : left
      },
      B: {
        block: typeof right == "number" ? { type: "math_number", id: randomId(), fields: { NUM: right } } : right
      }
    }
  };
}
function keysOf(obj) {
  return Object.keys(obj);
}
function convertCallExpressionToFunctionBlock(ctx, expr, identifierName) {
  const key = keysOf(functionNameMap).find(
    (functionName) => functionName == identifierName
  );
  if (key == null) {
    return null;
  }
  const blockType = functionNameMap[key];
  if (blockType == "text_join") {
    return convertTextJoin(ctx, expr);
  }
  let def = findBlockDefinition(blockType);
  let defArgs = def?.args0 ?? [];
  let args = defArgs.filter((arg) => arg.type != "input_dummy");
  if (args.length != expr.arguments.length) {
    throw new ConvertError(
      `Function ${identifierName} requires ${defArgs.length} arguments, got ${expr.arguments.length}`,
      expr
    );
  }
  let inputs = {};
  let fields = {};
  for (let i = 0; i < expr.arguments.length; i++) {
    let arg = args[i];
    let argExpr = expr.arguments[i];
    if (argExpr.type == "SpreadElement") {
      throw new ConvertError(
        "SpreadElement in function call not supported",
        argExpr
      );
    }
    addArgument(ctx, arg, argExpr, inputs, fields);
  }
  let ret = {
    id: randomId(),
    type: blockType
  };
  if (Object.keys(inputs).length > 0) {
    ret.inputs = inputs;
  }
  if (Object.keys(fields).length > 0) {
    ret.fields = fields;
  }
  return ret;
}
function convertTextJoin(ctx, expr) {
  let inputs = {};
  for (let i = 0; i < expr.arguments.length; i++) {
    let argExpr = expr.arguments[i];
    let block = convertFunctionArg(ctx, argExpr);
    if (isHole(block)) {
      continue;
    }
    inputs[`ADD${i}`] = { block };
  }
  return {
    id: randomId(),
    type: "text_join",
    inputs,
    extraState: {
      itemCount: expr.arguments.length
    }
  };
}
function addArgument(ctx, arg, expr, inputs, fields) {
  switch (arg.type) {
    case "input_value": {
      let block = convertExpression(ctx, expr);
      if (isSkip(block)) {
        throw new ConvertError("Invalid argument expression", expr);
      }
      if (isHole(block)) {
        return;
      }
      if (!isValue(block)) {
        throw new AttachError(
          `Argument must be value, got ${block.type}`,
          expr,
          block
        );
      }
      let argDef = findBlockDefinition(block.type);
      if (!checkMatches(arg?.check, argDef.output)) {
        throw new ConvertError(
          `Argument type mismatch: ${displayCheck(arg.check)} != ${displayCheck(
            argDef.output
          )}`,
          expr
        );
      }
      inputs[arg.name] = { block };
      break;
    }
    case "input_dummy": {
      throw new ConvertError("Dummy argument not supported", expr);
    }
    case "input_statement": {
      throw new ConvertError("Statement args not supported", expr);
    }
    case "field_colour": {
      let literal = getLiteralString(expr);
      if (literal == null) {
        throw new ConvertError("Color argument must be literal string", expr);
      }
      fields[arg.name] = literal;
      break;
    }
    case "field_dropdown": {
      let literal = getLiteralString(expr);
      if (literal == null) {
        throw new ConvertError(
          "Dropdown argument must be literal string",
          expr
        );
      }
      let argOptions = arg.options.map((option) => option[1]);
      if (!argOptions.includes(literal)) {
        throw new ConvertError(
          `Dropdown argument must be one of these options: ${argOptions.join(
            ", "
          )}`,
          expr
        );
      }
      fields[arg.name] = literal;
      break;
    }
    case "field_number": {
      let literal = getLiteralNumber(expr);
      if (literal == null) {
        throw new ConvertError("Number argument must be literal number", expr);
      }
      fields[arg.name] = literal;
      break;
    }
    case "field_variable": {
      throw new ConvertError("Variable argument not supported", expr);
    }
    case "field_input": {
      let literal = getLiteralString(expr);
      if (literal == null) {
        throw new ConvertError("Input argument must be literal string", expr);
      }
      fields[arg.name] = literal;
      break;
    }
    default:
      throw new ConvertError("Unknown argument type: " + arg);
  }
}
function checkMatches(recieve, give) {
  if (recieve == null || give == null) {
    return true;
  }
  if (typeof recieve == "string" && typeof give == "string" && recieve == give) {
    return true;
  }
  if (typeof recieve == "string") {
    for (let check of give) {
      if (check == recieve) {
        return true;
      }
    }
  }
  if (typeof give == "string") {
    for (let check of recieve) {
      if (check == give) {
        return true;
      }
    }
  }
  return false;
}
function displayCheck(check) {
  if (check == null) {
    return "any";
  }
  if (typeof check == "string") {
    return check;
  }
  return check.join(" | ");
}
function getLiteralString(expr) {
  if (expr.type != "Literal") {
    return null;
  }
  if (typeof expr.value != "string") {
    return null;
  }
  return expr.value;
}
function getLiteralNumber(expr) {
  if (expr.type != "Literal") {
    return null;
  }
  if (typeof expr.value != "number") {
    return null;
  }
  return expr.value;
}
function mapMaybeHole(block, f) {
  if (isHole(block)) {
    return block;
  }
  return f(block);
}
function inputsWithMaybeHole(args) {
  let ret = {};
  for (let key of Object.keys(args)) {
    let arg = args[key];
    if (isHole(arg)) {
      return ret;
    }
    ret[key] = { block: arg };
  }
  return ret;
}
function convertAssignmentExpression(ctx, expr) {
  let rightExpr = convertExpression(ctx, expr.right);
  let rightExprChecked = mapMaybeHole(rightExpr, (rightExpr2) => {
    if (isSkip(rightExpr2)) {
      throw new ConvertError("Invalid right expression", expr.right);
    }
    if (!isValue(rightExpr2)) {
      throw new AttachError(
        `Right of assignment must be expression, got ${rightExpr2.type}`,
        expr,
        rightExpr2
      );
    }
    return rightExpr2;
  });
  const name = convertPattern(expr.left);
  if (ctx.device != null && name == ctx.device) {
    throw new ConvertError(
      `Can't declare variable with name ${name}, it's reserved for device`,
      expr.left
    );
  }
  switch (expr.operator) {
    case "=":
      return {
        id: randomId(),
        type: "variables_set",
        fields: {
          VAR: {
            id: name
          }
        },
        inputs: inputsWithMaybeHole({
          VALUE: rightExprChecked
        })
      };
    case "+=": {
      return {
        id: randomId(),
        type: "math_change",
        fields: {
          VAR: {
            id: name
          }
        },
        inputs: inputsWithMaybeHole({
          DELTA: mapMaybeHole(rightExprChecked, (blockExpr) => {
            if (!isMaybeNumberValue(blockExpr)) {
              throw new AttachError(
                `Right of math_change must be number, got ${blockExpr.type}`,
                expr.right,
                blockExpr
              );
            }
            return blockExpr;
          })
        })
      };
    }
    default:
      throw new ConvertError(
        "Unsupported assignment operator: " + expr.operator
      );
  }
}
function convertLiteral(expr) {
  switch (typeof expr.value) {
    case "number":
      return {
        id: randomId(),
        type: "math_number",
        fields: {
          NUM: expr.value
        }
      };
    case "string":
      return createTextBlock(expr.value);
    case "boolean":
      return {
        id: randomId(),
        type: "logic_boolean",
        fields: {
          BOOL: expr.value ? "TRUE" : "FALSE"
        }
      };
    case "object":
      if (expr.value === null) {
        return {
          type: "$placeholder",
          kind: "hole"
        };
      } else {
        throw new ConvertError("Invalid literal value: " + expr.value, expr);
      }
    default:
      throw new ConvertError(
        "Invalid literal type: " + typeof expr.value,
        expr
      );
  }
}
function convertTemplateLiteral(ctx, expr) {
  if (expr.expressions.length == 0) {
    return createTextBlock(expr.quasis[0].value.raw);
  }
  let inputs = {};
  let index = 0;
  function addToInputs(block) {
    index += 1;
    if (isHole(block)) {
      return;
    }
    inputs[`ADD${index - 1}`] = { block };
  }
  function addQuasisExpr(quasisExpr) {
    if (quasisExpr.value.raw == "")
      return;
    for (let chunk of chunkStringMaxLength(quasisExpr.value.raw)) {
      addToInputs({
        id: randomId(),
        type: "text",
        fields: {
          TEXT: chunk
        }
      });
    }
  }
  function addExpr(expr2) {
    let block = convertExpression(ctx, expr2);
    addToInputs(
      mapMaybeHole(block, (block2) => {
        if (isSkip(block2)) {
          throw new ConvertError("Invalid template literal expression", expr2);
        }
        if (!isValue(block2)) {
          throw new ConvertError(
            "Template literal expression must be value",
            expr2
          );
        }
        return block2;
      })
    );
  }
  for (let i = 0; i < expr.expressions.length; i++) {
    let quasisExpr = expr.quasis[i];
    let exprExpr = expr.expressions[i];
    addQuasisExpr(quasisExpr);
    addExpr(exprExpr);
  }
  addQuasisExpr(expr.quasis[expr.quasis.length - 1]);
  return {
    id: randomId(),
    type: "text_join",
    inputs,
    extraState: {
      itemCount: Object.keys(inputs).length
    }
  };
}
var MAX_TEXT_LENGTH = 512;
function chunkStringMaxLength(string) {
  let chunks = [];
  for (let i = 0; i < string.length; i += MAX_TEXT_LENGTH) {
    chunks.push(string.slice(i, i + MAX_TEXT_LENGTH));
  }
  return chunks;
}
function createTextBlock(text) {
  let chunks = chunkStringMaxLength(text);
  if (chunks.length == 1) {
    return {
      id: randomId(),
      type: "text",
      fields: {
        TEXT: text
      }
    };
  }
  return {
    id: randomId(),
    type: "text_join",
    inputs: chunks.map((chunk, i) => {
      let textBlock = {
        id: randomId(),
        type: "text",
        fields: {
          TEXT: chunk
        }
      };
      let ret = {
        [`ADD${i}`]: {
          block: textBlock
        }
      };
      return ret;
    }).reduce((a, b) => ({ ...a, ...b }), {}),
    extraState: {
      itemCount: chunks.length
    }
  };
}
function convertBinaryExpression(ctx, expr) {
  const left = expr.left;
  if (left.type == "PrivateIdentifier") {
    throw new ConvertError("PrivateIdentifier not supported", expr);
  }
  const op = convertBinaryOperator(expr.operator);
  if (op == null) {
    throw new ConvertError("Invalid operator: " + expr.operator, expr);
  }
  const leftExpr = convertExpression(ctx, left);
  if (isSkip(leftExpr)) {
    throw new ConvertError("Invalid left expression", left);
  }
  const rightExpr = convertExpression(ctx, expr.right);
  if (isSkip(rightExpr)) {
    throw new ConvertError("Invalid right expression", expr.right);
  }
  if (op.tag == "logic_compare") {
    return {
      type: "logic_compare",
      id: randomId(),
      inputs: inputsWithMaybeHole({
        A: mapMaybeHole(leftExpr, (blockExpr) => {
          if (!isValue(blockExpr)) {
            throw new AttachError(
              `Left of logic_compare must be expression, got ${blockExpr.type}`,
              left,
              blockExpr
            );
          }
          return blockExpr;
        }),
        B: mapMaybeHole(rightExpr, (blockExpr) => {
          if (!isValue(blockExpr)) {
            throw new AttachError(
              `Right of logic_compare must be expression, got ${blockExpr.type}`,
              expr.right,
              blockExpr
            );
          }
          return blockExpr;
        })
      }),
      fields: {
        OP: op.operator
      }
    };
  } else {
    if ((!isHole(leftExpr) && !isMaybeNumberValue(leftExpr) || !isHole(rightExpr) && !isMaybeNumberValue(rightExpr)) && op.operator == "ADD") {
      if ((isHole(leftExpr) || isMaybeStringValue(leftExpr)) && (isHole(rightExpr) || isMaybeStringValue(rightExpr))) {
        return {
          type: "text_join",
          id: randomId(),
          // inputs: {
          //   ADD0: {
          //     block: leftExpr,
          //   },
          //   ADD1: {
          //     block: rightExpr,
          //   },
          // },
          inputs: inputsWithMaybeHole({
            ADD0: leftExpr,
            ADD1: rightExpr
          }),
          extraState: {
            itemCount: 2
          }
        };
      }
    }
    return {
      type: "math_arithmetic",
      id: randomId(),
      inputs: inputsWithMaybeHole({
        A: mapMaybeHole(leftExpr, (blockExpr) => {
          if (!isMaybeNumberValue(blockExpr)) {
            throw new AttachError(
              `Left of math_arithmetic must be number, got ${blockExpr.type}`,
              left,
              blockExpr
            );
          }
          return blockExpr;
        }),
        B: mapMaybeHole(rightExpr, (blockExpr) => {
          if (!isMaybeNumberValue(blockExpr)) {
            throw new AttachError(
              `Right of math_arithmetic must be number, got ${blockExpr.type}`,
              expr.right,
              blockExpr
            );
          }
          return blockExpr;
        })
      }),
      fields: {
        OP: op.operator
      }
    };
  }
}
function convertLogicalExpression(ctx, expr) {
  const left = expr.left;
  const op = convertLogicalOperator(expr.operator);
  if (op == null) {
    throw new ConvertError("Invalid operator: " + expr.operator, expr);
  }
  const leftExpr = convertExpression(ctx, left);
  const rightExpr = convertExpression(ctx, expr.right);
  return {
    type: "logic_operation",
    id: randomId(),
    inputs: inputsWithMaybeHole({
      A: mapMaybeHole(leftExpr, (blockExpr) => {
        if (isSkip(blockExpr)) {
          throw new ConvertError("Invalid left expression", left);
        }
        if (!isMaybeBooleanValue(blockExpr)) {
          throw new AttachError(
            `Left of logical expression must be boolean, got ${blockExpr.type}`,
            left,
            blockExpr
          );
        }
        return blockExpr;
      }),
      B: mapMaybeHole(rightExpr, (blockExpr) => {
        if (isSkip(blockExpr)) {
          throw new ConvertError("Invalid right expression", expr.right);
        }
        if (!isMaybeBooleanValue(blockExpr)) {
          throw new AttachError(
            `Right of logical expression must be boolean, got ${blockExpr.type}`,
            expr.right,
            blockExpr
          );
        }
        return blockExpr;
      })
    }),
    fields: {
      OP: op
    }
  };
}
function convertLogicalOperator(operator) {
  switch (operator) {
    case "&&":
      return "AND";
    case "||":
      return "OR";
    default:
      return null;
  }
}
function convertBinaryOperator(operator) {
  function ret(tag, operator2) {
    return { tag, operator: operator2 };
  }
  switch (operator) {
    case "==":
      return ret("logic_compare", "EQ");
    case "===":
      return ret("logic_compare", "EQ");
    case "!=":
      return ret("logic_compare", "NEQ");
    case "!==":
      return ret("logic_compare", "NEQ");
    case "<":
      return ret("logic_compare", "LT");
    case "<=":
      return ret("logic_compare", "LTE");
    case ">":
      return ret("logic_compare", "GT");
    case ">=":
      return ret("logic_compare", "GTE");
    case "+":
      return ret("math_arithmetic", "ADD");
    case "-":
      return ret("math_arithmetic", "MINUS");
    case "*":
      return ret("math_arithmetic", "MULTIPLY");
    case "**":
      return ret("math_arithmetic", "POWER");
    case "/":
      return ret("math_arithmetic", "DIVIDE");
    default:
      return null;
  }
}
function convertBlockStatement(ctx, blockStatement) {
  return convertStatementList(
    { ...ctx, level: ctx.level + 1 },
    blockStatement.body
  );
}
function convertStatementList(ctx, statements) {
  const blocks = [];
  for (const statement of statements) {
    const block = convertStatement(ctx, statement);
    if (isSkip(block)) {
      continue;
    }
    blocks.push(block);
  }
  const ret = blocks.at(0);
  if (ret == null) {
    throw new ConvertError("Empty statement list");
  }
  for (let i = 0; i < blocks.length - 1; i++) {
    const block = blocks[i];
    const nextBlock = blocks[i + 1];
    if (!isStatement(block) || !isStatement(nextBlock)) {
      throw new AttachError(
        `Can't attach ${block.type} to ${nextBlock.type} sequentially`,
        statements[i],
        isStatement(block) ? nextBlock : block
      );
    }
    block.next = { block: nextBlock };
  }
  return ret;
}
function convertStatement(ctx, statement) {
  switch (statement.type) {
    case "VariableDeclaration":
      return convertVariableDeclaration(ctx, statement);
    case "IfStatement":
      return convertIfStatement(ctx, statement);
    case "BlockStatement":
      return convertBlockStatement(ctx, statement);
    case "ExpressionStatement": {
      let expr = convertExpression(ctx, statement.expression);
      if (isHole(expr)) {
        throw new ConvertError("Can't have hole as a statement", statement);
      }
      return expr;
    }
    case "ThrowStatement":
      return { type: "$placeholder", kind: "skip" };
    default:
      throw new ConvertError(
        "Invalid statement type: " + statement.type,
        statement
      );
  }
}
function convertVariableDeclaration(ctx, statement) {
  const declarations = [];
  if (ctx.level > 1 && (statement.kind == "let" || statement.kind == "const")) {
    throw new ConvertError(
      "Let and const are only allowed in top level block (Blockly variables don't have block scope)",
      statement
    );
  }
  for (const declaration of statement.declarations) {
    const declarationInit = declaration.init;
    if (declarationInit == null) {
      throw new ConvertError(
        "Variable declaration must have init",
        declaration
      );
    }
    const initExpr = mapMaybeHole(
      convertExpression(ctx, declarationInit),
      (initExpr2) => {
        if (isSkip(initExpr2)) {
          throw new ConvertError("Invalid init expression", declarationInit);
        }
        if (!isValue(initExpr2)) {
          throw new AttachError(
            `Init of variable declaration must be expression, got ${initExpr2.type}`,
            declaration,
            initExpr2
          );
        }
        return initExpr2;
      }
    );
    const name = convertPattern(declaration.id);
    if (ctx.device != null && name == ctx.device) {
      throw new ConvertError(
        `Can't declare variable with name ${name}, it's reserved for device`,
        declaration.id
      );
    }
    const block = {
      id: randomId(),
      type: "variables_set",
      fields: {
        VAR: {
          id: name
        }
      },
      inputs: inputsWithMaybeHole({
        VALUE: initExpr
      })
    };
    declarations.push(block);
  }
  const ret = declarations.at(0);
  if (ret == null) {
    throw new ConvertError("Empty variable declaration", statement);
  }
  for (let i = 0; i < declarations.length - 1; i++) {
    const block = declarations[i];
    block.next = { block: declarations[i + 1] };
  }
  return ret;
}
function convertPattern(pattern) {
  switch (pattern.type) {
    case "Identifier":
      return pattern.name;
    default:
      throw new ConvertError("Invalid pattern type: " + pattern.type, pattern);
  }
}
function convertIdentifier(ctx, identifier) {
  if (ctx.device != null && identifier.name == ctx.device) {
    throw new ConvertError(
      `Can't use ${identifier.name} as a variable, it's reserved for device functions`,
      identifier
    );
  }
  return {
    id: randomId(),
    type: "variables_get",
    fields: {
      VAR: {
        id: identifier.name
      }
    }
  };
}
function convertIfStatement(ctx, statement) {
  const flattened = flattenIfStatement(statement);
  const block = {
    id: randomId(),
    type: "controls_if",
    inputs: {}
  };
  if (flattened.length > 1) {
    block.extraState = {
      elseIfCount: flattened.length - 1
    };
  }
  for (let i = 0; i < flattened.length; i++) {
    const current = flattened[i];
    const testExpr = mapMaybeHole(
      convertExpression(ctx, current.test),
      (testExpr2) => {
        if (isSkip(testExpr2)) {
          throw new ConvertError("Invalid test expression", current.test);
        }
        if (!isMaybeBooleanValue(testExpr2)) {
          throw new AttachError(
            `If test must be boolean, got ${testExpr2.type}`,
            current.test,
            testExpr2
          );
        }
        return testExpr2;
      }
    );
    if (!isHole(testExpr)) {
      block.inputs[`IF${i}`] = {
        block: testExpr
      };
    }
    const doExpr = mapMaybeHole(
      convertStatement({ ...ctx, level: ctx.level + 1 }, current.consequent),
      (doExpr2) => {
        if (isSkip(doExpr2)) {
          throw new ConvertError("Invalid do expression", current.consequent);
        }
        if (!isStatement(doExpr2)) {
          throw new AttachError(
            `Do of if statement must be statement, got ${doExpr2.type}`,
            current.consequent,
            doExpr2
          );
        }
        return doExpr2;
      }
    );
    if (!isHole(doExpr)) {
      block.inputs[`DO${i}`] = {
        block: doExpr
      };
    }
  }
  const lastFlattened = flattened[flattened.length - 1];
  let alt = lastFlattened.alternate;
  if (alt != null) {
    const elseExpr = mapMaybeHole(
      convertStatement({ ...ctx, level: ctx.level + 1 }, alt),
      (elseExpr2) => {
        if (isSkip(elseExpr2)) {
          throw new ConvertError("Invalid else expression", alt);
        }
        if (!isStatement(elseExpr2)) {
          throw new AttachError(
            `Else of if statement must be statement, got ${elseExpr2.type}`,
            alt,
            elseExpr2
          );
        }
        return elseExpr2;
      }
    );
    if (!isHole(elseExpr)) {
      block.inputs["ELSE"] = {
        block: elseExpr
      };
    }
    if (block.extraState == null) {
      block.extraState = {
        hasElse: true
      };
    } else {
      block.extraState.hasElse = true;
    }
  }
  return block;
}
function flattenIfStatement(statement) {
  const ret = [];
  let current = statement;
  while (current?.type == "IfStatement") {
    ret.push(current);
    current = current.alternate;
  }
  return ret;
}
function randomId() {
  let ret = "";
  for (let i = 0; i < 20; i++) {
    const char = String.fromCharCode(Math.floor(Math.random() * 94) + 33);
    ret += char;
  }
  return ret;
}

// src/index.ts
var defaultOptions = {
  jsStringType: "program",
  acornOptions: {
    ecmaVersion: 2020
  }
};
function jsToBlocks(jsString, options = {}) {
  const optionsWithDefaults = { ...defaultOptions, ...options };
  if (optionsWithDefaults.jsStringType === "program") {
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
export {
  AttachError,
  ConvertError,
  functionExpressionToBlocks as acornFunctionExpressionToBlocks,
  programToBlocks as acornProgramToBlocks,
  defaultOptions,
  jsToBlocks
};
