type Trigger = {
    mathSingle: (OP: 'ROOT' | 'ABS' | 'NEG' | 'LN' | 'LOG10' | 'EXP' | 'POW10', NUM: number) => number;
    mathTrig: (OP: 'SIN' | 'COS' | 'TAN' | 'ASIN' | 'ACOS' | 'ATAN', NUM: number) => number;
    mathNumberProperty: (PROPERTY: 'EVEN' | 'ODD' | 'PRIME' | 'WHOLE' | 'POSITIVE' | 'NEGATIVE' | 'DIVISIBLE_BY', NUMBER_TO_CHECK: number) => boolean;
    mathRound: (OP: 'ROUND' | 'ROUNDUP' | 'ROUNDDOWN', NUM: number) => number;
    randomInteger: (FROM: number, TO: number) => number;
    convertNumberToTextWithCommas: (convert_number_to_text_with_commas: number) => string;
    getSubstring: (WHERE1: 'FIRST' | 'FROM_START' | 'FROM_END', WHERE2: 'LAST' | 'FROM_START' | 'FROM_END', STRING: string, AT1: number, AT2: number) => string;
    getLetter: (WHERE: 'FIRST' | 'LAST' | 'FROM_START' | 'FROM_END' | 'RANDOM', VALUE: string, AT: number) => string;
    findOccurrenceOfText: (END: 'FIRST' | 'LAST', VALUE: string, FIND: string) => number;
    broadcastMessageOnChannel: (broadcast_message_on_channel: string) => void;
    setProperty: (set_property: string, value: number | string | boolean) => void;
    getProperty: (get_property: string) => number | string | boolean;
    addActivityFeedItemForEveryone: (add_activity_feed_item_for_everyone: string) => void;
    addActivityFeedItemForTriggeringPlayer: (add_activity_feed_item_for_triggering_player: string) => void;
    addActivityFeedItemForGameHost: (add_activity_feed_item_for_game_host: string) => void;
    triggeringPlayersName: () => string;
    triggeringPlayersTeamNumber: () => number;
    triggeringPlayersScore: () => number;
    getScoreOfTeam: (get_score_of_team: number) => number;
    isALiveGame: () => boolean;
    isAnAssignment: () => boolean;
    secondsIntoGame: () => number;
};

declare function test(): number;

export { Trigger, test };
