import * as Basic from "./basic";
export type VariablesSetBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "variables_set";
  next?: { block: StatementBlock };
  fields: { VAR?: { id: Basic.Id } };
  inputs: { VALUE?: { block: ExpressionBlock | ExpressionUnknownBlock } };
};
export type MathNumberBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "math_number";
  fields: { NUM?: number };
};
export type TextBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "text";
  fields: { TEXT?: string };
};
export type LogicBooleanBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "logic_boolean";
  fields: { BOOL?: "TRUE" | "FALSE" };
};
export type ControlsIfBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "controls_if";
  next?: { block: StatementBlock };
  inputs: Partial<
    Record<
      `IF${number}`,
      { block: ExpressionBooleanBlock | ExpressionUnknownBlock }
    > &
      Record<`DO${number}` | "ELSE", { block: StatementBlock }>
  >;
} & { extraState?: { hasElse?: true; elseIfCount?: number } };
export type LogicCompareBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "logic_compare";
  fields: { OP?: "EQ" | "NEQ" | "LT" | "LTE" | "GT" | "GTE" };
  inputs: {
    A?: { block: ExpressionBlock | ExpressionUnknownBlock };
    B?: { block: ExpressionBlock | ExpressionUnknownBlock };
  };
};
export type MathArithmeticBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "math_arithmetic";
  fields: { OP?: "ADD" | "MINUS" | "MULTIPLY" | "DIVIDE" | "POWER" };
  inputs: {
    A?: { block: ExpressionNumberBlock | ExpressionUnknownBlock };
    B?: { block: ExpressionNumberBlock | ExpressionUnknownBlock };
  };
};
export type LogicOperationBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "logic_operation";
  fields: { OP?: "AND" | "OR" };
  inputs: {
    A?: { block: ExpressionBooleanBlock | ExpressionUnknownBlock };
    B?: { block: ExpressionBooleanBlock | ExpressionUnknownBlock };
  };
};
export type VariablesGetBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "variables_get";
  fields: { VAR?: { id: Basic.Id } };
};
export type MathSingleBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "math_single";
  fields: { OP?: "ROOT" | "ABS" | "NEG" | "LN" | "LOG10" | "EXP" | "POW10" };
  inputs: { NUM?: { block: ExpressionNumberBlock | ExpressionUnknownBlock } };
};
export type MathTrigBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "math_trig";
  fields: { OP?: "SIN" | "COS" | "TAN" | "ASIN" | "ACOS" | "ATAN" };
  inputs: { NUM?: { block: ExpressionNumberBlock | ExpressionUnknownBlock } };
};
export type MathNumberPropertyBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
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
    NUMBER_TO_CHECK?: { block: ExpressionNumberBlock | ExpressionUnknownBlock };
  };
};
export type MathRoundBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "math_round";
  fields: { OP?: "ROUND" | "ROUNDUP" | "ROUNDDOWN" };
  inputs: { NUM?: { block: ExpressionNumberBlock | ExpressionUnknownBlock } };
};
export type MathRandomIntBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "math_random_int";
  inputs: {
    FROM?: { block: ExpressionNumberBlock | ExpressionUnknownBlock };
    TO?: { block: ExpressionNumberBlock | ExpressionUnknownBlock };
  };
};
export type TextJoinBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "text_join";
  inputs: Partial<Record<`ADD${number}`, { block: ExpressionBlock }>>;
} & { extraState?: { itemCount?: number } };
export type TextLengthBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "text_length";
  inputs: { VALUE?: { block: ExpressionStringBlock | ExpressionUnknownBlock } };
};
export type NumberWithCommasBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "number_with_commas";
  inputs: {
    convert_number_to_text_with_commas?: {
      block: ExpressionNumberBlock | ExpressionUnknownBlock;
    };
  };
};
export type TextGetsubstringBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "text_getSubstring";
  fields: {
    WHERE1?: "FIRST" | "FROM_START" | "FROM_END";
    WHERE2?: "LAST" | "FROM_START" | "FROM_END";
  };
  inputs: {
    STRING?: { block: ExpressionStringBlock | ExpressionUnknownBlock };
    AT1?: { block: ExpressionNumberBlock | ExpressionUnknownBlock };
    AT2?: { block: ExpressionNumberBlock | ExpressionUnknownBlock };
  };
};
export type TextCharatBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "text_charAt";
  fields: { WHERE?: "FIRST" | "LAST" | "FROM_START" | "FROM_END" | "RANDOM" };
  inputs: {
    VALUE?: { block: ExpressionStringBlock | ExpressionUnknownBlock };
    AT?: { block: ExpressionNumberBlock | ExpressionUnknownBlock };
  };
};
export type TextIndexofBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "text_indexOf";
  fields: { END?: "FIRST" | "LAST" };
  inputs: {
    VALUE?: { block: ExpressionStringBlock | ExpressionUnknownBlock };
    FIND?: { block: ExpressionStringBlock | ExpressionUnknownBlock };
  };
};
export type MessageBroadcasterBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "message_broadcaster";
  next?: { block: StatementBlock };
  inputs: {
    broadcast_message_on_channel?: {
      block: ExpressionStringBlock | ExpressionUnknownBlock;
    };
  };
};
export type SetPropertyBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "set_property";
  next?: { block: StatementBlock };
  inputs: {
    set_property?: { block: ExpressionStringBlock | ExpressionUnknownBlock };
    value?: { block: ExpressionBlock | ExpressionUnknownBlock };
  };
};
export type GetPropertyBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "get_property";
  inputs: {
    get_property?: { block: ExpressionStringBlock | ExpressionUnknownBlock };
  };
};
export type AddActivityFeedItemForEveryoneBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "add_activity_feed_item_for_everyone";
  next?: { block: StatementBlock };
  inputs: {
    add_activity_feed_item_for_everyone?: {
      block: ExpressionStringBlock | ExpressionUnknownBlock;
    };
  };
};
export type AddActivityFeedItemForTriggeringPlayerBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "add_activity_feed_item_for_triggering_player";
  next?: { block: StatementBlock };
  inputs: {
    add_activity_feed_item_for_triggering_player?: {
      block: ExpressionStringBlock | ExpressionUnknownBlock;
    };
  };
};
export type AddActivityFeedItemForGameHostBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "add_activity_feed_item_for_game_host";
  next?: { block: StatementBlock };
  inputs: {
    add_activity_feed_item_for_game_host?: {
      block: ExpressionStringBlock | ExpressionUnknownBlock;
    };
  };
};
export type CurrentCharacterNameBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "current_character_name";
};
export type CurrentCharacterTeamNumberBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "current_character_team_number";
};
export type TriggeringPlayerScoreBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "triggering_player_score";
};
export type GetTeamScoreBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "get_team_score";
  inputs: {
    get_score_of_team?: {
      block: ExpressionNumberBlock | ExpressionUnknownBlock;
    };
  };
};
export type IsALiveGameBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "is_a_live_game";
};
export type IsAnAssignmentBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "is_an_assignment";
};
export type SecondsIntoGameBlock = {
  x?: number;
  y?: number;
  id: Basic.Id;
  type: "seconds_into_game";
};

