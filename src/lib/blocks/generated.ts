import * as Basic from "./basic";
export type LogicBooleanBlock = Basic.BlockBase & {
  type: "logic_boolean";
  fields: { BOOL?: "TRUE" | "FALSE" };
};
export type ControlsIfBlock = Basic.BlockBase & {
  extraState?: { hasElse?: true; elseIfCount?: number };
} & {
  type: "controls_if";
  inputs: Partial<
    Record<
      `IF${number}`,
      { block: BooleanValueBlock | MaybeBooleanValueBlock }
    > &
      Record<`DO${number}` | "ELSE", { block: StatementBlock }>
  >;
  next?: { block: StatementBlock };
};
export type LogicCompareBlock = Basic.BlockBase & {
  type: "logic_compare";
  fields: { OP?: "EQ" | "NEQ" | "LT" | "LTE" | "GT" | "GTE" };
  inputs: { A?: { block: ValueBlock }; B?: { block: ValueBlock } };
};
export type LogicOperationBlock = Basic.BlockBase & {
  type: "logic_operation";
  fields: { OP?: "AND" | "OR" };
  inputs: {
    A?: { block: BooleanValueBlock | MaybeBooleanValueBlock };
    B?: { block: BooleanValueBlock | MaybeBooleanValueBlock };
  };
};
export type MathNumberBlock = Basic.BlockBase & {
  type: "math_number";
  fields: { NUM?: number };
};
export type MathArithmeticBlock = Basic.BlockBase & {
  type: "math_arithmetic";
  fields: { OP?: "ADD" | "MINUS" | "MULTIPLY" | "DIVIDE" | "POWER" };
  inputs: {
    A?: { block: NumberValueBlock | MaybeNumberValueBlock };
    B?: { block: NumberValueBlock | MaybeNumberValueBlock };
  };
};
export type MathSingleBlock = Basic.BlockBase & {
  type: "math_single";
  fields: { OP?: "ROOT" | "ABS" | "NEG" | "LN" | "LOG10" | "EXP" | "POW10" };
  inputs: { NUM?: { block: NumberValueBlock | MaybeNumberValueBlock } };
};
export type MathTrigBlock = Basic.BlockBase & {
  type: "math_trig";
  fields: { OP?: "SIN" | "COS" | "TAN" | "ASIN" | "ACOS" | "ATAN" };
  inputs: { NUM?: { block: NumberValueBlock | MaybeNumberValueBlock } };
};
export type MathNumberPropertyBlock = Basic.BlockBase & {
  type: "math_number_property";
  fields: {
    PROPERTY?:
      | "EVEN"
      | "ODD"
      | "PRIME"
      | "WHOLE"
      | "POSITIVE"
      | "NEGATIVE"
      | "DIVISIBLE_BY";
  };
  inputs: {
    NUMBER_TO_CHECK?: { block: NumberValueBlock | MaybeNumberValueBlock };
  };
};
export type MathChangeBlock = Basic.BlockBase & {
  type: "math_change";
  fields: { VAR?: { id: Basic.Id } };
  inputs: { DELTA?: { block: NumberValueBlock | MaybeNumberValueBlock } };
  next?: { block: StatementBlock };
};
export type MathRoundBlock = Basic.BlockBase & {
  type: "math_round";
  fields: { OP?: "ROUND" | "ROUNDUP" | "ROUNDDOWN" };
  inputs: { NUM?: { block: NumberValueBlock | MaybeNumberValueBlock } };
};
export type MathRandomIntBlock = Basic.BlockBase & {
  type: "math_random_int";
  inputs: {
    FROM?: { block: NumberValueBlock | MaybeNumberValueBlock };
    TO?: { block: NumberValueBlock | MaybeNumberValueBlock };
  };
};
export type TextBlock = Basic.BlockBase & {
  type: "text";
  fields: { TEXT?: string };
};
export type TextJoinBlock = Basic.BlockBase & {
  extraState?: { itemCount?: number };
} & {
  type: "text_join";
  inputs: Partial<Record<`ADD${number}`, { block: ValueBlock }>>;
};
export type TextLengthBlock = Basic.BlockBase & {
  type: "text_length";
  inputs: { VALUE?: { block: StringValueBlock | MaybeStringValueBlock } };
};
export type TextIndexOfBlock = Basic.BlockBase & {
  type: "text_indexOf";
  fields: { END?: "FIRST" | "LAST" };
  inputs: {
    VALUE?: { block: StringValueBlock | MaybeStringValueBlock };
    FIND?: { block: StringValueBlock | MaybeStringValueBlock };
  };
};
export type TextCharAtBlock = Basic.BlockBase & {
  type: "text_charAt";
  fields: { WHERE?: "FROM_START" | "FROM_END" | "FIRST" | "LAST" | "RANDOM" };
  inputs: { VALUE?: { block: StringValueBlock | MaybeStringValueBlock } };
};
export type TextGetSubstringBlock = Basic.BlockBase & {
  type: "text_getSubstring";
  fields: {
    WHERE1?: "FROM_START" | "FROM_END" | "FIRST";
    WHERE2?: "FROM_START" | "FROM_END" | "LAST";
  };
  inputs: {
    STRING?: { block: StringValueBlock | MaybeStringValueBlock };
    AT1?: { block: NumberValueBlock | MaybeNumberValueBlock };
    AT2?: { block: NumberValueBlock | MaybeNumberValueBlock };
  };
};
export type VariablesGetBlock = Basic.BlockBase & {
  type: "variables_get";
  fields: { VAR?: { id: Basic.Id } };
};
export type VariablesSetBlock = Basic.BlockBase & {
  type: "variables_set";
  fields: { VAR?: { id: Basic.Id } };
  inputs: { VALUE?: { block: ValueBlock } };
  next?: { block: StatementBlock };
};
export type MessageBroadcasterBlock = Basic.BlockBase & {
  type: "message_broadcaster";
  inputs: {
    broadcast_message_on_channel?: {
      block: StringValueBlock | MaybeStringValueBlock;
    };
  };
  next?: { block: StatementBlock };
};
export type SetPropertyBlock = Basic.BlockBase & {
  type: "set_property";
  inputs: {
    set_property?: { block: StringValueBlock | MaybeStringValueBlock };
    value?: {
      block:
        | (StringValueBlock | MaybeStringValueBlock)
        | (NumberValueBlock | MaybeNumberValueBlock)
        | (BooleanValueBlock | MaybeBooleanValueBlock);
    };
  };
  next?: { block: StatementBlock };
};
export type GetPropertyBlock = Basic.BlockBase & {
  type: "get_property";
  inputs: {
    get_property?: { block: StringValueBlock | MaybeStringValueBlock };
  };
};
export type CurrentCharacterNameBlock = Basic.BlockBase & {
  type: "current_character_name";
};
export type AddActivityFeedItemForEveryoneBlock = Basic.BlockBase & {
  type: "add_activity_feed_item_for_everyone";
  inputs: {
    add_activity_feed_item_for_everyone?: {
      block: StringValueBlock | MaybeStringValueBlock;
    };
  };
  next?: { block: StatementBlock };
};
export type AddActivityFeedItemForTriggeringPlayerBlock = Basic.BlockBase & {
  type: "add_activity_feed_item_for_triggering_player";
  inputs: {
    add_activity_feed_item_for_triggering_player?: {
      block: StringValueBlock | MaybeStringValueBlock;
    };
  };
  next?: { block: StatementBlock };
};
export type AddActivityFeedItemForGameHostBlock = Basic.BlockBase & {
  type: "add_activity_feed_item_for_game_host";
  inputs: {
    add_activity_feed_item_for_game_host?: {
      block: StringValueBlock | MaybeStringValueBlock;
    };
  };
  next?: { block: StatementBlock };
};
export type CurrentCharacterTeamNumberBlock = Basic.BlockBase & {
  type: "current_character_team_number";
};
export type TriggeringPlayerScoreBlock = Basic.BlockBase & {
  type: "triggering_player_score";
};
export type GetTeamScoreBlock = Basic.BlockBase & {
  type: "get_team_score";
  inputs: {
    get_score_of_team?: { block: NumberValueBlock | MaybeNumberValueBlock };
  };
};
export type IsALiveGameBlock = Basic.BlockBase & {
  type: "is_a_live_game";
};
export type IsAnAssignmentBlock = Basic.BlockBase & {
  type: "is_an_assignment";
};
export type SecondsIntoGameBlock = Basic.BlockBase & {
  type: "seconds_into_game";
};
export type SetAssignmentObjectiveBlock = Basic.BlockBase & {
  type: "set_assignment_objective";
  inputs: {
    set_objective_to?: { block: StringValueBlock | MaybeStringValueBlock };
  };
  next?: { block: StatementBlock };
};
export type SetPercentageCompleteBlock = Basic.BlockBase & {
  type: "set_percentage_complete";
  inputs: {
    set_percentage_complete_to?: {
      block: NumberValueBlock | MaybeNumberValueBlock;
    };
  };
  next?: { block: StatementBlock };
};
export type IncrementPercentageCompleteBlock = Basic.BlockBase & {
  type: "increment_percentage_complete";
  inputs: {
    increment_percentage_complete_by?: {
      block: NumberValueBlock | MaybeNumberValueBlock;
    };
  };
  next?: { block: StatementBlock };
};
export type SendCustomNotificationBlock = Basic.BlockBase & {
  type: "send_custom_notification";
  inputs: {
    title?: { block: StringValueBlock | MaybeStringValueBlock };
    content?: { block: StringValueBlock | MaybeStringValueBlock };
  };
  next?: { block: StatementBlock };
};
export type OtherCharacterNameBlock = Basic.BlockBase & {
  type: "other_character_name";
};
export type OtherCharacterTeamNumberBlock = Basic.BlockBase & {
  type: "other_character_team_number";
};
export type OtherCharacterGetPropertyBlock = Basic.BlockBase & {
  type: "other_character_get_property";
  inputs: {
    get_property_as_other_player?: {
      block: StringValueBlock | MaybeStringValueBlock;
    };
  };
};
export type OtherCharacterSetPropertyBlock = Basic.BlockBase & {
  type: "other_character_set_property";
  inputs: {
    set_property_as_other_player?: {
      block: StringValueBlock | MaybeStringValueBlock;
    };
    value?: {
      block:
        | (StringValueBlock | MaybeStringValueBlock)
        | (NumberValueBlock | MaybeNumberValueBlock)
        | (BooleanValueBlock | MaybeBooleanValueBlock);
    };
  };
  next?: { block: StatementBlock };
};
export type OtherCharacterMessageBroadcasterBlock = Basic.BlockBase & {
  type: "other_character_message_broadcaster";
  inputs: {
    broadcast_message_as_other_player_on_channel?: {
      block: StringValueBlock | MaybeStringValueBlock;
    };
  };
  next?: { block: StatementBlock };
};
export type GrantBlock = Basic.BlockBase & {
  type: "grant";
  next?: { block: StatementBlock };
};
export type GrantCustomBlock = Basic.BlockBase & {
  type: "grant_custom";
  inputs: { amount?: { block: NumberValueBlock | MaybeNumberValueBlock } };
  next?: { block: StatementBlock };
};
export type SetBillboardTextBlock = Basic.BlockBase & {
  type: "set_billboard_text";
  inputs: { set_text?: { block: StringValueBlock | MaybeStringValueBlock } };
  next?: { block: StatementBlock };
};
export type SetTextColorBlock = Basic.BlockBase & {
  type: "set_text_color";
  fields: { set_text_color_to?: Basic.Color };
  next?: { block: StatementBlock };
};
export type SetImageBlock = Basic.BlockBase & {
  type: "set_image";
  inputs: {
    set_image_url?: { block: StringValueBlock | MaybeStringValueBlock };
  };
  next?: { block: StatementBlock };
};
export type SetFrameColorBlock = Basic.BlockBase & {
  type: "set_frame_color";
  fields: { set_frame_color_to?: Basic.Color };
  next?: { block: StatementBlock };
};
export type QuestionAnsweringStreakBlock = Basic.BlockBase & {
  type: "question_answering_streak";
};
export type MessageCorrectAnswerBlock = Basic.BlockBase & {
  type: "message_correct_answer";
  inputs: {
    set_message_shown_when_player_answers_correctly?: {
      block: StringValueBlock | MaybeStringValueBlock;
    };
  };
  next?: { block: StatementBlock };
};
export type MessageIncorrectAnswerBlock = Basic.BlockBase & {
  type: "message_incorrect_answer";
  inputs: {
    set_message_shown_when_player_answers_incorrectly?: {
      block: StringValueBlock | MaybeStringValueBlock;
    };
  };
  next?: { block: StatementBlock };
};
export type SetHeaderBlock = Basic.BlockBase & {
  type: "set_header";
  inputs: { set_header?: { block: StringValueBlock | MaybeStringValueBlock } };
  next?: { block: StatementBlock };
};
export type SetContentBlock = Basic.BlockBase & {
  type: "set_content";
  inputs: { set_content?: { block: StringValueBlock | MaybeStringValueBlock } };
  next?: { block: StatementBlock };
};
export type GetAmountBlock = Basic.BlockBase & {
  type: "get_amount";
};
export type SetGuiTextBlock = Basic.BlockBase & {
  type: "set_gui_text";
  inputs: { set_text?: { block: StringValueBlock | MaybeStringValueBlock } };
  next?: { block: StatementBlock };
};
export type GetMinutesBlock = Basic.BlockBase & {
  type: "get_minutes";
};
export type GetSecondsBlock = Basic.BlockBase & {
  type: "get_seconds";
};
export type GetTimeLeftFormattedBlock = Basic.BlockBase & {
  type: "get_time_left_formatted";
};
export type GetPlayerCountBlock = Basic.BlockBase & {
  type: "get_player_count";
};
export type KnockoutManagerOtherCharacterNameBlock = Basic.BlockBase & {
  type: "knockout_manager_other_character_name";
};
export type KnockoutManagerOtherCharacterTeamNumberBlock = Basic.BlockBase & {
  type: "knockout_manager_other_character_team_number";
};
export type KnockoutManagerOtherCharacterGetPropertyBlock = Basic.BlockBase & {
  type: "knockout_manager_other_character_get_property";
  inputs: {
    get_property_as_knocked_out_player?: {
      block: StringValueBlock | MaybeStringValueBlock;
    };
  };
};
export type KnockoutManagerOtherCharacterSetPropertyBlock = Basic.BlockBase & {
  type: "knockout_manager_other_character_set_property";
  inputs: {
    set_property_as_knocked_out_player?: {
      block: StringValueBlock | MaybeStringValueBlock;
    };
    value?: {
      block:
        | (StringValueBlock | MaybeStringValueBlock)
        | (NumberValueBlock | MaybeNumberValueBlock)
        | (BooleanValueBlock | MaybeBooleanValueBlock);
    };
  };
  next?: { block: StatementBlock };
};
export type KnockoutManagerOtherCharacterMessageBroadcasterBlock =
  Basic.BlockBase & {
    type: "knockout_manager_other_character_message_broadcaster";
    inputs: {
      broadcast_message_as_knocked_out_player_on_channel?: {
        block: StringValueBlock | MaybeStringValueBlock;
      };
    };
    next?: { block: StatementBlock };
  };
