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
     * @param BOOL - A field. It must be a literal, non-dynamic value.
     */
    logicBoolean: (BOOL: "TRUE" | "FALSE") => boolean;
    /**
     * Function generated for "logic_compare" block.
     *
     * @param A - An input block.
     * @param OP - A field. It must be a literal, non-dynamic value.
     * @param B - An input block.
     */
    logicCompare: (A: any, OP: "EQ" | "NEQ" | "LT" | "LTE" | "GT" | "GTE", B: any) => boolean;
    /**
     * Function generated for "logic_operation" block.
     *
     * @param A - An input block.
     * @param OP - A field. It must be a literal, non-dynamic value.
     * @param B - An input block.
     */
    logicOperation: (A: boolean, OP: "AND" | "OR", B: boolean) => boolean;
    /**
     * Function generated for "math_number" block.
     *
     * @param NUM - A field. It must be a literal, non-dynamic value.
     */
    mathNumber: (NUM: number) => number;
    /**
     * Function generated for "math_arithmetic" block.
     *
     * @param A - An input block.
     * @param OP - A field. It must be a literal, non-dynamic value.
     * @param B - An input block.
     */
    mathArithmetic: (A: number, OP: "ADD" | "MINUS" | "MULTIPLY" | "DIVIDE" | "POWER", B: number) => number;
    /**
     * Function generated for "math_single" block.
     *
     * @param OP - A field. It must be a literal, non-dynamic value.
     * @param NUM - An input block.
     */
    mathSingle: (OP: "ROOT" | "ABS" | "NEG" | "LN" | "LOG10" | "EXP" | "POW10", NUM: number) => number;
    /**
     * Function generated for "math_trig" block.
     *
     * @param OP - A field. It must be a literal, non-dynamic value.
     * @param NUM - An input block.
     */
    mathTrig: (OP: "SIN" | "COS" | "TAN" | "ASIN" | "ACOS" | "ATAN", NUM: number) => number;
    /**
     * Function generated for "math_number_property" block.
     *
     * @param NUMBER_TO_CHECK - An input block.
     * @param PROPERTY - A field. It must be a literal, non-dynamic value.
     */
    mathNumberProperty: (NUMBER_TO_CHECK: number, PROPERTY: "EVEN" | "ODD" | "PRIME" | "WHOLE" | "POSITIVE" | "NEGATIVE" | "DIVISIBLE_BY") => boolean;
    /**
     * Function generated for "math_round" block.
     *
     * @param OP - A field. It must be a literal, non-dynamic value.
     * @param NUM - An input block.
     */
    mathRound: (OP: "ROUND" | "ROUNDUP" | "ROUNDDOWN", NUM: number) => number;
    /**
     * Function generated for "math_random_int" block.
     *
     * @param FROM - An input block.
     * @param TO - An input block.
     */
    randomIntegerFromTo: (FROM: number, TO: number) => number;
    /**
     * Function generated for "text" block.
     *
     * @param TEXT - A field. It must be a literal, non-dynamic value.
     */
    text: (TEXT: string) => string;
    /**
     * Function generated for "text_join" block.
     *
     */
    createTextWith: (...args: any[]) => string;
    /**
     * Function generated for "text_length" block.
     *
     * @param VALUE - An input block.
     */
    lengthOf: (VALUE: string) => number;
    /**
     * Function generated for "text_indexOf" block.
     *
     * @param VALUE - An input block.
     * @param END - A field. It must be a literal, non-dynamic value.
     * @param FIND - An input block.
     */
    inText: (VALUE: string, END: "FIRST" | "LAST", FIND: string) => number;
    /**
     * Function generated for "text_charAt" block.
     *
     * @param VALUE - An input block.
     * @param WHERE - A field. It must be a literal, non-dynamic value.
     */
    textCharAt: (VALUE: string, WHERE: "FROM_START" | "FROM_END" | "FIRST" | "LAST" | "RANDOM") => string;
    /**
     * Function generated for "text_getSubstring" block.
     *
     * @param STRING - An input block.
     * @param WHERE1 - A field. It must be a literal, non-dynamic value.
     * @param AT1 - An input block.
     * @param WHERE2 - A field. It must be a literal, non-dynamic value.
     * @param AT2 - An input block.
     */
    inTextGetSubstringFromTo: (STRING: string, WHERE1: "FROM_START" | "FROM_END" | "FIRST", AT1: number, WHERE2: "FROM_START" | "FROM_END" | "LAST", AT2: number) => string;
    /**
     * Function generated for "message_broadcaster" block.
     *
     * @param broadcast_message_on_channel - An input block.
     */
    broadcastMessageOnChannel: (broadcast_message_on_channel: string) => void;
    /**
     * Function generated for "set_property" block.
     *
     * @param set_property - An input block.
     * @param value - An input block.
     */
    setPropertyValue: (set_property: string, value: string | number | boolean) => void;
    /**
     * Function generated for "get_property" block.
     *
     * @param get_property - An input block.
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
     * @param add_activity_feed_item_for_everyone - An input block.
     */
    addActivityFeedItemForEveryone: (add_activity_feed_item_for_everyone: string) => void;
    /**
     * Function generated for "add_activity_feed_item_for_triggering_player" block.
     *
     * @param add_activity_feed_item_for_triggering_player - An input block.
     */
    addActivityFeedItemForTriggeringPlayer: (add_activity_feed_item_for_triggering_player: string) => void;
    /**
     * Function generated for "add_activity_feed_item_for_game_host" block.
     *
     * @param add_activity_feed_item_for_game_host - An input block.
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
     * @param get_score_of_team - An input block.
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
     * @param set_objective_to - An input block.
     */
    setObjectiveTo: (set_objective_to: string) => void;
    /**
     * Function generated for "set_percentage_complete" block.
     *
     * @param set_percentage_complete_to - An input block.
     */
    setPercentageCompleteTo: (set_percentage_complete_to: number) => void;
    /**
     * Function generated for "increment_percentage_complete" block.
     *
     * @param increment_percentage_complete_by - An input block.
     */
    incrementPercentageCompleteBy: (increment_percentage_complete_by: number) => void;
    /**
     * Function generated for "send_custom_notification" block.
     *
     * @param title - An input block.
     * @param content - An input block.
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
     * @param get_property_as_other_player - An input block.
     */
    getPropertyAsOtherPlayer: (get_property_as_other_player: string) => string | number | boolean;
    /**
     * Function generated for "other_character_set_property" block.
     *
     * @param set_property_as_other_player - An input block.
     * @param value - An input block.
     */
    setPropertyAsOtherPlayerValue: (set_property_as_other_player: string, value: string | number | boolean) => void;
    /**
     * Function generated for "other_character_message_broadcaster" block.
     *
     * @param broadcast_message_as_other_player_on_channel - An input block.
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
     * @param amount - An input block.
     */
    grantPlayerSelectedItemCustomAmountAmount: (amount: number) => void;
    /**
     * Function generated for "set_billboard_text" block.
     *
     * @param set_text - An input block.
     */
    setText: (set_text: string) => void;
    /**
     * Function generated for "set_text_color" block.
     *
     * @param set_text_color_to - A field. It must be a literal, non-dynamic value.
     */
    setTextColorTo: (set_text_color_to: Color) => void;
    /**
     * Function generated for "set_image" block.
     *
     * @param set_image_url - An input block.
     */
    setImageUrl: (set_image_url: string) => void;
    /**
     * Function generated for "set_frame_color" block.
     *
     * @param set_frame_color_to - A field. It must be a literal, non-dynamic value.
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
     * @param set_message_shown_when_player_answers_correctly - An input block.
     */
    setMessageShownWhenPlayerAnswersCorrectly: (set_message_shown_when_player_answers_correctly: string) => void;
    /**
     * Function generated for "message_incorrect_answer" block.
     *
     * @param set_message_shown_when_player_answers_incorrectly - An input block.
     */
    setMessageShownWhenPlayerAnswersIncorrectly: (set_message_shown_when_player_answers_incorrectly: string) => void;
    /**
     * Function generated for "set_header" block.
     *
     * @param set_header - An input block.
     */
    setHeader: (set_header: string) => void;
    /**
     * Function generated for "set_content" block.
     *
     * @param set_content - An input block.
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
     * @param set_text - An input block.
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
     * @param get_property_as_knocked_out_player - An input block.
     */
    getPropertyAsKnockedOutPlayer: (get_property_as_knocked_out_player: string) => string | number | boolean;
    /**
     * Function generated for "knockout_manager_other_character_set_property" block.
     *
     * @param set_property_as_knocked_out_player - An input block.
     * @param value - An input block.
     */
    setPropertyAsKnockedOutPlayerValue: (set_property_as_knocked_out_player: string, value: string | number | boolean) => void;
    /**
     * Function generated for "knockout_manager_other_character_message_broadcaster" block.
     *
     * @param broadcast_message_as_knocked_out_player_on_channel - An input block.
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
     * @param amount - An input block.
     */
    damagePlayerCustomAmountAmount: (amount: number) => void;
    /**
     * Function generated for "number_with_commas" block.
     *
     * @param convert_number_to_text_with_commas - An input block.
     */
    convertNumberToTextWithCommas: (convert_number_to_text_with_commas: number) => string;
};

export { Union };
