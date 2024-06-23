import { Expression, Program as Program$1, Options as Options$1 } from 'acorn';

type Value = "number" | "string" | "boolean" | "any";
type Id = string;

type VariablesSetBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "variables_set";
    next?: {
        block: StatementBlock;
    };
    fields: {
        VAR?: {
            id: Id;
        };
    };
    inputs: {
        VALUE?: {
            block: ExpressionBlock | ExpressionUnknownBlock;
        };
    };
};
type MathNumberBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "math_number";
    fields: {
        NUM?: number;
    };
};
type TextBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "text";
    fields: {
        TEXT?: string;
    };
};
type LogicBooleanBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "logic_boolean";
    fields: {
        BOOL?: "TRUE" | "FALSE";
    };
};
type ControlsIfBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "controls_if";
    next?: {
        block: StatementBlock;
    };
    inputs: Partial<Record<`IF${number}`, {
        block: ExpressionBooleanBlock | ExpressionUnknownBlock;
    }> & Record<`DO${number}` | "ELSE", {
        block: StatementBlock;
    }>>;
} & {
    extraState?: {
        hasElse?: true;
        elseIfCount?: number;
    };
};
type LogicCompareBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "logic_compare";
    fields: {
        OP?: "EQ" | "NEQ" | "LT" | "LTE" | "GT" | "GTE";
    };
    inputs: {
        A?: {
            block: ExpressionBlock | ExpressionUnknownBlock;
        };
        B?: {
            block: ExpressionBlock | ExpressionUnknownBlock;
        };
    };
};
type MathArithmeticBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "math_arithmetic";
    fields: {
        OP?: "ADD" | "MINUS" | "MULTIPLY" | "DIVIDE" | "POWER";
    };
    inputs: {
        A?: {
            block: ExpressionNumberBlock | ExpressionUnknownBlock;
        };
        B?: {
            block: ExpressionNumberBlock | ExpressionUnknownBlock;
        };
    };
};
type LogicOperationBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "logic_operation";
    fields: {
        OP?: "AND" | "OR";
    };
    inputs: {
        A?: {
            block: ExpressionBooleanBlock | ExpressionUnknownBlock;
        };
        B?: {
            block: ExpressionBooleanBlock | ExpressionUnknownBlock;
        };
    };
};
type VariablesGetBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "variables_get";
    fields: {
        VAR?: {
            id: Id;
        };
    };
};
type MathSingleBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "math_single";
    fields: {
        OP?: "ROOT" | "ABS" | "NEG" | "LN" | "LOG10" | "EXP" | "POW10";
    };
    inputs: {
        NUM?: {
            block: ExpressionNumberBlock | ExpressionUnknownBlock;
        };
    };
};
type MathTrigBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "math_trig";
    fields: {
        OP?: "SIN" | "COS" | "TAN" | "ASIN" | "ACOS" | "ATAN";
    };
    inputs: {
        NUM?: {
            block: ExpressionNumberBlock | ExpressionUnknownBlock;
        };
    };
};
type MathNumberPropertyBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "math_number_property";
    fields: {
        PROPERTY?: "EVEN" | "ODD" | "PRIME" | "WHOLE" | "POSITIVE" | "NEGATIVE" | "DIVISIBLE_BY";
    };
    inputs: {
        NUMBER_TO_CHECK?: {
            block: ExpressionNumberBlock | ExpressionUnknownBlock;
        };
    };
};
type MathRoundBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "math_round";
    fields: {
        OP?: "ROUND" | "ROUNDUP" | "ROUNDDOWN";
    };
    inputs: {
        NUM?: {
            block: ExpressionNumberBlock | ExpressionUnknownBlock;
        };
    };
};
type MathRandomIntBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "math_random_int";
    inputs: {
        FROM?: {
            block: ExpressionNumberBlock | ExpressionUnknownBlock;
        };
        TO?: {
            block: ExpressionNumberBlock | ExpressionUnknownBlock;
        };
    };
};
type TextJoinBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "text_join";
    inputs: Partial<Record<`ADD${number}`, {
        block: ExpressionBlock;
    }>>;
} & {
    extraState?: {
        itemCount?: number;
    };
};
type TextLengthBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "text_length";
    inputs: {
        VALUE?: {
            block: ExpressionStringBlock | ExpressionUnknownBlock;
        };
    };
};
type NumberWithCommasBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "number_with_commas";
    inputs: {
        convert_number_to_text_with_commas?: {
            block: ExpressionNumberBlock | ExpressionUnknownBlock;
        };
    };
};
type TextGetsubstringBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "text_getSubstring";
    fields: {
        WHERE1?: "FIRST" | "FROM_START" | "FROM_END";
        WHERE2?: "LAST" | "FROM_START" | "FROM_END";
    };
    inputs: {
        STRING?: {
            block: ExpressionStringBlock | ExpressionUnknownBlock;
        };
        AT1?: {
            block: ExpressionNumberBlock | ExpressionUnknownBlock;
        };
        AT2?: {
            block: ExpressionNumberBlock | ExpressionUnknownBlock;
        };
    };
};
type TextCharatBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "text_charAt";
    fields: {
        WHERE?: "FIRST" | "LAST" | "FROM_START" | "FROM_END" | "RANDOM";
    };
    inputs: {
        VALUE?: {
            block: ExpressionStringBlock | ExpressionUnknownBlock;
        };
        AT?: {
            block: ExpressionNumberBlock | ExpressionUnknownBlock;
        };
    };
};
type TextIndexofBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "text_indexOf";
    fields: {
        END?: "FIRST" | "LAST";
    };
    inputs: {
        VALUE?: {
            block: ExpressionStringBlock | ExpressionUnknownBlock;
        };
        FIND?: {
            block: ExpressionStringBlock | ExpressionUnknownBlock;
        };
    };
};
type MessageBroadcasterBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "message_broadcaster";
    next?: {
        block: StatementBlock;
    };
    inputs: {
        broadcast_message_on_channel?: {
            block: ExpressionStringBlock | ExpressionUnknownBlock;
        };
    };
};
type SetPropertyBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "set_property";
    next?: {
        block: StatementBlock;
    };
    inputs: {
        set_property?: {
            block: ExpressionStringBlock | ExpressionUnknownBlock;
        };
        value?: {
            block: ExpressionBlock | ExpressionUnknownBlock;
        };
    };
};
type GetPropertyBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "get_property";
    inputs: {
        get_property?: {
            block: ExpressionStringBlock | ExpressionUnknownBlock;
        };
    };
};
type AddActivityFeedItemForEveryoneBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "add_activity_feed_item_for_everyone";
    next?: {
        block: StatementBlock;
    };
    inputs: {
        add_activity_feed_item_for_everyone?: {
            block: ExpressionStringBlock | ExpressionUnknownBlock;
        };
    };
};
type AddActivityFeedItemForTriggeringPlayerBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "add_activity_feed_item_for_triggering_player";
    next?: {
        block: StatementBlock;
    };
    inputs: {
        add_activity_feed_item_for_triggering_player?: {
            block: ExpressionStringBlock | ExpressionUnknownBlock;
        };
    };
};
type AddActivityFeedItemForGameHostBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "add_activity_feed_item_for_game_host";
    next?: {
        block: StatementBlock;
    };
    inputs: {
        add_activity_feed_item_for_game_host?: {
            block: ExpressionStringBlock | ExpressionUnknownBlock;
        };
    };
};
type CurrentCharacterNameBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "current_character_name";
};
type CurrentCharacterTeamNumberBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "current_character_team_number";
};
type TriggeringPlayerScoreBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "triggering_player_score";
};
type GetTeamScoreBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "get_team_score";
    inputs: {
        get_score_of_team?: {
            block: ExpressionNumberBlock | ExpressionUnknownBlock;
        };
    };
};
type IsALiveGameBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "is_a_live_game";
};
type IsAnAssignmentBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "is_an_assignment";
};
type SecondsIntoGameBlock = {
    x?: number;
    y?: number;
    id: Id;
    type: "seconds_into_game";
};
type Block = VariablesSetBlock | MathNumberBlock | TextBlock | LogicBooleanBlock | ControlsIfBlock | LogicCompareBlock | MathArithmeticBlock | LogicOperationBlock | VariablesGetBlock | MathSingleBlock | MathTrigBlock | MathNumberPropertyBlock | MathRoundBlock | MathRandomIntBlock | TextJoinBlock | TextLengthBlock | NumberWithCommasBlock | TextGetsubstringBlock | TextCharatBlock | TextIndexofBlock | MessageBroadcasterBlock | SetPropertyBlock | GetPropertyBlock | AddActivityFeedItemForEveryoneBlock | AddActivityFeedItemForTriggeringPlayerBlock | AddActivityFeedItemForGameHostBlock | CurrentCharacterNameBlock | CurrentCharacterTeamNumberBlock | TriggeringPlayerScoreBlock | GetTeamScoreBlock | IsALiveGameBlock | IsAnAssignmentBlock | SecondsIntoGameBlock;
type ExpressionNumberBlock = MathNumberBlock | MathArithmeticBlock | MathSingleBlock | MathTrigBlock | MathRoundBlock | MathRandomIntBlock | TextLengthBlock | TextIndexofBlock | CurrentCharacterTeamNumberBlock | TriggeringPlayerScoreBlock | GetTeamScoreBlock | SecondsIntoGameBlock;
type ExpressionStringBlock = TextBlock | TextJoinBlock | NumberWithCommasBlock | TextGetsubstringBlock | TextCharatBlock | CurrentCharacterNameBlock;
type ExpressionBooleanBlock = LogicBooleanBlock | LogicCompareBlock | LogicOperationBlock | MathNumberPropertyBlock | IsALiveGameBlock | IsAnAssignmentBlock;
type ExpressionUnknownBlock = VariablesGetBlock | GetPropertyBlock;
type StatementBlock = VariablesSetBlock | ControlsIfBlock | MessageBroadcasterBlock | SetPropertyBlock | AddActivityFeedItemForEveryoneBlock | AddActivityFeedItemForTriggeringPlayerBlock | AddActivityFeedItemForGameHostBlock;
type ExpressionBlock = ExpressionNumberBlock | ExpressionStringBlock | ExpressionBooleanBlock | ExpressionUnknownBlock;
declare const blockDefinitions: {
    readonly variables_set: {
        readonly inputs: {
            readonly VALUE: "expressionAny";
        };
        readonly fields: {
            readonly VAR: "id";
        };
        readonly attach: "statement";
    };
    readonly math_number: {
        readonly fields: {
            readonly NUM: "number";
        };
        readonly attach: "expressionNumber";
    };
    readonly text: {
        readonly fields: {
            readonly TEXT: "string";
        };
        readonly attach: "expressionString";
    };
    readonly logic_boolean: {
        readonly fields: {
            readonly BOOL: readonly ["TRUE", "FALSE"];
        };
        readonly attach: "expressionBoolean";
    };
    readonly controls_if: {
        readonly customInputsType: "Partial<Record<`IF${number}`, {block: ExpressionBooleanBlock | ExpressionUnknownBlock}> & Record<`DO${number}` | 'ELSE', {block: StatementBlock}>>";
        readonly intersectWith: "{ extraState?: { hasElse?: true; elseIfCount?: number; } }";
        readonly attach: "statement";
    };
    readonly logic_compare: {
        readonly fields: {
            readonly OP: readonly ["EQ", "NEQ", "LT", "LTE", "GT", "GTE"];
        };
        readonly inputs: {
            readonly A: "expressionAny";
            readonly B: "expressionAny";
        };
        readonly attach: "expressionBoolean";
    };
    readonly math_arithmetic: {
        readonly fields: {
            readonly OP: readonly ["ADD", "MINUS", "MULTIPLY", "DIVIDE", "POWER"];
        };
        readonly inputs: {
            readonly A: "expressionNumber";
            readonly B: "expressionNumber";
        };
        readonly attach: "expressionNumber";
    };
    readonly logic_operation: {
        readonly fields: {
            readonly OP: readonly ["AND", "OR"];
        };
        readonly inputs: {
            readonly A: "expressionBoolean";
            readonly B: "expressionBoolean";
        };
        readonly attach: "expressionBoolean";
    };
    readonly variables_get: {
        readonly fields: {
            readonly VAR: "id";
        };
        readonly attach: "expressionUnknown";
    };
    readonly math_single: {
        readonly fields: {
            readonly OP: readonly ["ROOT", "ABS", "NEG", "LN", "LOG10", "EXP", "POW10"];
        };
        readonly inputs: {
            readonly NUM: "expressionNumber";
        };
        readonly function: "mathSingle";
        readonly attach: "expressionNumber";
    };
    readonly math_trig: {
        readonly fields: {
            readonly OP: readonly ["SIN", "COS", "TAN", "ASIN", "ACOS", "ATAN"];
        };
        readonly inputs: {
            readonly NUM: "expressionNumber";
        };
        readonly function: "mathTrig";
        readonly attach: "expressionNumber";
    };
    readonly math_number_property: {
        readonly fields: {
            readonly PROPERTY: readonly ["EVEN", "ODD", "PRIME", "WHOLE", "POSITIVE", "NEGATIVE", "DIVISIBLE_BY"];
        };
        readonly inputs: {
            readonly NUMBER_TO_CHECK: "expressionNumber";
        };
        readonly function: "mathNumberProperty";
        readonly attach: "expressionBoolean";
    };
    readonly math_round: {
        readonly fields: {
            readonly OP: readonly ["ROUND", "ROUNDUP", "ROUNDDOWN"];
        };
        readonly inputs: {
            readonly NUM: "expressionNumber";
        };
        readonly function: "mathRound";
        readonly attach: "expressionNumber";
    };
    readonly math_random_int: {
        readonly inputs: {
            readonly FROM: "expressionNumber";
            readonly TO: "expressionNumber";
        };
        readonly function: "randomInteger";
        readonly attach: "expressionNumber";
    };
    readonly text_join: {
        readonly customInputsType: "Partial<Record<`ADD${number}`, {block: ExpressionBlock}>>";
        readonly intersectWith: "{ extraState?: { itemCount?: number; } }";
        readonly attach: "expressionString";
    };
    readonly text_length: {
        readonly inputs: {
            readonly VALUE: "expressionString";
        };
        readonly attach: "expressionNumber";
    };
    readonly number_with_commas: {
        readonly inputs: {
            readonly convert_number_to_text_with_commas: "expressionNumber";
        };
        readonly function: "convertNumberToTextWithCommas";
        readonly attach: "expressionString";
    };
    readonly text_getSubstring: {
        readonly inputs: {
            readonly STRING: "expressionString";
            readonly AT1: "expressionNumber";
            readonly AT2: "expressionNumber";
        };
        readonly fields: {
            readonly WHERE1: readonly ["FIRST", "FROM_START", "FROM_END"];
            readonly WHERE2: readonly ["LAST", "FROM_START", "FROM_END"];
        };
        readonly function: "getSubstring";
        readonly attach: "expressionString";
    };
    readonly text_charAt: {
        readonly inputs: {
            readonly VALUE: "expressionString";
            readonly AT: "expressionNumber";
        };
        readonly fields: {
            readonly WHERE: readonly ["FIRST", "LAST", "FROM_START", "FROM_END", "RANDOM"];
        };
        readonly function: "getLetter";
        readonly attach: "expressionString";
    };
    readonly text_indexOf: {
        readonly inputs: {
            readonly VALUE: "expressionString";
            readonly FIND: "expressionString";
        };
        readonly fields: {
            readonly END: readonly ["FIRST", "LAST"];
        };
        readonly function: "findOccurrenceOfText";
        readonly attach: "expressionNumber";
    };
    readonly message_broadcaster: {
        readonly inputs: {
            readonly broadcast_message_on_channel: "expressionString";
        };
        readonly function: "broadcastMessageOnChannel";
        readonly attach: "statement";
    };
    readonly set_property: {
        readonly inputs: {
            readonly set_property: "expressionString";
            readonly value: "expressionAny";
        };
        readonly function: "setProperty";
        readonly attach: "statement";
    };
    readonly get_property: {
        readonly inputs: {
            readonly get_property: "expressionString";
        };
        readonly function: "getProperty";
        readonly attach: "expressionUnknown";
    };
    readonly add_activity_feed_item_for_everyone: {
        readonly inputs: {
            readonly add_activity_feed_item_for_everyone: "expressionString";
        };
        readonly function: "addActivityFeedItemForEveryone";
        readonly attach: "statement";
    };
    readonly add_activity_feed_item_for_triggering_player: {
        readonly inputs: {
            readonly add_activity_feed_item_for_triggering_player: "expressionString";
        };
        readonly function: "addActivityFeedItemForTriggeringPlayer";
        readonly attach: "statement";
    };
    readonly add_activity_feed_item_for_game_host: {
        readonly inputs: {
            readonly add_activity_feed_item_for_game_host: "expressionString";
        };
        readonly function: "addActivityFeedItemForGameHost";
        readonly attach: "statement";
    };
    readonly current_character_name: {
        readonly function: "triggeringPlayersName";
        readonly attach: "expressionString";
    };
    readonly current_character_team_number: {
        readonly function: "triggeringPlayersTeamNumber";
        readonly attach: "expressionNumber";
    };
    readonly triggering_player_score: {
        readonly function: "triggeringPlayersScore";
        readonly attach: "expressionNumber";
    };
    readonly get_team_score: {
        readonly inputs: {
            readonly get_score_of_team: "expressionNumber";
        };
        readonly function: "getScoreOfTeam";
        readonly attach: "expressionNumber";
    };
    readonly is_a_live_game: {
        readonly function: "isALiveGame";
        readonly attach: "expressionBoolean";
    };
    readonly is_an_assignment: {
        readonly function: "isAnAssignment";
        readonly attach: "expressionBoolean";
    };
    readonly seconds_into_game: {
        readonly function: "secondsIntoGame";
        readonly attach: "expressionNumber";
    };
};
declare function isExpressionNumber(block: Block): block is ExpressionNumberBlock;
declare function isExpressionString(block: Block): block is ExpressionStringBlock;
declare function isExpressionBoolean(block: Block): block is ExpressionBooleanBlock;
declare function isExpressionUnknown(block: Block): block is ExpressionUnknownBlock;
declare function isStatement(block: Block): block is StatementBlock;
declare function isExpressionNumberOrUnknown(block: Block): block is ExpressionNumberBlock | ExpressionUnknownBlock;
declare function isExpressionStringOrUnknown(block: Block): block is ExpressionStringBlock | ExpressionUnknownBlock;
declare function isExpressionBooleanOrUnknown(block: Block): block is ExpressionBooleanBlock | ExpressionUnknownBlock;
declare function isExpression(block: Block): block is ExpressionBlock;

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