export type TagZoneOtherCharacterNameBlock = Basic.BlockBase & {
  type: "tag_zone_other_character_name";
};
export type TagZoneOtherCharacterTeamNumberBlock = Basic.BlockBase & {
  type: "tag_zone_other_character_team_number";
};
export type PlayerPositionDetectorPlayerXPositionBlock = Basic.BlockBase & {
  type: "player_position_detector_player_x_position";
};
export type PlayerPositionDetectorPlayerYPositionBlock = Basic.BlockBase & {
  type: "player_position_detector_player_y_position";
};
export type DamageCustomBlock = Basic.BlockBase & {
  type: "damage_custom";
  inputs: { amount?: { block: NumberValueBlock | MaybeNumberValueBlock } };
  next?: { block: StatementBlock };
};
export type NumberWithCommasBlock = Basic.BlockBase & {
  type: "number_with_commas";
  inputs: {
    convert_number_to_text_with_commas?: {
      block: NumberValueBlock | MaybeNumberValueBlock;
    };
  };
};
export type NumberValueBlock =
  | MathNumberBlock
  | MathArithmeticBlock
  | MathSingleBlock
  | MathTrigBlock
  | MathRoundBlock
  | MathRandomIntBlock
  | TextLengthBlock
  | TextIndexOfBlock
  | CurrentCharacterTeamNumberBlock
  | TriggeringPlayerScoreBlock
  | GetTeamScoreBlock
  | SecondsIntoGameBlock
  | OtherCharacterTeamNumberBlock
  | QuestionAnsweringStreakBlock
  | KnockoutManagerOtherCharacterTeamNumberBlock
  | TagZoneOtherCharacterTeamNumberBlock;