export type Block =
  | VariablesSetBlock
  | MathNumberBlock
  | TextBlock
  | LogicBooleanBlock
  | ControlsIfBlock
  | LogicCompareBlock
  | MathArithmeticBlock
  | LogicOperationBlock
  | VariablesGetBlock
  | MathSingleBlock
  | MathTrigBlock
  | MathNumberPropertyBlock
  | MathRoundBlock
  | MathRandomIntBlock
  | TextJoinBlock
  | TextLengthBlock
  | NumberWithCommasBlock
  | TextGetsubstringBlock
  | TextCharatBlock
  | TextIndexofBlock
  | MessageBroadcasterBlock
  | SetPropertyBlock
  | GetPropertyBlock
  | AddActivityFeedItemForEveryoneBlock
  | AddActivityFeedItemForTriggeringPlayerBlock
  | AddActivityFeedItemForGameHostBlock
  | CurrentCharacterNameBlock
  | CurrentCharacterTeamNumberBlock
  | TriggeringPlayerScoreBlock
  | GetTeamScoreBlock
  | IsALiveGameBlock
  | IsAnAssignmentBlock
  | SecondsIntoGameBlock;

export type ExpressionNumberBlock =
  | MathNumberBlock
  | MathArithmeticBlock
  | MathSingleBlock
  | MathTrigBlock
  | MathRoundBlock
  | MathRandomIntBlock
  | TextLengthBlock
  | TextIndexofBlock
  | CurrentCharacterTeamNumberBlock
  | TriggeringPlayerScoreBlock
  | GetTeamScoreBlock
  | SecondsIntoGameBlock;
export type ExpressionStringBlock =
  | TextBlock
  | TextJoinBlock
  | NumberWithCommasBlock
  | TextGetsubstringBlock
  | TextCharatBlock
  | CurrentCharacterNameBlock;
