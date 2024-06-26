/**
 * The color type. A hex string, rgb value, etc.
 *
 * @example
 * '#ff0000'
 * 'rgb(255, 0, 0)'
 */
export type Color = string;

/**
 * The union of all possible devices.
 *
 * @remarks
 * No actual device will have all of these functions. The user
 * must ensure that the device they are using has these functions.
 */
export type Union = {
  /**
   * Function generated for "logic_boolean" block.
   */
  logicBoolean: (BOOL: "TRUE" | "FALSE") => boolean;
  /**
   * Function generated for "logic_compare" block.
   */
  logicCompare: (
    A: void,
    OP: "EQ" | "NEQ" | "LT" | "LTE" | "GT" | "GTE",
    B: void
  ) => boolean;
  /**
   * Function generated for "logic_operation" block.
   */
  logicOperation: (A: boolean, OP: "AND" | "OR", B: boolean) => boolean;
  /**
   * Function generated for "logic_negate" block.
   */
  not: (BOOL: boolean) => boolean;
  /**
   * Function generated for "math_number" block.
   */
  mathNumber: (NUM: number) => number;
  /**
   * Function generated for "math_arithmetic" block.
   */
  mathArithmetic: (
    A: number,
    OP: "ADD" | "MINUS" | "MULTIPLY" | "DIVIDE" | "POWER",
    B: number
  ) => number;
  /**
   * Function generated for "math_single" block.
   */
  mathSingle: (
    OP: "ROOT" | "ABS" | "NEG" | "LN" | "LOG10" | "EXP" | "POW10",
    NUM: number
  ) => number;
  /**
   * Function generated for "math_trig" block.
   */
  mathTrig: (
    OP: "SIN" | "COS" | "TAN" | "ASIN" | "ACOS" | "ATAN",
    NUM: number
  ) => number;
  /**
   * Function generated for "math_constant" block.
   */
  mathConstant: (
    CONSTANT: "PI" | "E" | "GOLDEN_RATIO" | "SQRT2" | "SQRT1_2" | "INFINITY"
  ) => number;
  /**
   * Function generated for "math_number_property" block.
   */
  mathNumberProperty: (
    NUMBER_TO_CHECK: number,
    PROPERTY:
      | "EVEN"
      | "ODD"
      | "PRIME"
      | "WHOLE"
      | "POSITIVE"
      | "NEGATIVE"
      | "DIVISIBLE_BY"
  ) => boolean;
  /**
   * Function generated for "math_round" block.
   */
  mathRound: (OP: "ROUND" | "ROUNDUP" | "ROUNDDOWN", NUM: number) => number;
  /**
   * Function generated for "math_modulo" block.
   */
  remainderOf: (DIVIDEND: number, DIVISOR: number) => number;
  /**
   * Function generated for "math_constrain" block.
   */
  constrainLowHigh: (VALUE: number, LOW: number, HIGH: number) => number;
  /**
   * Function generated for "math_random_int" block.
   */
  randomIntegerFromTo: (FROM: number, TO: number) => number;
  /**
   * Function generated for "math_random_float" block.
   */
  randomFraction: () => number;
  /**
   * Function generated for "math_atan2" block.
   */
  atan2OfXY: (X: number, Y: number) => number;
  /**
   * Function generated for "text" block.
   */
  text: (TEXT: string) => string;
  /**
   * Function generated for "text_length" block.
   */
  lengthOf: (VALUE: string) => number;
  /**
   * Function generated for "text_isEmpty" block.
   */
  IsEmpty: (VALUE: string) => boolean;
  /**
   * Function generated for "text_indexOf" block.
   */
  inText: (VALUE: string, END: "FIRST" | "LAST", FIND: string) => number;
  /**
   * Function generated for "message_broadcaster" block.
   */
  broadcastMessageOnChannel: (broadcast_message_on_channel: string) => void;
  /**
   * Function generated for "set_property" block.
   */
  setPropertyValue: (
    set_property: string,
    value: string | number | boolean
  ) => void;
  /**
   * Function generated for "get_property" block.
   */
  getProperty: (get_property: string) => string | number | boolean;
  /**
   * Function generated for "current_character_name" block.
   */
  triggeringPlayersName: () => string;
  /**
   * Function generated for "add_activity_feed_item_for_everyone" block.
   */
  addActivityFeedItemForEveryone: (
    add_activity_feed_item_for_everyone: string
  ) => void;
  /**
   * Function generated for "add_activity_feed_item_for_triggering_player" block.
   */
  addActivityFeedItemForTriggeringPlayer: (
    add_activity_feed_item_for_triggering_player: string
  ) => void;
  /**
   * Function generated for "add_activity_feed_item_for_game_host" block.
   */
  addActivityFeedItemForGameHost: (
    add_activity_feed_item_for_game_host: string
  ) => void;
  /**
   * Function generated for "current_character_team_number" block.
   */
  triggeringPlayersTeamNumber: () => number;
  /**
   * Function generated for "triggering_player_score" block.
   */
  triggeringPlayersScore: () => number;
  /**
   * Function generated for "get_team_score" block.
   */
  getScoreOfTeam: (get_score_of_team: number) => number;
  /**
   * Function generated for "is_a_live_game" block.
   */
  isALiveGame: () => boolean;
  /**
   * Function generated for "is_an_assignment" block.
   */
  isAnAssignment: () => boolean;
  /**
   * Function generated for "seconds_into_game" block.
   */
  secondsIntoGame: () => number;
  /**
   * Function generated for "set_assignment_objective" block.
   */
  setObjectiveTo: (set_objective_to: string) => void;
  /**
   * Function generated for "set_percentage_complete" block.
   */
  setPercentageCompleteTo: (set_percentage_complete_to: number) => void;
  /**
   * Function generated for "increment_percentage_complete" block.
   */
  incrementPercentageCompleteBy: (
    increment_percentage_complete_by: number
  ) => void;
  /**
   * Function generated for "send_custom_notification" block.
   */
  sendNotificationTitleContent: (title: string, content: string) => void;
  /**
   * Function generated for "other_character_name" block.
   */
  otherPlayersName: () => string;
  /**
   * Function generated for "other_character_team_number" block.
   */
  otherPlayersTeamNumber: () => number;
  /**
   * Function generated for "other_character_get_property" block.
   */
  getPropertyAsOtherPlayer: (
    get_property_as_other_player: string
  ) => string | number | boolean;
  /**
   * Function generated for "other_character_set_property" block.
   */
  setPropertyAsOtherPlayerValue: (
    set_property_as_other_player: string,
    value: string | number | boolean
  ) => void;
  /**
   * Function generated for "other_character_message_broadcaster" block.
   */
  broadcastMessageAsOtherPlayerOnChannel: (
    broadcast_message_as_other_player_on_channel: string
  ) => void;
  /**
   * Function generated for "grant" block.
   */
  grantPlayerSelectedItem: () => void;
  /**
   * Function generated for "grant_custom" block.
   */
  grantPlayerSelectedItemCustomAmountAmount: (amount: number) => void;
  /**
   * Function generated for "set_billboard_text" block.
   */
  setText: (set_text: string) => void;
  /**
   * Function generated for "set_text_color" block.
   */
  setTextColorTo: (set_text_color_to: Color) => void;
  /**
   * Function generated for "set_image" block.
   */
  setImageUrl: (set_image_url: string) => void;
  /**
   * Function generated for "set_frame_color" block.
   */
  setFrameColorTo: (set_frame_color_to: Color) => void;
  /**
   * Function generated for "question_answering_streak" block.
   */
  questionsAnsweredCorrectlyInARow: () => number;
  /**
   * Function generated for "message_correct_answer" block.
   */
  setMessageShownWhenPlayerAnswersCorrectly: (
    set_message_shown_when_player_answers_correctly: string
  ) => void;
  /**
   * Function generated for "message_incorrect_answer" block.
   */
  setMessageShownWhenPlayerAnswersIncorrectly: (
    set_message_shown_when_player_answers_incorrectly: string
  ) => void;
  /**
   * Function generated for "set_header" block.
   */
  setHeader: (set_header: string) => void;
  /**
   * Function generated for "set_content" block.
   */
  setContent: (set_content: string) => void;
  /**
   * Function generated for "get_amount" block.
   */
  getAmountOfCurrentItem: () => number;
  /**
   * Function generated for "set_gui_text" block.
   */
  setGuiText: (set_text: string) => void;
  /**
   * Function generated for "get_minutes" block.
   */
  getMinutes: () => number;
  /**
   * Function generated for "get_seconds" block.
   */
  getSeconds: () => number;
  /**
   * Function generated for "get_time_left_formatted" block.
   */
  getTimeLeftFormatted: () => string;
  /**
   * Function generated for "get_player_count" block.
   */
  numberOfPlayersOnTeam: () => number;
  /**
   * Function generated for "knockout_manager_other_character_name" block.
   */
  knockedPlayersName: () => string;
  /**
   * Function generated for "knockout_manager_other_character_team_number" block.
   */
  knockedPlayersTeamNumber: () => number;
  /**
   * Function generated for "knockout_manager_other_character_get_property" block.
   */
  getPropertyAsKnockedOutPlayer: (
    get_property_as_knocked_out_player: string
  ) => string | number | boolean;
  /**
   * Function generated for "knockout_manager_other_character_set_property" block.
   */
  setPropertyAsKnockedOutPlayerValue: (
    set_property_as_knocked_out_player: string,
    value: string | number | boolean
  ) => void;
  /**
   * Function generated for "knockout_manager_other_character_message_broadcaster" block.
   */
  broadcastMessageAsKnockedOutPlayerOnChannel: (
    broadcast_message_as_knocked_out_player_on_channel: string
  ) => void;
  /**
   * Function generated for "tag_zone_other_character_name" block.
   */
  tagZoneOtherCharacterName: () => string;
  /**
   * Function generated for "tag_zone_other_character_team_number" block.
   */
  tagZoneOtherCharacterTeamNumber: () => number;
  /**
   * Function generated for "player_position_detector_player_x_position" block.
   */
  playersXPosition: () => number;
  /**
   * Function generated for "player_position_detector_player_y_position" block.
   */
  playersYPosition: () => number;
  /**
   * Function generated for "damage_custom" block.
   */
  damagePlayerCustomAmountAmount: (amount: number) => void;
  /**
   * Function generated for "number_with_commas" block.
   */
  convertNumberToTextWithCommas: (
    convert_number_to_text_with_commas: number
  ) => string;
};