export type StringValueBlock =
  | TextBlock
  | TextJoinBlock
  | TextCharAtBlock
  | TextGetSubstringBlock
  | CurrentCharacterNameBlock
  | OtherCharacterNameBlock
  | KnockoutManagerOtherCharacterNameBlock
  | TagZoneOtherCharacterNameBlock
  | NumberWithCommasBlock;
export type BooleanValueBlock =
  | LogicBooleanBlock
  | LogicCompareBlock
  | LogicOperationBlock
  | MathNumberPropertyBlock
  | IsALiveGameBlock
  | IsAnAssignmentBlock;
export type MaybeNumberValueBlock =
  | VariablesGetBlock
  | GetPropertyBlock
  | OtherCharacterGetPropertyBlock
  | GetAmountBlock
  | GetMinutesBlock
  | GetSecondsBlock
  | GetPlayerCountBlock
  | KnockoutManagerOtherCharacterGetPropertyBlock
  | PlayerPositionDetectorPlayerXPositionBlock
  | PlayerPositionDetectorPlayerYPositionBlock;
export type MaybeStringValueBlock =
  | VariablesGetBlock
  | GetPropertyBlock
  | OtherCharacterGetPropertyBlock
  | GetTimeLeftFormattedBlock
  | KnockoutManagerOtherCharacterGetPropertyBlock;
