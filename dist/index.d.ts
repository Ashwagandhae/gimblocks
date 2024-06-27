import { Expression, Program as Program$1, Node, Options as Options$1 } from 'acorn';

type Id = string;
type Color = `#${string};`;
type BlockBase = {
    x?: number;
    y?: number;
    id: Id;
};

type LogicBooleanBlock = BlockBase & {
    type: "logic_boolean";
    fields: {
        BOOL?: "TRUE" | "FALSE";
    };
};
type ControlsIfBlock = BlockBase & {
    extraState?: {
        hasElse?: true;
        elseIfCount?: number;
    };
} & {
    type: "controls_if";
    inputs: Partial<Record<`IF${number}`, {
        block: BooleanValueBlock | MaybeBooleanValueBlock;
    }> & Record<`DO${number}` | "ELSE", {
        block: StatementBlock;
    }>>;
    next?: {
        block: StatementBlock;
    };
};
type LogicCompareBlock = BlockBase & {
    type: "logic_compare";
    fields: {
        OP?: "EQ" | "NEQ" | "LT" | "LTE" | "GT" | "GTE";
    };
    inputs: {
        A?: {
            block: ValueBlock;
        };
        B?: {
            block: ValueBlock;
        };
    };
};
type LogicOperationBlock = BlockBase & {
    type: "logic_operation";
    fields: {
        OP?: "AND" | "OR";
    };
    inputs: {
        A?: {
            block: BooleanValueBlock | MaybeBooleanValueBlock;
        };
        B?: {
            block: BooleanValueBlock | MaybeBooleanValueBlock;
        };
    };
};
type MathNumberBlock = BlockBase & {
    type: "math_number";
    fields: {
        NUM?: number;
    };
};
type MathArithmeticBlock = BlockBase & {
    type: "math_arithmetic";
    fields: {
        OP?: "ADD" | "MINUS" | "MULTIPLY" | "DIVIDE" | "POWER";
    };
    inputs: {
        A?: {
            block: NumberValueBlock | MaybeNumberValueBlock;
        };
        B?: {
            block: NumberValueBlock | MaybeNumberValueBlock;
        };
    };
};
type MathSingleBlock = BlockBase & {
    type: "math_single";
    fields: {
        OP?: "ROOT" | "ABS" | "NEG" | "LN" | "LOG10" | "EXP" | "POW10";
    };
    inputs: {
        NUM?: {
            block: NumberValueBlock | MaybeNumberValueBlock;
        };
    };
};
type MathTrigBlock = BlockBase & {
    type: "math_trig";
    fields: {
        OP?: "SIN" | "COS" | "TAN" | "ASIN" | "ACOS" | "ATAN";
    };
    inputs: {
        NUM?: {
            block: NumberValueBlock | MaybeNumberValueBlock;
        };
    };
};
type MathNumberPropertyBlock = BlockBase & {
    type: "math_number_property";
    fields: {
        PROPERTY?: "EVEN" | "ODD" | "PRIME" | "WHOLE" | "POSITIVE" | "NEGATIVE" | "DIVISIBLE_BY";
    };
    inputs: {
        NUMBER_TO_CHECK?: {
            block: NumberValueBlock | MaybeNumberValueBlock;
        };
    };
};
type MathChangeBlock = BlockBase & {
    type: "math_change";
    fields: {
        VAR?: {
            id: Id;
        };
    };
    inputs: {
        DELTA?: {
            block: NumberValueBlock | MaybeNumberValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type MathRoundBlock = BlockBase & {
    type: "math_round";
    fields: {
        OP?: "ROUND" | "ROUNDUP" | "ROUNDDOWN";
    };
    inputs: {
        NUM?: {
            block: NumberValueBlock | MaybeNumberValueBlock;
        };
    };
};
type MathRandomIntBlock = BlockBase & {
    type: "math_random_int";
    inputs: {
        FROM?: {
            block: NumberValueBlock | MaybeNumberValueBlock;
        };
        TO?: {
            block: NumberValueBlock | MaybeNumberValueBlock;
        };
    };
};
type TextBlock = BlockBase & {
    type: "text";
    fields: {
        TEXT?: string;
    };
};
type TextJoinBlock = BlockBase & {
    extraState?: {
        itemCount?: number;
    };
} & {
    type: "text_join";
    inputs: Partial<Record<`ADD${number}`, {
        block: ValueBlock;
    }>>;
};
type TextLengthBlock = BlockBase & {
    type: "text_length";
    inputs: {
        VALUE?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
};
type TextIndexOfBlock = BlockBase & {
    type: "text_indexOf";
    fields: {
        END?: "FIRST" | "LAST";
    };
    inputs: {
        VALUE?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
        FIND?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
};
type TextCharAtBlock = BlockBase & {
    type: "text_charAt";
    fields: {
        WHERE?: "FROM_START" | "FROM_END" | "FIRST" | "LAST" | "RANDOM";
    };
    inputs: {
        VALUE?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
};
type TextGetSubstringBlock = BlockBase & {
    type: "text_getSubstring";
    fields: {
        WHERE1?: "FROM_START" | "FROM_END" | "FIRST";
        WHERE2?: "FROM_START" | "FROM_END" | "LAST";
    };
    inputs: {
        STRING?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
        AT1?: {
            block: NumberValueBlock | MaybeNumberValueBlock;
        };
        AT2?: {
            block: NumberValueBlock | MaybeNumberValueBlock;
        };
    };
};
type VariablesGetBlock = BlockBase & {
    type: "variables_get";
    fields: {
        VAR?: {
            id: Id;
        };
    };
};
type VariablesSetBlock = BlockBase & {
    type: "variables_set";
    fields: {
        VAR?: {
            id: Id;
        };
    };
    inputs: {
        VALUE?: {
            block: ValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type MessageBroadcasterBlock = BlockBase & {
    type: "message_broadcaster";
    inputs: {
        broadcast_message_on_channel?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type SetPropertyBlock = BlockBase & {
    type: "set_property";
    inputs: {
        set_property?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
        value?: {
            block: (StringValueBlock | MaybeStringValueBlock) | (NumberValueBlock | MaybeNumberValueBlock) | (BooleanValueBlock | MaybeBooleanValueBlock);
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type GetPropertyBlock = BlockBase & {
    type: "get_property";
    inputs: {
        get_property?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
};
type CurrentCharacterNameBlock = BlockBase & {
    type: "current_character_name";
};
type AddActivityFeedItemForEveryoneBlock = BlockBase & {
    type: "add_activity_feed_item_for_everyone";
    inputs: {
        add_activity_feed_item_for_everyone?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type AddActivityFeedItemForTriggeringPlayerBlock = BlockBase & {
    type: "add_activity_feed_item_for_triggering_player";
    inputs: {
        add_activity_feed_item_for_triggering_player?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type AddActivityFeedItemForGameHostBlock = BlockBase & {
    type: "add_activity_feed_item_for_game_host";
    inputs: {
        add_activity_feed_item_for_game_host?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type CurrentCharacterTeamNumberBlock = BlockBase & {
    type: "current_character_team_number";
};
type TriggeringPlayerScoreBlock = BlockBase & {
    type: "triggering_player_score";
};
type GetTeamScoreBlock = BlockBase & {
    type: "get_team_score";
    inputs: {
        get_score_of_team?: {
            block: NumberValueBlock | MaybeNumberValueBlock;
        };
    };
};
type IsALiveGameBlock = BlockBase & {
    type: "is_a_live_game";
};
type IsAnAssignmentBlock = BlockBase & {
    type: "is_an_assignment";
};
type SecondsIntoGameBlock = BlockBase & {
    type: "seconds_into_game";
};
type SetAssignmentObjectiveBlock = BlockBase & {
    type: "set_assignment_objective";
    inputs: {
        set_objective_to?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type SetPercentageCompleteBlock = BlockBase & {
    type: "set_percentage_complete";
    inputs: {
        set_percentage_complete_to?: {
            block: NumberValueBlock | MaybeNumberValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type IncrementPercentageCompleteBlock = BlockBase & {
    type: "increment_percentage_complete";
    inputs: {
        increment_percentage_complete_by?: {
            block: NumberValueBlock | MaybeNumberValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type SendCustomNotificationBlock = BlockBase & {
    type: "send_custom_notification";
    inputs: {
        title?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
        content?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type OtherCharacterNameBlock = BlockBase & {
    type: "other_character_name";
};
type OtherCharacterTeamNumberBlock = BlockBase & {
    type: "other_character_team_number";
};
type OtherCharacterGetPropertyBlock = BlockBase & {
    type: "other_character_get_property";
    inputs: {
        get_property_as_other_player?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
};
type OtherCharacterSetPropertyBlock = BlockBase & {
    type: "other_character_set_property";
    inputs: {
        set_property_as_other_player?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
        value?: {
            block: (StringValueBlock | MaybeStringValueBlock) | (NumberValueBlock | MaybeNumberValueBlock) | (BooleanValueBlock | MaybeBooleanValueBlock);
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type OtherCharacterMessageBroadcasterBlock = BlockBase & {
    type: "other_character_message_broadcaster";
    inputs: {
        broadcast_message_as_other_player_on_channel?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type GrantBlock = BlockBase & {
    type: "grant";
    next?: {
        block: StatementBlock;
    };
};
type GrantCustomBlock = BlockBase & {
    type: "grant_custom";
    inputs: {
        amount?: {
            block: NumberValueBlock | MaybeNumberValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type SetBillboardTextBlock = BlockBase & {
    type: "set_billboard_text";
    inputs: {
        set_text?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type SetTextColorBlock = BlockBase & {
    type: "set_text_color";
    fields: {
        set_text_color_to?: Color;
    };
    next?: {
        block: StatementBlock;
    };
};
type SetImageBlock = BlockBase & {
    type: "set_image";
    inputs: {
        set_image_url?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type SetFrameColorBlock = BlockBase & {
    type: "set_frame_color";
    fields: {
        set_frame_color_to?: Color;
    };
    next?: {
        block: StatementBlock;
    };
};
type QuestionAnsweringStreakBlock = BlockBase & {
    type: "question_answering_streak";
};
type MessageCorrectAnswerBlock = BlockBase & {
    type: "message_correct_answer";
    inputs: {
        set_message_shown_when_player_answers_correctly?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type MessageIncorrectAnswerBlock = BlockBase & {
    type: "message_incorrect_answer";
    inputs: {
        set_message_shown_when_player_answers_incorrectly?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type SetHeaderBlock = BlockBase & {
    type: "set_header";
    inputs: {
        set_header?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type SetContentBlock = BlockBase & {
    type: "set_content";
    inputs: {
        set_content?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type GetAmountBlock = BlockBase & {
    type: "get_amount";
};
type SetGuiTextBlock = BlockBase & {
    type: "set_gui_text";
    inputs: {
        set_text?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type GetMinutesBlock = BlockBase & {
    type: "get_minutes";
};
type GetSecondsBlock = BlockBase & {
    type: "get_seconds";
};
type GetTimeLeftFormattedBlock = BlockBase & {
    type: "get_time_left_formatted";
};
type GetPlayerCountBlock = BlockBase & {
    type: "get_player_count";
};
type KnockoutManagerOtherCharacterNameBlock = BlockBase & {
    type: "knockout_manager_other_character_name";
};
type KnockoutManagerOtherCharacterTeamNumberBlock = BlockBase & {
    type: "knockout_manager_other_character_team_number";
};
type KnockoutManagerOtherCharacterGetPropertyBlock = BlockBase & {
    type: "knockout_manager_other_character_get_property";
    inputs: {
        get_property_as_knocked_out_player?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
};
type KnockoutManagerOtherCharacterSetPropertyBlock = BlockBase & {
    type: "knockout_manager_other_character_set_property";
    inputs: {
        set_property_as_knocked_out_player?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
        value?: {
            block: (StringValueBlock | MaybeStringValueBlock) | (NumberValueBlock | MaybeNumberValueBlock) | (BooleanValueBlock | MaybeBooleanValueBlock);
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type KnockoutManagerOtherCharacterMessageBroadcasterBlock = BlockBase & {
    type: "knockout_manager_other_character_message_broadcaster";
    inputs: {
        broadcast_message_as_knocked_out_player_on_channel?: {
            block: StringValueBlock | MaybeStringValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type TagZoneOtherCharacterNameBlock = BlockBase & {
    type: "tag_zone_other_character_name";
};
type TagZoneOtherCharacterTeamNumberBlock = BlockBase & {
    type: "tag_zone_other_character_team_number";
};
type PlayerPositionDetectorPlayerXPositionBlock = BlockBase & {
    type: "player_position_detector_player_x_position";
};
type PlayerPositionDetectorPlayerYPositionBlock = BlockBase & {
    type: "player_position_detector_player_y_position";
};
type DamageCustomBlock = BlockBase & {
    type: "damage_custom";
    inputs: {
        amount?: {
            block: NumberValueBlock | MaybeNumberValueBlock;
        };
    };
    next?: {
        block: StatementBlock;
    };
};
type NumberWithCommasBlock = BlockBase & {
    type: "number_with_commas";
    inputs: {
        convert_number_to_text_with_commas?: {
            block: NumberValueBlock | MaybeNumberValueBlock;
        };
    };
};
type NumberValueBlock = MathNumberBlock | MathArithmeticBlock | MathSingleBlock | MathTrigBlock | MathRoundBlock | MathRandomIntBlock | TextLengthBlock | TextIndexOfBlock | CurrentCharacterTeamNumberBlock | TriggeringPlayerScoreBlock | GetTeamScoreBlock | SecondsIntoGameBlock | OtherCharacterTeamNumberBlock | QuestionAnsweringStreakBlock | KnockoutManagerOtherCharacterTeamNumberBlock | TagZoneOtherCharacterTeamNumberBlock;
type StringValueBlock = TextBlock | TextJoinBlock | TextCharAtBlock | TextGetSubstringBlock | CurrentCharacterNameBlock | OtherCharacterNameBlock | KnockoutManagerOtherCharacterNameBlock | TagZoneOtherCharacterNameBlock | NumberWithCommasBlock;
type BooleanValueBlock = LogicBooleanBlock | LogicCompareBlock | LogicOperationBlock | MathNumberPropertyBlock | IsALiveGameBlock | IsAnAssignmentBlock;
type MaybeNumberValueBlock = VariablesGetBlock | GetPropertyBlock | OtherCharacterGetPropertyBlock | GetAmountBlock | GetMinutesBlock | GetSecondsBlock | GetPlayerCountBlock | KnockoutManagerOtherCharacterGetPropertyBlock | PlayerPositionDetectorPlayerXPositionBlock | PlayerPositionDetectorPlayerYPositionBlock;
type MaybeStringValueBlock = VariablesGetBlock | GetPropertyBlock | OtherCharacterGetPropertyBlock | GetTimeLeftFormattedBlock | KnockoutManagerOtherCharacterGetPropertyBlock;
type MaybeBooleanValueBlock = VariablesGetBlock | GetPropertyBlock | OtherCharacterGetPropertyBlock | KnockoutManagerOtherCharacterGetPropertyBlock;
type ValueBlock = LogicBooleanBlock | LogicCompareBlock | LogicOperationBlock | MathNumberBlock | MathArithmeticBlock | MathSingleBlock | MathTrigBlock | MathNumberPropertyBlock | MathRoundBlock | MathRandomIntBlock | TextBlock | TextJoinBlock | TextLengthBlock | TextIndexOfBlock | TextCharAtBlock | TextGetSubstringBlock | VariablesGetBlock | GetPropertyBlock | CurrentCharacterNameBlock | CurrentCharacterTeamNumberBlock | TriggeringPlayerScoreBlock | GetTeamScoreBlock | IsALiveGameBlock | IsAnAssignmentBlock | SecondsIntoGameBlock | OtherCharacterNameBlock | OtherCharacterTeamNumberBlock | OtherCharacterGetPropertyBlock | QuestionAnsweringStreakBlock | GetAmountBlock | GetMinutesBlock | GetSecondsBlock | GetTimeLeftFormattedBlock | GetPlayerCountBlock | KnockoutManagerOtherCharacterNameBlock | KnockoutManagerOtherCharacterTeamNumberBlock | KnockoutManagerOtherCharacterGetPropertyBlock | TagZoneOtherCharacterNameBlock | TagZoneOtherCharacterTeamNumberBlock | PlayerPositionDetectorPlayerXPositionBlock | PlayerPositionDetectorPlayerYPositionBlock | NumberWithCommasBlock;
type StatementBlock = ControlsIfBlock | MathChangeBlock | VariablesSetBlock | MessageBroadcasterBlock | SetPropertyBlock | AddActivityFeedItemForEveryoneBlock | AddActivityFeedItemForTriggeringPlayerBlock | AddActivityFeedItemForGameHostBlock | SetAssignmentObjectiveBlock | SetPercentageCompleteBlock | IncrementPercentageCompleteBlock | SendCustomNotificationBlock | OtherCharacterSetPropertyBlock | OtherCharacterMessageBroadcasterBlock | GrantBlock | GrantCustomBlock | SetBillboardTextBlock | SetTextColorBlock | SetImageBlock | SetFrameColorBlock | MessageCorrectAnswerBlock | MessageIncorrectAnswerBlock | SetHeaderBlock | SetContentBlock | SetGuiTextBlock | KnockoutManagerOtherCharacterSetPropertyBlock | KnockoutManagerOtherCharacterMessageBroadcasterBlock | DamageCustomBlock;
type Block = LogicBooleanBlock | ControlsIfBlock | LogicCompareBlock | LogicOperationBlock | MathNumberBlock | MathArithmeticBlock | MathSingleBlock | MathTrigBlock | MathNumberPropertyBlock | MathChangeBlock | MathRoundBlock | MathRandomIntBlock | TextBlock | TextJoinBlock | TextLengthBlock | TextIndexOfBlock | TextCharAtBlock | TextGetSubstringBlock | VariablesGetBlock | VariablesSetBlock | MessageBroadcasterBlock | SetPropertyBlock | GetPropertyBlock | CurrentCharacterNameBlock | AddActivityFeedItemForEveryoneBlock | AddActivityFeedItemForTriggeringPlayerBlock | AddActivityFeedItemForGameHostBlock | CurrentCharacterTeamNumberBlock | TriggeringPlayerScoreBlock | GetTeamScoreBlock | IsALiveGameBlock | IsAnAssignmentBlock | SecondsIntoGameBlock | SetAssignmentObjectiveBlock | SetPercentageCompleteBlock | IncrementPercentageCompleteBlock | SendCustomNotificationBlock | OtherCharacterNameBlock | OtherCharacterTeamNumberBlock | OtherCharacterGetPropertyBlock | OtherCharacterSetPropertyBlock | OtherCharacterMessageBroadcasterBlock | GrantBlock | GrantCustomBlock | SetBillboardTextBlock | SetTextColorBlock | SetImageBlock | SetFrameColorBlock | QuestionAnsweringStreakBlock | MessageCorrectAnswerBlock | MessageIncorrectAnswerBlock | SetHeaderBlock | SetContentBlock | GetAmountBlock | SetGuiTextBlock | GetMinutesBlock | GetSecondsBlock | GetTimeLeftFormattedBlock | GetPlayerCountBlock | KnockoutManagerOtherCharacterNameBlock | KnockoutManagerOtherCharacterTeamNumberBlock | KnockoutManagerOtherCharacterGetPropertyBlock | KnockoutManagerOtherCharacterSetPropertyBlock | KnockoutManagerOtherCharacterMessageBroadcasterBlock | TagZoneOtherCharacterNameBlock | TagZoneOtherCharacterTeamNumberBlock | PlayerPositionDetectorPlayerXPositionBlock | PlayerPositionDetectorPlayerYPositionBlock | DamageCustomBlock | NumberWithCommasBlock;
declare const blockDefinitions: readonly [{
    readonly type: "logic_boolean";
    readonly message0: "%1";
    readonly args0: readonly [{
        readonly type: "field_dropdown";
        readonly name: "BOOL";
        readonly options: readonly [readonly ["%{BKY_LOGIC_BOOLEAN_TRUE}", "TRUE"], readonly ["%{BKY_LOGIC_BOOLEAN_FALSE}", "FALSE"]];
    }];
    readonly output: "Boolean";
    readonly style: "logic_blocks";
    readonly tooltip: "%{BKY_LOGIC_BOOLEAN_TOOLTIP}";
    readonly helpUrl: "%{BKY_LOGIC_BOOLEAN_HELPURL}";
}, {
    readonly type: "controls_if";
    readonly message0: "%{BKY_CONTROLS_IF_MSG_IF} %1";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "IF0";
        readonly check: "Boolean";
    }];
    readonly message1: "%{BKY_CONTROLS_IF_MSG_THEN} %1";
    readonly args1: readonly [{
        readonly type: "input_statement";
        readonly name: "DO0";
    }];
    readonly previousStatement: null;
    readonly nextStatement: null;
    readonly style: "logic_blocks";
    readonly helpUrl: "%{BKY_CONTROLS_IF_HELPURL}";
    readonly suppressPrefixSuffix: true;
    readonly mutator: "controls_if_mutator";
    readonly extensions: readonly ["controls_if_tooltip"];
    readonly $codegenCustomInputsType: "Partial<Record<`IF${number}`, {block: BooleanValueBlock | MaybeBooleanValueBlock}> & Record<`DO${number}` | 'ELSE', {block: StatementBlock}>>";
    readonly $codegenIntersectsWith: "{ extraState?: { hasElse?: true; elseIfCount?: number; } }";
    readonly $codegenNoFunction: true;
}, {
    readonly type: "logic_compare";
    readonly message0: "%1 %2 %3";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "A";
    }, {
        readonly type: "field_dropdown";
        readonly name: "OP";
        readonly options: readonly [readonly ["=", "EQ"], readonly ["≠", "NEQ"], readonly ["‏<", "LT"], readonly ["‏≤", "LTE"], readonly ["‏>", "GT"], readonly ["‏≥", "GTE"]];
    }, {
        readonly type: "input_value";
        readonly name: "B";
    }];
    readonly inputsInline: true;
    readonly output: "Boolean";
    readonly style: "logic_blocks";
    readonly helpUrl: "%{BKY_LOGIC_COMPARE_HELPURL}";
    readonly extensions: readonly ["logic_compare", "logic_op_tooltip"];
}, {
    readonly type: "logic_operation";
    readonly message0: "%1 %2 %3";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "A";
        readonly check: "Boolean";
    }, {
        readonly type: "field_dropdown";
        readonly name: "OP";
        readonly options: readonly [readonly ["%{BKY_LOGIC_OPERATION_AND}", "AND"], readonly ["%{BKY_LOGIC_OPERATION_OR}", "OR"]];
    }, {
        readonly type: "input_value";
        readonly name: "B";
        readonly check: "Boolean";
    }];
    readonly inputsInline: true;
    readonly output: "Boolean";
    readonly style: "logic_blocks";
    readonly helpUrl: "%{BKY_LOGIC_OPERATION_HELPURL}";
    readonly extensions: readonly ["logic_op_tooltip"];
}, {
    readonly type: "math_number";
    readonly message0: "%1";
    readonly args0: readonly [{
        readonly type: "field_number";
        readonly name: "NUM";
        readonly value: 0;
    }];
    readonly output: "Number";
    readonly helpUrl: "%{BKY_MATH_NUMBER_HELPURL}";
    readonly style: "math_blocks";
    readonly tooltip: "%{BKY_MATH_NUMBER_TOOLTIP}";
    readonly extensions: readonly ["parent_tooltip_when_inline"];
}, {
    readonly type: "math_arithmetic";
    readonly message0: "%1 %2 %3";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "A";
        readonly check: "Number";
    }, {
        readonly type: "field_dropdown";
        readonly name: "OP";
        readonly options: readonly [readonly ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"], readonly ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"], readonly ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"], readonly ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"], readonly ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]];
    }, {
        readonly type: "input_value";
        readonly name: "B";
        readonly check: "Number";
    }];
    readonly inputsInline: true;
    readonly output: "Number";
    readonly style: "math_blocks";
    readonly helpUrl: "%{BKY_MATH_ARITHMETIC_HELPURL}";
    readonly extensions: readonly ["math_op_tooltip"];
}, {
    readonly type: "math_single";
    readonly message0: "%1 %2";
    readonly args0: readonly [{
        readonly type: "field_dropdown";
        readonly name: "OP";
        readonly options: readonly [readonly ["%{BKY_MATH_SINGLE_OP_ROOT}", "ROOT"], readonly ["%{BKY_MATH_SINGLE_OP_ABSOLUTE}", "ABS"], readonly ["-", "NEG"], readonly ["ln", "LN"], readonly ["log10", "LOG10"], readonly ["e^", "EXP"], readonly ["10^", "POW10"]];
    }, {
        readonly type: "input_value";
        readonly name: "NUM";
        readonly check: "Number";
    }];
    readonly output: "Number";
    readonly style: "math_blocks";
    readonly helpUrl: "%{BKY_MATH_SINGLE_HELPURL}";
    readonly extensions: readonly ["math_op_tooltip"];
}, {
    readonly type: "math_trig";
    readonly message0: "%1 %2";
    readonly args0: readonly [{
        readonly type: "field_dropdown";
        readonly name: "OP";
        readonly options: readonly [readonly ["%{BKY_MATH_TRIG_SIN}", "SIN"], readonly ["%{BKY_MATH_TRIG_COS}", "COS"], readonly ["%{BKY_MATH_TRIG_TAN}", "TAN"], readonly ["%{BKY_MATH_TRIG_ASIN}", "ASIN"], readonly ["%{BKY_MATH_TRIG_ACOS}", "ACOS"], readonly ["%{BKY_MATH_TRIG_ATAN}", "ATAN"]];
    }, {
        readonly type: "input_value";
        readonly name: "NUM";
        readonly check: "Number";
    }];
    readonly output: "Number";
    readonly style: "math_blocks";
    readonly helpUrl: "%{BKY_MATH_TRIG_HELPURL}";
    readonly extensions: readonly ["math_op_tooltip"];
}, {
    readonly type: "math_number_property";
    readonly message0: "%1 %2";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "NUMBER_TO_CHECK";
        readonly check: "Number";
    }, {
        readonly type: "field_dropdown";
        readonly name: "PROPERTY";
        readonly options: readonly [readonly ["%{BKY_MATH_IS_EVEN}", "EVEN"], readonly ["%{BKY_MATH_IS_ODD}", "ODD"], readonly ["%{BKY_MATH_IS_PRIME}", "PRIME"], readonly ["%{BKY_MATH_IS_WHOLE}", "WHOLE"], readonly ["%{BKY_MATH_IS_POSITIVE}", "POSITIVE"], readonly ["%{BKY_MATH_IS_NEGATIVE}", "NEGATIVE"], readonly ["%{BKY_MATH_IS_DIVISIBLE_BY}", "DIVISIBLE_BY"]];
    }];
    readonly inputsInline: true;
    readonly output: "Boolean";
    readonly style: "math_blocks";
    readonly tooltip: "%{BKY_MATH_IS_TOOLTIP}";
    readonly mutator: "math_is_divisibleby_mutator";
}, {
    readonly type: "math_change";
    readonly message0: "%{BKY_MATH_CHANGE_TITLE}";
    readonly args0: readonly [{
        readonly type: "field_variable";
        readonly name: "VAR";
        readonly variable: "%{BKY_MATH_CHANGE_TITLE_ITEM}";
    }, {
        readonly type: "input_value";
        readonly name: "DELTA";
        readonly check: "Number";
    }];
    readonly previousStatement: null;
    readonly nextStatement: null;
    readonly style: "variable_blocks";
    readonly helpUrl: "%{BKY_MATH_CHANGE_HELPURL}";
    readonly extensions: readonly ["math_change_tooltip"];
    readonly $codegenNoFunction: true;
    readonly $codegenForceInclude: true;
}, {
    readonly type: "math_round";
    readonly message0: "%1 %2";
    readonly args0: readonly [{
        readonly type: "field_dropdown";
        readonly name: "OP";
        readonly options: readonly [readonly ["%{BKY_MATH_ROUND_OPERATOR_ROUND}", "ROUND"], readonly ["%{BKY_MATH_ROUND_OPERATOR_ROUNDUP}", "ROUNDUP"], readonly ["%{BKY_MATH_ROUND_OPERATOR_ROUNDDOWN}", "ROUNDDOWN"]];
    }, {
        readonly type: "input_value";
        readonly name: "NUM";
        readonly check: "Number";
    }];
    readonly output: "Number";
    readonly style: "math_blocks";
    readonly helpUrl: "%{BKY_MATH_ROUND_HELPURL}";
    readonly tooltip: "%{BKY_MATH_ROUND_TOOLTIP}";
}, {
    readonly type: "math_random_int";
    readonly message0: "%{BKY_MATH_RANDOM_INT_TITLE}";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "FROM";
        readonly check: "Number";
    }, {
        readonly type: "input_value";
        readonly name: "TO";
        readonly check: "Number";
    }];
    readonly inputsInline: true;
    readonly output: "Number";
    readonly style: "math_blocks";
    readonly tooltip: "%{BKY_MATH_RANDOM_INT_TOOLTIP}";
    readonly helpUrl: "%{BKY_MATH_RANDOM_INT_HELPURL}";
}, {
    readonly type: "text";
    readonly message0: "%1";
    readonly args0: readonly [{
        readonly type: "field_input";
        readonly name: "TEXT";
        readonly text: "";
    }];
    readonly output: "String";
    readonly style: "text_blocks";
    readonly helpUrl: "%{BKY_TEXT_TEXT_HELPURL}";
    readonly tooltip: "%{BKY_TEXT_TEXT_TOOLTIP}";
    readonly extensions: readonly ["text_quotes", "parent_tooltip_when_inline"];
}, {
    readonly type: "text_join";
    readonly message0: "";
    readonly output: "String";
    readonly style: "text_blocks";
    readonly helpUrl: "%{BKY_TEXT_JOIN_HELPURL}";
    readonly tooltip: "%{BKY_TEXT_JOIN_TOOLTIP}";
    readonly mutator: "text_join_mutator";
    readonly $codegenCustomInputsType: "Partial<Record<`ADD${number}`, {block: ValueBlock}>>";
    readonly $codegenIntersectsWith: "{ extraState?: { itemCount?: number; } }";
    readonly $codegenNoFunction: true;
}, {
    readonly type: "text_length";
    readonly message0: "%{BKY_TEXT_LENGTH_TITLE}";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "VALUE";
        readonly check: readonly ["String"];
    }];
    readonly output: "Number";
    readonly style: "text_blocks";
    readonly tooltip: "%{BKY_TEXT_LENGTH_TOOLTIP}";
    readonly helpUrl: "%{BKY_TEXT_LENGTH_HELPURL}";
}, {
    readonly type: "text_indexOf";
    readonly message0: "%{BKY_TEXT_INDEXOF_TITLE}";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "VALUE";
        readonly check: "String";
    }, {
        readonly type: "field_dropdown";
        readonly name: "END";
        readonly options: readonly [readonly ["%{BKY_TEXT_INDEXOF_OPERATOR_FIRST}", "FIRST"], readonly ["%{BKY_TEXT_INDEXOF_OPERATOR_LAST}", "LAST"]];
    }, {
        readonly type: "input_value";
        readonly name: "FIND";
        readonly check: "String";
    }];
    readonly output: "Number";
    readonly style: "text_blocks";
    readonly helpUrl: "%{BKY_TEXT_INDEXOF_HELPURL}";
    readonly inputsInline: true;
    readonly extensions: readonly ["text_indexOf_tooltip"];
}, {
    readonly type: "text_charAt";
    readonly message0: "%{BKY_TEXT_CHARAT_TITLE}";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "VALUE";
        readonly check: "String";
    }, {
        readonly type: "field_dropdown";
        readonly name: "WHERE";
        readonly options: readonly [readonly ["%{BKY_TEXT_CHARAT_FROM_START}", "FROM_START"], readonly ["%{BKY_TEXT_CHARAT_FROM_END}", "FROM_END"], readonly ["%{BKY_TEXT_CHARAT_FIRST}", "FIRST"], readonly ["%{BKY_TEXT_CHARAT_LAST}", "LAST"], readonly ["%{BKY_TEXT_CHARAT_RANDOM}", "RANDOM"]];
    }];
    readonly output: "String";
    readonly style: "text_blocks";
    readonly helpUrl: "%{BKY_TEXT_CHARAT_HELPURL}";
    readonly inputsInline: true;
    readonly mutator: "text_charAt_mutator";
    readonly $codegenNoFunction: true;
}, {
    readonly type: "text_getSubstring";
    readonly message0: "get substring";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "STRING";
        readonly check: "String";
    }, {
        readonly type: "field_dropdown";
        readonly name: "WHERE1";
        readonly options: readonly [readonly ["%{BKY_TEXT_GET_SUBSTRING_START_FROM_START}", "FROM_START"], readonly ["%{BKY_TEXT_GET_SUBSTRING_START_FROM_END}", "FROM_END"], readonly ["%{BKY_TEXT_GET_SUBSTRING_START_FIRST}", "FIRST"]];
    }, {
        readonly type: "input_value";
        readonly name: "AT1";
        readonly check: "Number";
    }, {
        readonly type: "field_dropdown";
        readonly name: "WHERE2";
        readonly options: readonly [readonly ["%{BKY_TEXT_GET_SUBSTRING_END_FROM_START}", "FROM_START"], readonly ["%{BKY_TEXT_GET_SUBSTRING_END_FROM_END}", "FROM_END"], readonly ["%{BKY_TEXT_GET_SUBSTRING_END_LAST}", "LAST"]];
    }, {
        readonly type: "input_value";
        readonly name: "AT2";
        readonly check: "Number";
    }];
    readonly output: "String";
    readonly style: "text_blocks";
    readonly helpUrl: "%{BKY_TEXT_GET_SUBSTRING_HELPURL}";
    readonly inputsInline: true;
    readonly extensions: readonly ["text_getSubstring_tooltip"];
}, {
    readonly type: "variables_get";
    readonly message0: "%1";
    readonly args0: readonly [{
        readonly type: "field_variable";
        readonly name: "VAR";
        readonly variable: "%{BKY_VARIABLES_DEFAULT_NAME}";
    }];
    readonly output: null;
    readonly style: "variable_blocks";
    readonly helpUrl: "%{BKY_VARIABLES_GET_HELPURL}";
    readonly tooltip: "%{BKY_VARIABLES_GET_TOOLTIP}";
    readonly extensions: readonly ["contextMenu_variableSetterGetter"];
    readonly $codegenNoFunction: true;
    readonly $codegenForceInclude: true;
}, {
    readonly type: "variables_set";
    readonly message0: "%{BKY_VARIABLES_SET}";
    readonly args0: readonly [{
        readonly type: "field_variable";
        readonly name: "VAR";
        readonly variable: "%{BKY_VARIABLES_DEFAULT_NAME}";
    }, {
        readonly type: "input_value";
        readonly name: "VALUE";
    }];
    readonly previousStatement: null;
    readonly nextStatement: null;
    readonly style: "variable_blocks";
    readonly tooltip: "%{BKY_VARIABLES_SET_TOOLTIP}";
    readonly helpUrl: "%{BKY_VARIABLES_SET_HELPURL}";
    readonly extensions: readonly ["contextMenu_variableSetterGetter"];
    readonly $codegenNoFunction: true;
    readonly $codegenForceInclude: true;
}, {
    readonly type: "message_broadcaster";
    readonly message0: "Broadcast Message On Channel %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "broadcast_message_on_channel";
        readonly check: "String";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "set_property";
    readonly message0: "Set Property %1 Value %2 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "set_property";
        readonly check: "String";
        readonly align: "RIGHT";
    }, {
        readonly type: "input_value";
        readonly name: "value";
        readonly check: readonly ["String", "Number", "Boolean"];
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "get_property";
    readonly message0: "Get Property %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "get_property";
        readonly check: "String";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: readonly ["String", "Number", "Boolean"];
}, {
    readonly type: "current_character_name";
    readonly message0: "Triggering Player's Name";
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: "String";
}, {
    readonly type: "add_activity_feed_item_for_everyone";
    readonly message0: "Add Activity Feed Item For Everyone %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "add_activity_feed_item_for_everyone";
        readonly check: "String";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "add_activity_feed_item_for_triggering_player";
    readonly message0: "Add Activity Feed Item For Triggering Player %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "add_activity_feed_item_for_triggering_player";
        readonly check: "String";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "add_activity_feed_item_for_game_host";
    readonly message0: "Add Activity Feed Item For Game Host %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "add_activity_feed_item_for_game_host";
        readonly check: "String";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "current_character_team_number";
    readonly message0: "Triggering Player's Team Number";
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: "Number";
}, {
    readonly type: "triggering_player_score";
    readonly message0: "Triggering Player's Score";
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: "Number";
}, {
    readonly type: "get_team_score";
    readonly message0: "Get Score Of Team %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "get_score_of_team";
        readonly check: "Number";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: "Number";
}, {
    readonly type: "is_a_live_game";
    readonly message0: "Is A Live Game";
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: "Boolean";
}, {
    readonly type: "is_an_assignment";
    readonly message0: "Is An Assignment";
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: "Boolean";
}, {
    readonly type: "seconds_into_game";
    readonly message0: "Seconds Into Game";
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: "Number";
}, {
    readonly type: "set_assignment_objective";
    readonly message0: "Set Objective To %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "set_objective_to";
        readonly check: "String";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "set_percentage_complete";
    readonly message0: "Set Percentage Complete To %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "set_percentage_complete_to";
        readonly check: "Number";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "increment_percentage_complete";
    readonly message0: "Increment Percentage Complete By %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "increment_percentage_complete_by";
        readonly check: "Number";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "send_custom_notification";
    readonly message0: "Send Notification %1 Title %2 Content %3 ";
    readonly args0: readonly [{
        readonly type: "input_dummy";
    }, {
        readonly type: "input_value";
        readonly name: "title";
        readonly check: "String";
        readonly align: "RIGHT";
    }, {
        readonly type: "input_value";
        readonly name: "content";
        readonly check: "String";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "other_character_name";
    readonly message0: "Other Player's Name";
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: "String";
}, {
    readonly type: "other_character_team_number";
    readonly message0: "Other Player's Team Number";
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: "Number";
}, {
    readonly type: "other_character_get_property";
    readonly message0: "Get Property As Other Player %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "get_property_as_other_player";
        readonly check: "String";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: readonly ["String", "Number", "Boolean"];
}, {
    readonly type: "other_character_set_property";
    readonly message0: "Set Property (As Other Player) %1 Value %2 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "set_property_as_other_player";
        readonly check: "String";
        readonly align: "RIGHT";
    }, {
        readonly type: "input_value";
        readonly name: "value";
        readonly check: readonly ["String", "Number", "Boolean"];
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "other_character_message_broadcaster";
    readonly message0: "Broadcast Message (As Other Player) On Channel %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "broadcast_message_as_other_player_on_channel";
        readonly check: "String";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "grant";
    readonly message0: "Grant Player Selected Item";
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "grant_custom";
    readonly message0: "Grant Player Selected Item (Custom Amount) %1 Amount %2 ";
    readonly args0: readonly [{
        readonly type: "input_dummy";
    }, {
        readonly type: "input_value";
        readonly name: "amount";
        readonly check: "Number";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "set_billboard_text";
    readonly message0: "Set Text %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "set_text";
        readonly check: "String";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "set_text_color";
    readonly message0: "Set Text Color To %1 ";
    readonly args0: readonly [{
        readonly type: "field_colour";
        readonly name: "set_text_color_to";
        readonly colour: "#ff0000";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "set_image";
    readonly message0: "Set Image URL %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "set_image_url";
        readonly check: "String";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "set_frame_color";
    readonly message0: "Set Frame Color To %1 ";
    readonly args0: readonly [{
        readonly type: "field_colour";
        readonly name: "set_frame_color_to";
        readonly colour: "#ff0000";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "question_answering_streak";
    readonly message0: "Questions Answered Correctly In A Row";
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: "Number";
}, {
    readonly type: "message_correct_answer";
    readonly message0: "Set Message Shown When Player Answers Correctly %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "set_message_shown_when_player_answers_correctly";
        readonly check: "String";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "message_incorrect_answer";
    readonly message0: "Set Message Shown When Player Answers Incorrectly %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "set_message_shown_when_player_answers_incorrectly";
        readonly check: "String";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "set_header";
    readonly message0: "Set Header %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "set_header";
        readonly check: "String";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "set_content";
    readonly message0: "Set Content %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "set_content";
        readonly check: "String";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "get_amount";
    readonly message0: "Get Amount Of Current Item %1 ";
    readonly args0: readonly [{
        readonly type: "input_dummy";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: readonly ["Number"];
}, {
    readonly type: "set_gui_text";
    readonly message0: "Set Text %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "set_text";
        readonly check: "String";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "get_minutes";
    readonly message0: "Get Minutes %1 ";
    readonly args0: readonly [{
        readonly type: "input_dummy";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: readonly ["Number"];
}, {
    readonly type: "get_seconds";
    readonly message0: "Get Seconds %1 ";
    readonly args0: readonly [{
        readonly type: "input_dummy";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: readonly ["Number"];
}, {
    readonly type: "get_time_left_formatted";
    readonly message0: "Get Time Left Formatted %1 ";
    readonly args0: readonly [{
        readonly type: "input_dummy";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: readonly ["String"];
}, {
    readonly type: "get_player_count";
    readonly message0: "Number Of Players On Team %1 ";
    readonly args0: readonly [{
        readonly type: "input_dummy";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: readonly ["Number"];
}, {
    readonly type: "knockout_manager_other_character_name";
    readonly message0: "Knocked Player's Name";
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: "String";
}, {
    readonly type: "knockout_manager_other_character_team_number";
    readonly message0: "Knocked Player's Team Number";
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: "Number";
}, {
    readonly type: "knockout_manager_other_character_get_property";
    readonly message0: "Get Property As Knocked Out Player %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "get_property_as_knocked_out_player";
        readonly check: "String";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: readonly ["String", "Number", "Boolean"];
}, {
    readonly type: "knockout_manager_other_character_set_property";
    readonly message0: "Set Property (As Knocked Out Player) %1 Value %2 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "set_property_as_knocked_out_player";
        readonly check: "String";
        readonly align: "RIGHT";
    }, {
        readonly type: "input_value";
        readonly name: "value";
        readonly check: readonly ["String", "Number", "Boolean"];
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "knockout_manager_other_character_message_broadcaster";
    readonly message0: "Broadcast Message (As Knocked Out Player) On Channel %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "broadcast_message_as_knocked_out_player_on_channel";
        readonly check: "String";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "tag_zone_other_character_name";
    readonly message0: "Other Player's Name";
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: "String";
}, {
    readonly type: "tag_zone_other_character_team_number";
    readonly message0: "Other Player's Team Number";
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: "Number";
}, {
    readonly type: "player_position_detector_player_x_position";
    readonly message0: "Player's X Position %1 ";
    readonly args0: readonly [{
        readonly type: "input_dummy";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: readonly ["Number"];
}, {
    readonly type: "player_position_detector_player_y_position";
    readonly message0: "Player's Y Position %1 ";
    readonly args0: readonly [{
        readonly type: "input_dummy";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: readonly ["Number"];
}, {
    readonly type: "damage_custom";
    readonly message0: "Damage Player (Custom Amount) %1 Amount %2 ";
    readonly args0: readonly [{
        readonly type: "input_dummy";
    }, {
        readonly type: "input_value";
        readonly name: "amount";
        readonly check: "Number";
        readonly align: "RIGHT";
    }];
    readonly colour: 230;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly previousStatement: null;
    readonly nextStatement: null;
}, {
    readonly type: "number_with_commas";
    readonly message0: "Convert Number To Text (With Commas) %1 ";
    readonly args0: readonly [{
        readonly type: "input_value";
        readonly name: "convert_number_to_text_with_commas";
        readonly check: "Number";
        readonly align: "RIGHT";
    }];
    readonly colour: 159.7;
    readonly tooltip: "";
    readonly helpUrl: "";
    readonly output: "String";
}];
declare const functionNameMap: Record<string, string>;

type BlockDefinition = {
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
};
type Style = 'logic_blocks' | 'math_blocks' | 'variable_blocks' | 'text_blocks';
type Argument = {
    type: 'input_value';
    name: string;
    check?: Check;
    align?: Align;
} | {
    type: 'input_dummy';
} | {
    type: 'input_statement';
    name: string;
} | {
    type: 'field_colour';
    name: string;
    colour: `#${string}`;
} | {
    type: 'field_dropdown';
    name: string;
    options: [string, string][];
} | {
    type: 'field_number';
    name: string;
    value: number;
} | {
    type: 'field_variable';
    name: string;
    variable: string;
} | {
    type: 'field_input';
    name: string;
    text: string;
};
type Check = CheckSingle | CheckSingle[];
type CheckSingle = 'Number' | 'String' | 'Boolean';
type Align = 'RIGHT';

type Variable = {
    name: string;
    id: Id;
};
type Program = {
    blocks: {
        languageVersion: 0;
        blocks: Block[];
    };
    variables: Variable[];
};
declare function findBlockDefinition(type: string): BlockDefinition;
declare function isValue(block: Block): block is ValueBlock;
declare function isNumberValue(block: Block): block is NumberValueBlock;
declare function isStringValue(block: Block): block is StringValueBlock;
declare function isBooleanValue(block: Block): block is BooleanValueBlock;
declare function isStatement(block: Block): block is StatementBlock;
declare function isMaybeNumberValue(block: Block): block is MaybeNumberValueBlock | NumberValueBlock;
declare function isMaybeStringValue(block: Block): block is MaybeStringValueBlock | StringValueBlock;
declare function isMaybeBooleanValue(block: Block): block is MaybeBooleanValueBlock | BooleanValueBlock;

declare function functionExpressionToBlocks(functionExpression: Expression): Program;
declare function programToBlocks(program: Program$1): Program;
declare class ConvertError extends Error {
    node: Node | null;
    constructor(message: string, node?: Node);
}
declare class AttachError extends Error {
    block: Block;
    node: Node;
    constructor(message: string, node: Node, block: Block);
}

type Options = Partial<FullOptions>;
type FullOptions = {
    jsStringType: 'program' | 'functionExpression';
    acornOptions: Options$1;
};
declare const defaultOptions: FullOptions;
declare function jsToBlocks(jsString: string, options?: Options): Program;

export { AddActivityFeedItemForEveryoneBlock, AddActivityFeedItemForGameHostBlock, AddActivityFeedItemForTriggeringPlayerBlock, AttachError, Block, BlockBase, BooleanValueBlock, Color, ControlsIfBlock, ConvertError, CurrentCharacterNameBlock, CurrentCharacterTeamNumberBlock, DamageCustomBlock, FullOptions, GetAmountBlock, GetMinutesBlock, GetPlayerCountBlock, GetPropertyBlock, GetSecondsBlock, GetTeamScoreBlock, GetTimeLeftFormattedBlock, GrantBlock, GrantCustomBlock, Id, IncrementPercentageCompleteBlock, IsALiveGameBlock, IsAnAssignmentBlock, KnockoutManagerOtherCharacterGetPropertyBlock, KnockoutManagerOtherCharacterMessageBroadcasterBlock, KnockoutManagerOtherCharacterNameBlock, KnockoutManagerOtherCharacterSetPropertyBlock, KnockoutManagerOtherCharacterTeamNumberBlock, LogicBooleanBlock, LogicCompareBlock, LogicOperationBlock, MathArithmeticBlock, MathChangeBlock, MathNumberBlock, MathNumberPropertyBlock, MathRandomIntBlock, MathRoundBlock, MathSingleBlock, MathTrigBlock, MaybeBooleanValueBlock, MaybeNumberValueBlock, MaybeStringValueBlock, MessageBroadcasterBlock, MessageCorrectAnswerBlock, MessageIncorrectAnswerBlock, NumberValueBlock, NumberWithCommasBlock, Options, OtherCharacterGetPropertyBlock, OtherCharacterMessageBroadcasterBlock, OtherCharacterNameBlock, OtherCharacterSetPropertyBlock, OtherCharacterTeamNumberBlock, PlayerPositionDetectorPlayerXPositionBlock, PlayerPositionDetectorPlayerYPositionBlock, Program, QuestionAnsweringStreakBlock, SecondsIntoGameBlock, SendCustomNotificationBlock, SetAssignmentObjectiveBlock, SetBillboardTextBlock, SetContentBlock, SetFrameColorBlock, SetGuiTextBlock, SetHeaderBlock, SetImageBlock, SetPercentageCompleteBlock, SetPropertyBlock, SetTextColorBlock, StatementBlock, StringValueBlock, TagZoneOtherCharacterNameBlock, TagZoneOtherCharacterTeamNumberBlock, TextBlock, TextCharAtBlock, TextGetSubstringBlock, TextIndexOfBlock, TextJoinBlock, TextLengthBlock, TriggeringPlayerScoreBlock, ValueBlock, Variable, VariablesGetBlock, VariablesSetBlock, functionExpressionToBlocks as acornFunctionExpressionToBlocks, programToBlocks as acornProgramToBlocks, blockDefinitions, defaultOptions, findBlockDefinition, functionNameMap, isBooleanValue, isMaybeBooleanValue, isMaybeNumberValue, isMaybeStringValue, isNumberValue, isStatement, isStringValue, isValue, jsToBlocks };