export type ExpressionBooleanBlock =
  | LogicBooleanBlock
  | LogicCompareBlock
  | LogicOperationBlock
  | MathNumberPropertyBlock
  | IsALiveGameBlock
  | IsAnAssignmentBlock;
export type ExpressionUnknownBlock = VariablesGetBlock | GetPropertyBlock;
export type StatementBlock =
  | VariablesSetBlock
  | ControlsIfBlock
  | MessageBroadcasterBlock
  | SetPropertyBlock
  | AddActivityFeedItemForEveryoneBlock
  | AddActivityFeedItemForTriggeringPlayerBlock
  | AddActivityFeedItemForGameHostBlock;
export type ExpressionBlock =
  | ExpressionNumberBlock
  | ExpressionStringBlock
  | ExpressionBooleanBlock
  | ExpressionUnknownBlock;

export const blockDefinitions = {
  variables_set: {
    inputs: { VALUE: "expressionAny" },
    fields: { VAR: "id" },
    attach: "statement",
  },
  math_number: { fields: { NUM: "number" }, attach: "expressionNumber" },
  text: { fields: { TEXT: "string" }, attach: "expressionString" },
  logic_boolean: {
    fields: { BOOL: ["TRUE", "FALSE"] },
    attach: "expressionBoolean",
  },
  controls_if: {
    customInputsType:
      "Partial<Record<`IF${number}`, {block: ExpressionBooleanBlock | ExpressionUnknownBlock}> & Record<`DO${number}` | 'ELSE', {block: StatementBlock}>>",
    intersectWith: "{ extraState?: { hasElse?: true; elseIfCount?: number; } }",
    attach: "statement",
  },
  logic_compare: {
    fields: { OP: ["EQ", "NEQ", "LT", "LTE", "GT", "GTE"] },
    inputs: { A: "expressionAny", B: "expressionAny" },
    attach: "expressionBoolean",
  },
  math_arithmetic: {
    fields: { OP: ["ADD", "MINUS", "MULTIPLY", "DIVIDE", "POWER"] },
    inputs: { A: "expressionNumber", B: "expressionNumber" },
    attach: "expressionNumber",
  },
  logic_operation: {
    fields: { OP: ["AND", "OR"] },
    inputs: { A: "expressionBoolean", B: "expressionBoolean" },
    attach: "expressionBoolean",
  },
  variables_get: { fields: { VAR: "id" }, attach: "expressionUnknown" },
  math_single: {
    fields: { OP: ["ROOT", "ABS", "NEG", "LN", "LOG10", "EXP", "POW10"] },
    inputs: { NUM: "expressionNumber" },
    function: "mathSingle",
    attach: "expressionNumber",
  },
  math_trig: {
    fields: { OP: ["SIN", "COS", "TAN", "ASIN", "ACOS", "ATAN"] },
    inputs: { NUM: "expressionNumber" },
    function: "mathTrig",
    attach: "expressionNumber",
  },
  math_number_property: {
    fields: {
      PROPERTY: [
        "EVEN",
        "ODD",
        "PRIME",
        "WHOLE",
        "POSITIVE",
        "NEGATIVE",
        "DIVISIBLE_BY",
      ],
    },
    inputs: { NUMBER_TO_CHECK: "expressionNumber" },
    function: "mathNumberProperty",
    attach: "expressionBoolean",
  },
  math_round: {
    fields: { OP: ["ROUND", "ROUNDUP", "ROUNDDOWN"] },
    inputs: { NUM: "expressionNumber" },
    function: "mathRound",
    attach: "expressionNumber",
  },
  math_random_int: {
    inputs: { FROM: "expressionNumber", TO: "expressionNumber" },
    function: "randomInteger",
    attach: "expressionNumber",
  },
  text_join: {
    customInputsType:
      "Partial<Record<`ADD${number}`, {block: ExpressionBlock}>>",
    intersectWith: "{ extraState?: { itemCount?: number; } }",
    attach: "expressionString",
  },
  text_length: {
    inputs: { VALUE: "expressionString" },
    attach: "expressionNumber",
  },
  number_with_commas: {
    inputs: { convert_number_to_text_with_commas: "expressionNumber" },
    function: "convertNumberToTextWithCommas",
    attach: "expressionString",
  },
  text_getSubstring: {
    inputs: {
      STRING: "expressionString",
      AT1: "expressionNumber",
      AT2: "expressionNumber",
    },
    fields: {
      WHERE1: ["FIRST", "FROM_START", "FROM_END"],
      WHERE2: ["LAST", "FROM_START", "FROM_END"],
    },
    function: "getSubstring",
    attach: "expressionString",
  },
  text_charAt: {
    inputs: { VALUE: "expressionString", AT: "expressionNumber" },
    fields: { WHERE: ["FIRST", "LAST", "FROM_START", "FROM_END", "RANDOM"] },
    function: "getLetter",
    attach: "expressionString",
  },
  text_indexOf: {
    inputs: { VALUE: "expressionString", FIND: "expressionString" },
    fields: { END: ["FIRST", "LAST"] },
    function: "findOccurrenceOfText",
    attach: "expressionNumber",
  },
  message_broadcaster: {
    inputs: { broadcast_message_on_channel: "expressionString" },
    function: "broadcastMessageOnChannel",
    attach: "statement",
  },
  set_property: {
    inputs: { set_property: "expressionString", value: "expressionAny" },
    function: "setProperty",
    attach: "statement",
  },
  get_property: {
    inputs: { get_property: "expressionString" },
    function: "getProperty",
    attach: "expressionUnknown",
  },
  add_activity_feed_item_for_everyone: {
    inputs: { add_activity_feed_item_for_everyone: "expressionString" },
    function: "addActivityFeedItemForEveryone",
    attach: "statement",
  },
  add_activity_feed_item_for_triggering_player: {
    inputs: {
      add_activity_feed_item_for_triggering_player: "expressionString",
    },
    function: "addActivityFeedItemForTriggeringPlayer",
    attach: "statement",
  },
  add_activity_feed_item_for_game_host: {
    inputs: { add_activity_feed_item_for_game_host: "expressionString" },
    function: "addActivityFeedItemForGameHost",
    attach: "statement",
  },
  current_character_name: {
    function: "triggeringPlayersName",
    attach: "expressionString",
  },
  current_character_team_number: {
    function: "triggeringPlayersTeamNumber",
    attach: "expressionNumber",
  },
  triggering_player_score: {
    function: "triggeringPlayersScore",
    attach: "expressionNumber",
  },
  get_team_score: {
    inputs: { get_score_of_team: "expressionNumber" },
    function: "getScoreOfTeam",
    attach: "expressionNumber",
  },
  is_a_live_game: { function: "isALiveGame", attach: "expressionBoolean" },
  is_an_assignment: { function: "isAnAssignment", attach: "expressionBoolean" },
  seconds_into_game: {
    function: "secondsIntoGame",
    attach: "expressionNumber",
  },
} as const;