export type MaybeBooleanValueBlock =
  | VariablesGetBlock
  | GetPropertyBlock
  | OtherCharacterGetPropertyBlock
  | KnockoutManagerOtherCharacterGetPropertyBlock;
export type ValueBlock =
  | LogicBooleanBlock
  | LogicCompareBlock
  | LogicOperationBlock
  | MathNumberBlock
  | MathArithmeticBlock
  | MathSingleBlock
  | MathTrigBlock
  | MathNumberPropertyBlock
  | MathRoundBlock
  | MathRandomIntBlock
  | TextBlock
  | TextJoinBlock
  | TextLengthBlock
  | TextIndexOfBlock
  | TextCharAtBlock
  | TextGetSubstringBlock
  | VariablesGetBlock
  | GetPropertyBlock
  | CurrentCharacterNameBlock
  | CurrentCharacterTeamNumberBlock
  | TriggeringPlayerScoreBlock
  | GetTeamScoreBlock
  | IsALiveGameBlock
  | IsAnAssignmentBlock
  | SecondsIntoGameBlock
  | OtherCharacterNameBlock
  | OtherCharacterTeamNumberBlock
  | OtherCharacterGetPropertyBlock
  | QuestionAnsweringStreakBlock
  | GetAmountBlock
  | GetMinutesBlock
  | GetSecondsBlock
  | GetTimeLeftFormattedBlock
  | GetPlayerCountBlock
  | KnockoutManagerOtherCharacterNameBlock
  | KnockoutManagerOtherCharacterTeamNumberBlock
  | KnockoutManagerOtherCharacterGetPropertyBlock
  | TagZoneOtherCharacterNameBlock
  | TagZoneOtherCharacterTeamNumberBlock
  | PlayerPositionDetectorPlayerXPositionBlock
  | PlayerPositionDetectorPlayerYPositionBlock
  | NumberWithCommasBlock;
export type StatementBlock =
  | ControlsIfBlock
  | MathChangeBlock
  | VariablesSetBlock
  | MessageBroadcasterBlock
  | SetPropertyBlock
  | AddActivityFeedItemForEveryoneBlock
  | AddActivityFeedItemForTriggeringPlayerBlock
  | AddActivityFeedItemForGameHostBlock
  | SetAssignmentObjectiveBlock
  | SetPercentageCompleteBlock
  | IncrementPercentageCompleteBlock
  | SendCustomNotificationBlock
  | OtherCharacterSetPropertyBlock
  | OtherCharacterMessageBroadcasterBlock
  | GrantBlock
  | GrantCustomBlock
  | SetBillboardTextBlock
  | SetTextColorBlock
  | SetImageBlock
  | SetFrameColorBlock
  | MessageCorrectAnswerBlock
  | MessageIncorrectAnswerBlock
  | SetHeaderBlock
  | SetContentBlock
  | SetGuiTextBlock
  | KnockoutManagerOtherCharacterSetPropertyBlock
  | KnockoutManagerOtherCharacterMessageBroadcasterBlock
  | DamageCustomBlock;