declare function functionExpressionToBlocks(functionExpression: Expression): Program;
declare function programToBlocks(program: Program$1): Program;

type Options = Partial<FullOptions>;
type FullOptions = {
    jsStringType: "program" | "functionExpression";
    acornOptions: Options$1;
};
declare const defaultOptions: FullOptions;
declare function jsToBlocks(jsString: string, options?: Options): Program;

export { AddActivityFeedItemForEveryoneBlock, AddActivityFeedItemForGameHostBlock, AddActivityFeedItemForTriggeringPlayerBlock, Block, ControlsIfBlock, CurrentCharacterNameBlock, CurrentCharacterTeamNumberBlock, ExpressionBlock, ExpressionBooleanBlock, ExpressionNumberBlock, ExpressionStringBlock, ExpressionUnknownBlock, FullOptions, GetPropertyBlock, GetTeamScoreBlock, Id, IsALiveGameBlock, IsAnAssignmentBlock, LogicBooleanBlock, LogicCompareBlock, LogicOperationBlock, MathArithmeticBlock, MathNumberBlock, MathNumberPropertyBlock, MathRandomIntBlock, MathRoundBlock, MathSingleBlock, MathTrigBlock, MessageBroadcasterBlock, NumberWithCommasBlock, Options, Program, SecondsIntoGameBlock, SetPropertyBlock, StatementBlock, TextBlock, TextCharatBlock, TextGetsubstringBlock, TextIndexofBlock, TextJoinBlock, TextLengthBlock, TriggeringPlayerScoreBlock, Value, Variable, VariablesGetBlock, VariablesSetBlock, functionExpressionToBlocks as acornFunctionExpressionToBlocks, programToBlocks as acornProgramToBlocks, blockDefinitions, defaultOptions, isExpression, isExpressionBoolean, isExpressionBooleanOrUnknown, isExpressionNumber, isExpressionNumberOrUnknown, isExpressionString, isExpressionStringOrUnknown, isExpressionUnknown, isStatement, jsToBlocks };