export function isExpressionNumber(
  block: Block
): block is ExpressionNumberBlock {
  return "expressionNumber" === blockDefinitions[block.type].attach;
}

export function isExpressionString(
  block: Block
): block is ExpressionStringBlock {
  return "expressionString" === blockDefinitions[block.type].attach;
}

export function isExpressionBoolean(
  block: Block
): block is ExpressionBooleanBlock {
  return "expressionBoolean" === blockDefinitions[block.type].attach;
}

export function isExpressionUnknown(
  block: Block
): block is ExpressionUnknownBlock {
  return "expressionUnknown" === blockDefinitions[block.type].attach;
}

export function isStatement(block: Block): block is StatementBlock {
  return "statement" === blockDefinitions[block.type].attach;
}

export function isExpressionNumberOrUnknown(
  block: Block
): block is ExpressionNumberBlock | ExpressionUnknownBlock {
  return (
    "expressionNumber" === blockDefinitions[block.type].attach ||
    "expressionUnknown" === blockDefinitions[block.type].attach
  );
}

export function isExpressionStringOrUnknown(
  block: Block
): block is ExpressionStringBlock | ExpressionUnknownBlock {
  return (
    "expressionString" === blockDefinitions[block.type].attach ||
    "expressionUnknown" === blockDefinitions[block.type].attach
  );
}

export function isExpressionBooleanOrUnknown(
  block: Block
): block is ExpressionBooleanBlock | ExpressionUnknownBlock {
  return (
    "expressionBoolean" === blockDefinitions[block.type].attach ||
    "expressionUnknown" === blockDefinitions[block.type].attach
  );
}

export function isExpression(block: Block): block is ExpressionBlock {
  return [
    "expressionNumber",
    "expressionString",
    "expressionBoolean",
    "expressionUnknown",
  ].includes(blockDefinitions[block.type].attach);
}