export type Block =
  | LogicBooleanBlock
  | ControlsIfBlock
  | LogicCompareBlock
  | LogicOperationBlock
  | MathNumberBlock
  | MathArithmeticBlock
  | MathSingleBlock
  | MathTrigBlock
  | MathNumberPropertyBlock
  | MathChangeBlock
  | MathRoundBlock
  | MathRandomIntBlock
  | TextBlock
  | TextJoinBlock
  | TextLengthBlock
  | TextIndexOfBlock
  | TextCharAtBlock
  | TextGetSubstringBlock
  | VariablesGetBlock
  | VariablesSetBlock
  | MessageBroadcasterBlock
  | SetPropertyBlock
  | GetPropertyBlock
  | CurrentCharacterNameBlock
  | AddActivityFeedItemForEveryoneBlock
  | AddActivityFeedItemForTriggeringPlayerBlock
  | AddActivityFeedItemForGameHostBlock
  | CurrentCharacterTeamNumberBlock
  | TriggeringPlayerScoreBlock
  | GetTeamScoreBlock
  | IsALiveGameBlock
  | IsAnAssignmentBlock
  | SecondsIntoGameBlock
  | SetAssignmentObjectiveBlock
  | SetPercentageCompleteBlock
  | IncrementPercentageCompleteBlock
  | SendCustomNotificationBlock
  | OtherCharacterNameBlock
  | OtherCharacterTeamNumberBlock
  | OtherCharacterGetPropertyBlock
  | OtherCharacterSetPropertyBlock
  | OtherCharacterMessageBroadcasterBlock
  | GrantBlock
  | GrantCustomBlock
  | SetBillboardTextBlock
  | SetTextColorBlock
  | SetImageBlock
  | SetFrameColorBlock
  | QuestionAnsweringStreakBlock
  | MessageCorrectAnswerBlock
  | MessageIncorrectAnswerBlock
  | SetHeaderBlock
  | SetContentBlock
  | GetAmountBlock
  | SetGuiTextBlock
  | GetMinutesBlock
  | GetSecondsBlock
  | GetTimeLeftFormattedBlock
  | GetPlayerCountBlock
  | KnockoutManagerOtherCharacterNameBlock
  | KnockoutManagerOtherCharacterTeamNumberBlock
  | KnockoutManagerOtherCharacterGetPropertyBlock
  | KnockoutManagerOtherCharacterSetPropertyBlock
  | KnockoutManagerOtherCharacterMessageBroadcasterBlock
  | TagZoneOtherCharacterNameBlock
  | TagZoneOtherCharacterTeamNumberBlock
  | PlayerPositionDetectorPlayerXPositionBlock
  | PlayerPositionDetectorPlayerYPositionBlock
  | DamageCustomBlock
  | NumberWithCommasBlock;
