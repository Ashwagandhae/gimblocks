/**
 * The color type. A hex string, rgb value, etc.
 *
 * @example
 * '#ff0000'
 * 'rgb(255, 0, 0)'
 */
type Color = string;

/**
 * A literal number which isn't dynamically created. Used to specify block fields, which can't be dynamic.

/**
 * The union of all possible devices.
 *
 * @remarks
 * No actual device will have all of these functions. The user
 * must ensure that the device they are using has these functions.
 */
type Union = {
    /**
     * Function generated for "logic_boolean" block.
     *
     * @param BOOL - A field of type `'TRUE' | 'FALSE'`. It must be a literal, non-dynamic value.
     */
    logicBoolean: (BOOL: "TRUE" | "FALSE") => boolean;
    /**
     * Function generated for "logic_compare" block.
     *
     * @param A - An input block of type `any`.
     * @param OP - A field of type `'EQ' | 'NEQ' | 'LT' | 'LTE' | 'GT' | 'GTE'`. It must be a literal, non-dynamic value.
     * @param B - An input block of type `any`.
     */
    logicCompare: (A: any, OP: "EQ" | "NEQ" | "LT" | "LTE" | "GT" | "GTE", B: any) => boolean;
    /**
     * Function generated for "logic_operation" block.
     *
     * @param A - An input block of type `boolean`.
     * @param OP - A field of type `'AND' | 'OR'`. It must be a literal, non-dynamic value.
     * @param B - An input block of type `boolean`.
     */
    logicOperation: (A: boolean, OP: "AND" | "OR", B: boolean) => boolean;
    /**
     * Function generated for "logic_negate" block.
     *
     * @param BOOL - An input block of type `boolean`.
     */
    not: (BOOL: boolean) => boolean;
    /**
     * Function generated for "math_number" block.
     *
     * @param NUM - A field of type `number`. It must be a literal, non-dynamic value.
     */
    mathNumber: (NUM: number) => number;
    /**
     * Function generated for "math_arithmetic" block.
     *
     * @param A - An input block of type `number`.
     * @param OP - A field of type `'ADD' | 'MINUS' | 'MULTIPLY' | 'DIVIDE' | 'POWER'`. It must be a literal, non-dynamic value.
     * @param B - An input block of type `number`.
     */
    mathArithmetic: (A: number, OP: "ADD" | "MINUS" | "MULTIPLY" | "DIVIDE" | "POWER", B: number) => number;
    /**
     * Function generated for "math_single" block.
     *
     * @param OP - A field of type `'ROOT' | 'ABS' | 'NEG' | 'LN' | 'LOG10' | 'EXP' | 'POW10'`. It must be a literal, non-dynamic value.
     * @param NUM - An input block of type `number`.
     */
    mathSingle: (OP: "ROOT" | "ABS" | "NEG" | "LN" | "LOG10" | "EXP" | "POW10", NUM: number) => number;
    /**
     * Function generated for "math_trig" block.
     *
     * @param OP - A field of type `'SIN' | 'COS' | 'TAN' | 'ASIN' | 'ACOS' | 'ATAN'`. It must be a literal, non-dynamic value.
     * @param NUM - An input block of type `number`.
     */
    mathTrig: (OP: "SIN" | "COS" | "TAN" | "ASIN" | "ACOS" | "ATAN", NUM: number) => number;
    /**
     * Function generated for "math_constant" block.
     *
     * @param CONSTANT - A field of type `'PI' | 'E' | 'GOLDEN_RATIO' | 'SQRT2' | 'SQRT1_2' | 'INFINITY'`. It must be a literal, non-dynamic value.
     */
    mathConstant: (CONSTANT: "PI" | "E" | "GOLDEN_RATIO" | "SQRT2" | "SQRT1_2" | "INFINITY") => number;
    /**
     * Function generated for "math_number_property" block.
     *
     * @param NUMBER_TO_CHECK - An input block of type `number`.
     * @param PROPERTY - A field of type `'EVEN' | 'ODD' | 'PRIME' | 'WHOLE' | 'POSITIVE' | 'NEGATIVE' | 'DIVISIBLE_BY'`. It must be a literal, non-dynamic value.
     */
    mathNumberProperty: (NUMBER_TO_CHECK: number, PROPERTY: "EVEN" | "ODD" | "PRIME" | "WHOLE" | "POSITIVE" | "NEGATIVE" | "DIVISIBLE_BY") => boolean;
    /**
     * Function generated for "math_round" block.
     *
     * @param OP - A field of type `'ROUND' | 'ROUNDUP' | 'ROUNDDOWN'`. It must be a literal, non-dynamic value.
     * @param NUM - An input block of type `number`.
     */
    mathRound: (OP: "ROUND" | "ROUNDUP" | "ROUNDDOWN", NUM: number) => number;
    /**
     * Function generated for "math_modulo" block.
     *
     * @param DIVIDEND - An input block of type `number`.
     * @param DIVISOR - An input block of type `number`.
     */
    remainderOf: (DIVIDEND: number, DIVISOR: number) => number;
    /**
     * Function generated for "math_constrain" block.
     *
     * @param VALUE - An input block of type `number`.
     * @param LOW - An input block of type `number`.
     * @param HIGH - An input block of type `number`.
     */
    constrainLowHigh: (VALUE: number, LOW: number, HIGH: number) => number;
    /**
     * Function generated for "math_random_int" block.
     *
     * @param FROM - An input block of type `number`.
     * @param TO - An input block of type `number`.
     */
    randomIntegerFromTo: (FROM: number, TO: number) => number;
    /**
     * Function generated for "math_random_float" block.
     *
     */
    randomFraction: () => number;
    /**
     * Function generated for "math_atan2" block.
     *
     * @param X - An input block of type `number`.
     * @param Y - An input block of type `number`.
     */
    atan2OfXY: (X: number, Y: number) => number;
    /**
     * Function generated for "text" block.
     *
     * @param TEXT - A field of type `string`. It must be a literal, non-dynamic value.
     */
    text: (TEXT: string) => string;
    /**
     * Function generated for "text_length" block.
     *
     * @param VALUE - An input block of type `string`.
     */
    lengthOf: (VALUE: string) => number;
    /**
     * Function generated for "text_isEmpty" block.
     *
     * @param VALUE - An input block of type `string`.
     */
    IsEmpty: (VALUE: string) => boolean;
    /**
     * Function generated for "text_indexOf" block.
     *
     * @param VALUE - An input block of type `string`.
     * @param END - A field of type `'FIRST' | 'LAST'`. It must be a literal, non-dynamic value.
     * @param FIND - An input block of type `string`.
     */
    inText: (VALUE: string, END: "FIRST" | "LAST", FIND: string) => number;
    /**
     * Function generated for "message_broadcaster" block.
     *
     * @param broadcast_message_on_channel - An input block of type `string`.
     */
    broadcastMessageOnChannel: (broadcast_message_on_channel: string) => void;
    /**
     * Function generated for "set_property" block.
     *
     * @param set_property - An input block of type `string`.
     * @param value - An input block of type `string | number | boolean`.
     */
    setPropertyValue: (set_property: string, value: string | number | boolean) => void;
    /**
     * Function generated for "get_property" block.
     *
     * @param get_property - An input block of type `string`.
     */
    getProperty: (get_property: string) => string | number | boolean;
    /**
     * Function generated for "current_character_name" block.
     *
     */
    triggeringPlayersName: () => string;
    /**
     * Function generated for "add_activity_feed_item_for_everyone" block.
     *
     * @param add_activity_feed_item_for_everyone - An input block of type `string`.
     */
    addActivityFeedItemForEveryone: (add_activity_feed_item_for_everyone: string) => void;
    /**
     * Function generated for "add_activity_feed_item_for_triggering_player" block.
     *
     * @param add_activity_feed_item_for_triggering_player - An input block of type `string`.
     */
    addActivityFeedItemForTriggeringPlayer: (add_activity_feed_item_for_triggering_player: string) => void;
    /**
     * Function generated for "add_activity_feed_item_for_game_host" block.
     *
     * @param add_activity_feed_item_for_game_host - An input block of type `string`.
     */
    addActivityFeedItemForGameHost: (add_activity_feed_item_for_game_host: string) => void;
    /**
     * Function generated for "current_character_team_number" block.
     *
     */
    triggeringPlayersTeamNumber: () => number;
    /**
     * Function generated for "triggering_player_score" block.
     *
     */
    triggeringPlayersScore: () => number;
    /**
     * Function generated for "get_team_score" block.
     *
     * @param get_score_of_team - An input block of type `number`.
     */
    getScoreOfTeam: (get_score_of_team: number) => number;
    /**
     * Function generated for "is_a_live_game" block.
     *
     */
    isALiveGame: () => boolean;
    /**
     * Function generated for "is_an_assignment" block.
     *
     */
    isAnAssignment: () => boolean;
    /**
     * Function generated for "seconds_into_game" block.
     *
     */
    secondsIntoGame: () => number;
    /**
     * Function generated for "set_assignment_objective" block.
     *
     * @param set_objective_to - An input block of type `string`.
     */
    setObjectiveTo: (set_objective_to: string) => void;
    /**
     * Function generated for "set_percentage_complete" block.
     *
     * @param set_percentage_complete_to - An input block of type `number`.
     */
    setPercentageCompleteTo: (set_percentage_complete_to: number) => void;
    /**
     * Function generated for "increment_percentage_complete" block.
     *
     * @param increment_percentage_complete_by - An input block of type `number`.
     */
    incrementPercentageCompleteBy: (increment_percentage_complete_by: number) => void;
    /**
     * Function generated for "send_custom_notification" block.
     *
     * @param title - An input block of type `string`.
     * @param content - An input block of type `string`.
     */
    sendNotificationTitleContent: (title: string, content: string) => void;
    /**
     * Function generated for "other_character_name" block.
     *
     */
    otherPlayersName: () => string;
    /**
     * Function generated for "other_character_team_number" block.
     *
     */
    otherPlayersTeamNumber: () => number;
    /**
     * Function generated for "other_character_get_property" block.
     *
     * @param get_property_as_other_player - An input block of type `string`.
     */
    getPropertyAsOtherPlayer: (get_property_as_other_player: string) => string | number | boolean;
    /**
     * Function generated for "other_character_set_property" block.
     *
     * @param set_property_as_other_player - An input block of type `string`.
     * @param value - An input block of type `string | number | boolean`.
     */
    setPropertyAsOtherPlayerValue: (set_property_as_other_player: string, value: string | number | boolean) => void;
    /**
     * Function generated for "other_character_message_broadcaster" block.
     *
     * @param broadcast_message_as_other_player_on_channel - An input block of type `string`.
     */
    broadcastMessageAsOtherPlayerOnChannel: (broadcast_message_as_other_player_on_channel: string) => void;
    /**
     * Function generated for "grant" block.
     *
     */
    grantPlayerSelectedItem: () => void;
    /**
     * Function generated for "grant_custom" block.
     *
     * @param amount - An input block of type `number`.
     */
    grantPlayerSelectedItemCustomAmountAmount: (amount: number) => void;
    /**
     * Function generated for "set_billboard_text" block.
     *
     * @param set_text - An input block of type `string`.
     */
    setText: (set_text: string) => void;
    /**
     * Function generated for "set_text_color" block.
     *
     * @param set_text_color_to - A field of type `Color`. It must be a literal, non-dynamic value.
     */
    setTextColorTo: (set_text_color_to: Color) => void;
    /**
     * Function generated for "set_image" block.
     *
     * @param set_image_url - An input block of type `string`.
     */
    setImageUrl: (set_image_url: string) => void;
    /**
     * Function generated for "set_frame_color" block.
     *
     * @param set_frame_color_to - A field of type `Color`. It must be a literal, non-dynamic value.
     */
    setFrameColorTo: (set_frame_color_to: Color) => void;
    /**
     * Function generated for "question_answering_streak" block.
     *
     */
    questionsAnsweredCorrectlyInARow: () => number;
    /**
     * Function generated for "message_correct_answer" block.
     *
     * @param set_message_shown_when_player_answers_correctly - An input block of type `string`.
     */
    setMessageShownWhenPlayerAnswersCorrectly: (set_message_shown_when_player_answers_correctly: string) => void;
    /**
     * Function generated for "message_incorrect_answer" block.
     *
     * @param set_message_shown_when_player_answers_incorrectly - An input block of type `string`.
     */
    setMessageShownWhenPlayerAnswersIncorrectly: (set_message_shown_when_player_answers_incorrectly: string) => void;
    /**
     * Function generated for "set_header" block.
     *
     * @param set_header - An input block of type `string`.
     */
    setHeader: (set_header: string) => void;
    /**
     * Function generated for "set_content" block.
     *
     * @param set_content - An input block of type `string`.
     */
    setContent: (set_content: string) => void;
    /**
     * Function generated for "get_amount" block.
     *
     */
    getAmountOfCurrentItem: () => number;
    /**
     * Function generated for "set_gui_text" block.
     *
     * @param set_text - An input block of type `string`.
     */
    setGuiText: (set_text: string) => void;
    /**
     * Function generated for "get_minutes" block.
     *
     */
    getMinutes: () => number;
    /**
     * Function generated for "get_seconds" block.
     *
     */
    getSeconds: () => number;
    /**
     * Function generated for "get_time_left_formatted" block.
     *
     */
    getTimeLeftFormatted: () => string;
    /**
     * Function generated for "get_player_count" block.
     *
     */
    numberOfPlayersOnTeam: () => number;
    /**
     * Function generated for "knockout_manager_other_character_name" block.
     *
     */
    knockedPlayersName: () => string;
    /**
     * Function generated for "knockout_manager_other_character_team_number" block.
     *
     */
    knockedPlayersTeamNumber: () => number;
    /**
     * Function generated for "knockout_manager_other_character_get_property" block.
     *
     * @param get_property_as_knocked_out_player - An input block of type `string`.
     */
    getPropertyAsKnockedOutPlayer: (get_property_as_knocked_out_player: string) => string | number | boolean;
    /**
     * Function generated for "knockout_manager_other_character_set_property" block.
     *
     * @param set_property_as_knocked_out_player - An input block of type `string`.
     * @param value - An input block of type `string | number | boolean`.
     */
    setPropertyAsKnockedOutPlayerValue: (set_property_as_knocked_out_player: string, value: string | number | boolean) => void;
    /**
     * Function generated for "knockout_manager_other_character_message_broadcaster" block.
     *
     * @param broadcast_message_as_knocked_out_player_on_channel - An input block of type `string`.
     */
    broadcastMessageAsKnockedOutPlayerOnChannel: (broadcast_message_as_knocked_out_player_on_channel: string) => void;
    /**
     * Function generated for "tag_zone_other_character_name" block.
     *
     */
    tagZoneOtherCharacterName: () => string;
    /**
     * Function generated for "tag_zone_other_character_team_number" block.
     *
     */
    tagZoneOtherCharacterTeamNumber: () => number;
    /**
     * Function generated for "player_position_detector_player_x_position" block.
     *
     */
    playersXPosition: () => number;
    /**
     * Function generated for "player_position_detector_player_y_position" block.
     *
     */
    playersYPosition: () => number;
    /**
     * Function generated for "damage_custom" block.
     *
     * @param amount - An input block of type `number`.
     */
    damagePlayerCustomAmountAmount: (amount: number) => void;
    /**
     * Function generated for "number_with_commas" block.
     *
     * @param convert_number_to_text_with_commas - An input block of type `number`.
     */
    convertNumberToTextWithCommas: (convert_number_to_text_with_commas: number) => string;
};

export { Union };