export const blockDefinitions = [
  {
    type: "logic_boolean",
    message0: "%1",
    args0: [
      {
        type: "field_dropdown",
        name: "BOOL",
        options: [
          ["%{BKY_LOGIC_BOOLEAN_TRUE}", "TRUE"],
          ["%{BKY_LOGIC_BOOLEAN_FALSE}", "FALSE"],
        ],
      },
    ],
    output: "Boolean",
    style: "logic_blocks",
    tooltip: "%{BKY_LOGIC_BOOLEAN_TOOLTIP}",
    helpUrl: "%{BKY_LOGIC_BOOLEAN_HELPURL}",
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
    $codegenCustomInputsType:
      "Partial<Record<`IF${number}`, {block: BooleanValueBlock | MaybeBooleanValueBlock}> & Record<`DO${number}` | 'ELSE', {block: StatementBlock}>>",
    $codegenIntersectsWith:
      "{ extraState?: { hasElse?: true; elseIfCount?: number; } }",
    $codegenNoFunction: true,
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
          ["≠", "NEQ"],
          ["‏<", "LT"],
          ["‏≤", "LTE"],
          ["‏>", "GT"],
          ["‏≥", "GTE"],
        ],
      },
      { type: "input_value", name: "B" },
    ],
    inputsInline: true,
    output: "Boolean",
    style: "logic_blocks",
    helpUrl: "%{BKY_LOGIC_COMPARE_HELPURL}",
    extensions: ["logic_compare", "logic_op_tooltip"],
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
          ["%{BKY_LOGIC_OPERATION_OR}", "OR"],
        ],
      },
      { type: "input_value", name: "B", check: "Boolean" },
    ],
    inputsInline: true,
    output: "Boolean",
    style: "logic_blocks",
    helpUrl: "%{BKY_LOGIC_OPERATION_HELPURL}",
    extensions: ["logic_op_tooltip"],
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
          ["%{BKY_MATH_POWER_SYMBOL}", "POWER"],
        ],
      },
      { type: "input_value", name: "B", check: "Number" },
    ],
    inputsInline: true,
    output: "Number",
    style: "math_blocks",
    helpUrl: "%{BKY_MATH_ARITHMETIC_HELPURL}",
    extensions: ["math_op_tooltip"],
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
          ["10^", "POW10"],
        ],
      },
      { type: "input_value", name: "NUM", check: "Number" },
    ],
    output: "Number",
    style: "math_blocks",
    helpUrl: "%{BKY_MATH_SINGLE_HELPURL}",
    extensions: ["math_op_tooltip"],
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
          ["%{BKY_MATH_TRIG_ATAN}", "ATAN"],
        ],
      },
      { type: "input_value", name: "NUM", check: "Number" },
    ],
    output: "Number",
    style: "math_blocks",
    helpUrl: "%{BKY_MATH_TRIG_HELPURL}",
    extensions: ["math_op_tooltip"],
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
          ["%{BKY_MATH_IS_DIVISIBLE_BY}", "DIVISIBLE_BY"],
        ],
      },
    ],
    inputsInline: true,
    output: "Boolean",
    style: "math_blocks",
    tooltip: "%{BKY_MATH_IS_TOOLTIP}",
    mutator: "math_is_divisibleby_mutator",
  },
  {
    type: "math_change",
    message0: "%{BKY_MATH_CHANGE_TITLE}",
    args0: [
      {
        type: "field_variable",
        name: "VAR",
        variable: "%{BKY_MATH_CHANGE_TITLE_ITEM}",
      },
      { type: "input_value", name: "DELTA", check: "Number" },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "variable_blocks",
    helpUrl: "%{BKY_MATH_CHANGE_HELPURL}",
    extensions: ["math_change_tooltip"],
    $codegenNoFunction: true,
    $codegenForceInclude: true,
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
          ["%{BKY_MATH_ROUND_OPERATOR_ROUNDDOWN}", "ROUNDDOWN"],
        ],
      },
      { type: "input_value", name: "NUM", check: "Number" },
    ],
    output: "Number",
    style: "math_blocks",
    helpUrl: "%{BKY_MATH_ROUND_HELPURL}",
    tooltip: "%{BKY_MATH_ROUND_TOOLTIP}",
  },
  {
    type: "math_random_int",
    message0: "%{BKY_MATH_RANDOM_INT_TITLE}",
    args0: [
      { type: "input_value", name: "FROM", check: "Number" },
      { type: "input_value", name: "TO", check: "Number" },
    ],
    inputsInline: true,
    output: "Number",
    style: "math_blocks",
    tooltip: "%{BKY_MATH_RANDOM_INT_TOOLTIP}",
    helpUrl: "%{BKY_MATH_RANDOM_INT_HELPURL}",
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
  },
  {
    type: "text_join",
    message0: "",
    output: "String",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_JOIN_HELPURL}",
    tooltip: "%{BKY_TEXT_JOIN_TOOLTIP}",
    mutator: "text_join_mutator",
    $codegenCustomInputsType:
      "Partial<Record<`ADD${number}`, {block: ValueBlock}>>",
    $codegenIntersectsWith: "{ extraState?: { itemCount?: number; } }",
    $codegenNoFunction: true,
  },
  {
    type: "text_length",
    message0: "%{BKY_TEXT_LENGTH_TITLE}",
    args0: [{ type: "input_value", name: "VALUE", check: ["String"] }],
    output: "Number",
    style: "text_blocks",
    tooltip: "%{BKY_TEXT_LENGTH_TOOLTIP}",
    helpUrl: "%{BKY_TEXT_LENGTH_HELPURL}",
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
          ["%{BKY_TEXT_INDEXOF_OPERATOR_LAST}", "LAST"],
        ],
      },
      { type: "input_value", name: "FIND", check: "String" },
    ],
    output: "Number",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_INDEXOF_HELPURL}",
    inputsInline: true,
    extensions: ["text_indexOf_tooltip"],
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
          ["%{BKY_TEXT_CHARAT_RANDOM}", "RANDOM"],
        ],
      },
    ],
    output: "String",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_CHARAT_HELPURL}",
    inputsInline: true,
    mutator: "text_charAt_mutator",
    $codegenNoFunction: true,
  },
  {
    type: "text_getSubstring",
    message0: "get substring",
    args0: [
      { type: "input_value", name: "STRING", check: "String" },
      {
        type: "field_dropdown",
        name: "WHERE1",
        options: [
          ["%{BKY_TEXT_GET_SUBSTRING_START_FROM_START}", "FROM_START"],
          ["%{BKY_TEXT_GET_SUBSTRING_START_FROM_END}", "FROM_END"],
          ["%{BKY_TEXT_GET_SUBSTRING_START_FIRST}", "FIRST"],
        ],
      },
      { type: "input_value", name: "AT1", check: "Number" },
      {
        type: "field_dropdown",
        name: "WHERE2",
        options: [
          ["%{BKY_TEXT_GET_SUBSTRING_END_FROM_START}", "FROM_START"],
          ["%{BKY_TEXT_GET_SUBSTRING_END_FROM_END}", "FROM_END"],
          ["%{BKY_TEXT_GET_SUBSTRING_END_LAST}", "LAST"],
        ],
      },
      { type: "input_value", name: "AT2", check: "Number" },
    ],
    output: "String",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_GET_SUBSTRING_HELPURL}",
    inputsInline: true,
    extensions: ["text_getSubstring_tooltip"],
  },
  {
    type: "variables_get",
    message0: "%1",
    args0: [
      {
        type: "field_variable",
        name: "VAR",
        variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
      },
    ],
    output: null,
    style: "variable_blocks",
    helpUrl: "%{BKY_VARIABLES_GET_HELPURL}",
    tooltip: "%{BKY_VARIABLES_GET_TOOLTIP}",
    extensions: ["contextMenu_variableSetterGetter"],
    $codegenNoFunction: true,
    $codegenForceInclude: true,
  },
  {
    type: "variables_set",
    message0: "%{BKY_VARIABLES_SET}",
    args0: [
      {
        type: "field_variable",
        name: "VAR",
        variable: "%{BKY_VARIABLES_DEFAULT_NAME}",
      },
      { type: "input_value", name: "VALUE" },
    ],
    previousStatement: null,
    nextStatement: null,
    style: "variable_blocks",
    tooltip: "%{BKY_VARIABLES_SET_TOOLTIP}",
    helpUrl: "%{BKY_VARIABLES_SET_HELPURL}",
    extensions: ["contextMenu_variableSetterGetter"],
    $codegenNoFunction: true,
    $codegenForceInclude: true,
  },
  {
    type: "message_broadcaster",
    message0: "Broadcast Message On Channel %1 ",
    args0: [
      {
        type: "input_value",
        name: "broadcast_message_on_channel",
        check: "String",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "set_property",
    message0: "Set Property %1 Value %2 ",
    args0: [
      {
        type: "input_value",
        name: "set_property",
        check: "String",
        align: "RIGHT",
      },
      {
        type: "input_value",
        name: "value",
        check: ["String", "Number", "Boolean"],
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "get_property",
    message0: "Get Property %1 ",
    args0: [
      {
        type: "input_value",
        name: "get_property",
        check: "String",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["String", "Number", "Boolean"],
  },
  {
    type: "current_character_name",
    message0: "Triggering Player's Name",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "String",
  },
  {
    type: "add_activity_feed_item_for_everyone",
    message0: "Add Activity Feed Item For Everyone %1 ",
    args0: [
      {
        type: "input_value",
        name: "add_activity_feed_item_for_everyone",
        check: "String",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "add_activity_feed_item_for_triggering_player",
    message0: "Add Activity Feed Item For Triggering Player %1 ",
    args0: [
      {
        type: "input_value",
        name: "add_activity_feed_item_for_triggering_player",
        check: "String",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "add_activity_feed_item_for_game_host",
    message0: "Add Activity Feed Item For Game Host %1 ",
    args0: [
      {
        type: "input_value",
        name: "add_activity_feed_item_for_game_host",
        check: "String",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "current_character_team_number",
    message0: "Triggering Player's Team Number",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Number",
  },
  {
    type: "triggering_player_score",
    message0: "Triggering Player's Score",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Number",
  },
  {
    type: "get_team_score",
    message0: "Get Score Of Team %1 ",
    args0: [
      {
        type: "input_value",
        name: "get_score_of_team",
        check: "Number",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Number",
  },
  {
    type: "is_a_live_game",
    message0: "Is A Live Game",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Boolean",
  },
  {
    type: "is_an_assignment",
    message0: "Is An Assignment",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Boolean",
  },
  {
    type: "seconds_into_game",
    message0: "Seconds Into Game",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Number",
  },
  {
    type: "set_assignment_objective",
    message0: "Set Objective To %1 ",
    args0: [
      {
        type: "input_value",
        name: "set_objective_to",
        check: "String",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "set_percentage_complete",
    message0: "Set Percentage Complete To %1 ",
    args0: [
      {
        type: "input_value",
        name: "set_percentage_complete_to",
        check: "Number",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "increment_percentage_complete",
    message0: "Increment Percentage Complete By %1 ",
    args0: [
      {
        type: "input_value",
        name: "increment_percentage_complete_by",
        check: "Number",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "send_custom_notification",
    message0: "Send Notification %1 Title %2 Content %3 ",
    args0: [
      { type: "input_dummy" },
      { type: "input_value", name: "title", check: "String", align: "RIGHT" },
      { type: "input_value", name: "content", check: "String", align: "RIGHT" },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "other_character_name",
    message0: "Other Player's Name",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "String",
  },
  {
    type: "other_character_team_number",
    message0: "Other Player's Team Number",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Number",
  },
  {
    type: "other_character_get_property",
    message0: "Get Property As Other Player %1 ",
    args0: [
      {
        type: "input_value",
        name: "get_property_as_other_player",
        check: "String",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["String", "Number", "Boolean"],
  },
  {
    type: "other_character_set_property",
    message0: "Set Property (As Other Player) %1 Value %2 ",
    args0: [
      {
        type: "input_value",
        name: "set_property_as_other_player",
        check: "String",
        align: "RIGHT",
      },
      {
        type: "input_value",
        name: "value",
        check: ["String", "Number", "Boolean"],
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "other_character_message_broadcaster",
    message0: "Broadcast Message (As Other Player) On Channel %1 ",
    args0: [
      {
        type: "input_value",
        name: "broadcast_message_as_other_player_on_channel",
        check: "String",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "grant",
    message0: "Grant Player Selected Item",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "grant_custom",
    message0: "Grant Player Selected Item (Custom Amount) %1 Amount %2 ",
    args0: [
      { type: "input_dummy" },
      { type: "input_value", name: "amount", check: "Number", align: "RIGHT" },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "set_billboard_text",
    message0: "Set Text %1 ",
    args0: [
      {
        type: "input_value",
        name: "set_text",
        check: "String",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "set_text_color",
    message0: "Set Text Color To %1 ",
    args0: [
      { type: "field_colour", name: "set_text_color_to", colour: "#ff0000" },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "set_image",
    message0: "Set Image URL %1 ",
    args0: [
      {
        type: "input_value",
        name: "set_image_url",
        check: "String",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "set_frame_color",
    message0: "Set Frame Color To %1 ",
    args0: [
      { type: "field_colour", name: "set_frame_color_to", colour: "#ff0000" },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "question_answering_streak",
    message0: "Questions Answered Correctly In A Row",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Number",
  },
  {
    type: "message_correct_answer",
    message0: "Set Message Shown When Player Answers Correctly %1 ",
    args0: [
      {
        type: "input_value",
        name: "set_message_shown_when_player_answers_correctly",
        check: "String",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "message_incorrect_answer",
    message0: "Set Message Shown When Player Answers Incorrectly %1 ",
    args0: [
      {
        type: "input_value",
        name: "set_message_shown_when_player_answers_incorrectly",
        check: "String",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "set_header",
    message0: "Set Header %1 ",
    args0: [
      {
        type: "input_value",
        name: "set_header",
        check: "String",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "set_content",
    message0: "Set Content %1 ",
    args0: [
      {
        type: "input_value",
        name: "set_content",
        check: "String",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "get_amount",
    message0: "Get Amount Of Current Item %1 ",
    args0: [{ type: "input_dummy" }],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["Number"],
  },
  {
    type: "set_gui_text",
    message0: "Set Text %1 ",
    args0: [
      {
        type: "input_value",
        name: "set_text",
        check: "String",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "get_minutes",
    message0: "Get Minutes %1 ",
    args0: [{ type: "input_dummy" }],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["Number"],
  },
  {
    type: "get_seconds",
    message0: "Get Seconds %1 ",
    args0: [{ type: "input_dummy" }],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["Number"],
  },
  {
    type: "get_time_left_formatted",
    message0: "Get Time Left Formatted %1 ",
    args0: [{ type: "input_dummy" }],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["String"],
  },
  {
    type: "get_player_count",
    message0: "Number Of Players On Team %1 ",
    args0: [{ type: "input_dummy" }],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["Number"],
  },
  {
    type: "knockout_manager_other_character_name",
    message0: "Knocked Player's Name",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "String",
  },
  {
    type: "knockout_manager_other_character_team_number",
    message0: "Knocked Player's Team Number",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Number",
  },
  {
    type: "knockout_manager_other_character_get_property",
    message0: "Get Property As Knocked Out Player %1 ",
    args0: [
      {
        type: "input_value",
        name: "get_property_as_knocked_out_player",
        check: "String",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["String", "Number", "Boolean"],
  },
  {
    type: "knockout_manager_other_character_set_property",
    message0: "Set Property (As Knocked Out Player) %1 Value %2 ",
    args0: [
      {
        type: "input_value",
        name: "set_property_as_knocked_out_player",
        check: "String",
        align: "RIGHT",
      },
      {
        type: "input_value",
        name: "value",
        check: ["String", "Number", "Boolean"],
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "knockout_manager_other_character_message_broadcaster",
    message0: "Broadcast Message (As Knocked Out Player) On Channel %1 ",
    args0: [
      {
        type: "input_value",
        name: "broadcast_message_as_knocked_out_player_on_channel",
        check: "String",
        align: "RIGHT",
      },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "tag_zone_other_character_name",
    message0: "Other Player's Name",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "String",
  },
  {
    type: "tag_zone_other_character_team_number",
    message0: "Other Player's Team Number",
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: "Number",
  },
  {
    type: "player_position_detector_player_x_position",
    message0: "Player's X Position %1 ",
    args0: [{ type: "input_dummy" }],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["Number"],
  },
  {
    type: "player_position_detector_player_y_position",
    message0: "Player's Y Position %1 ",
    args0: [{ type: "input_dummy" }],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    output: ["Number"],
  },
  {
    type: "damage_custom",
    message0: "Damage Player (Custom Amount) %1 Amount %2 ",
    args0: [
      { type: "input_dummy" },
      { type: "input_value", name: "amount", check: "Number", align: "RIGHT" },
    ],
    colour: 230,
    tooltip: "",
    helpUrl: "",
    previousStatement: null,
    nextStatement: null,
  },
  {
    type: "number_with_commas",
    message0: "Convert Number To Text (With Commas) %1 ",
    args0: [
      {
        type: "input_value",
        name: "convert_number_to_text_with_commas",
        check: "Number",
        align: "RIGHT",
      },
    ],
    colour: 159.7,
    tooltip: "",
    helpUrl: "",
    output: "String",
  },
] as const;
export const functionNameMap: Record<string, string> = {
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
  textJoin: "text_join",
  lengthOf: "text_length",
  inText: "text_indexOf",
  textCharAt: "text_charAt",
  getSubstring: "text_getSubstring",
  variablesGet: "variables_get",
  setTo: "variables_set",
  broadcastMessageOnChannel: "message_broadcaster",
  setPropertyValue: "set_property",
  getProperty: "get_property",
  triggeringPlayersName: "current_character_name",
  addActivityFeedItemForEveryone: "add_activity_feed_item_for_everyone",
  addActivityFeedItemForTriggeringPlayer:
    "add_activity_feed_item_for_triggering_player",
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
  getPropertyAsKnockedOutPlayer:
    "knockout_manager_other_character_get_property",
  setPropertyAsKnockedOutPlayerValue:
    "knockout_manager_other_character_set_property",
  broadcastMessageAsKnockedOutPlayerOnChannel:
    "knockout_manager_other_character_message_broadcaster",
  tagZoneOtherCharacterName: "tag_zone_other_character_name",
  tagZoneOtherCharacterTeamNumber: "tag_zone_other_character_team_number",
  playersXPosition: "player_position_detector_player_x_position",
  playersYPosition: "player_position_detector_player_y_position",
  damagePlayerCustomAmountAmount: "damage_custom",
  convertNumberToTextWithCommas: "number_with_commas",
};
