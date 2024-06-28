
# Block to JavaScript code conversion table

## Guide

**Block Type**: The built-in type field of the block.

**Example**: A visual representation of the block.

**JavaScript Function**: The JavaScript function that converts to the block. 
  - The function name is created using a simple algorithm:
      - If there's text written on the block, punctuation is removed and the text is converted to camelCase to make the function name.
      - If there's no text written on the block or there's a name collision, the function name is the block type converted to camelCase.
  - Doesn't exist for some blocks where it's not possible (for example `if`)—see the Sugar column in that case. 

  
**Sugar**: The shorthand syntax for the block, if it exists.
  - Should intuitively map JavaScript features to blocks. For example, `if { ... }` maps to an `if` block.

## Table

<table>
  <tr>
    <th>Block Type</th>
    <th>Example</th>
    <th>JavaScript Function</th>
    <th>Sugar</th>
  </tr>

<tr>
<td>logic_boolean</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/logic_boolean.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function logicBoolean(BOOL: 'TRUE' | 'FALSE'): boolean;
```


</td>
<td>

</td>

<tr>
<td>controls_if</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/controls_if.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>

</td>
<td>


```typescript
if { ... } else { ... }
```


</td>

<tr>
<td>logic_compare</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/logic_compare.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function logicCompare(A: any, OP: 'EQ' | 'NEQ' | 'LT' | 'LTE' | 'GT' | 'GTE', B: any): boolean;
```


</td>
<td>

</td>

<tr>
<td>logic_operation</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/logic_operation.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function logicOperation(A: boolean, OP: 'AND' | 'OR', B: boolean): boolean;
```


</td>
<td>

</td>

<tr>
<td>math_number</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/math_number.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function mathNumber(NUM: number): number;
```


</td>
<td>

</td>

<tr>
<td>math_arithmetic</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/math_arithmetic.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function mathArithmetic(A: number, OP: 'ADD' | 'MINUS' | 'MULTIPLY' | 'DIVIDE' | 'POWER', B: number): number;
```


</td>
<td>

</td>

<tr>
<td>math_single</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/math_single.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function mathSingle(OP: 'ROOT' | 'ABS' | 'NEG' | 'LN' | 'LOG10' | 'EXP' | 'POW10', NUM: number): number;
```


</td>
<td>

</td>

<tr>
<td>math_trig</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/math_trig.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function mathTrig(OP: 'SIN' | 'COS' | 'TAN' | 'ASIN' | 'ACOS' | 'ATAN', NUM: number): number;
```


</td>
<td>

</td>

<tr>
<td>math_number_property</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/math_number_property.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function mathNumberProperty(NUMBER_TO_CHECK: number, PROPERTY: 'EVEN' | 'ODD' | 'PRIME' | 'WHOLE' | 'POSITIVE' | 'NEGATIVE' | 'DIVISIBLE_BY'): boolean;
```


</td>
<td>

</td>

<tr>
<td>math_change</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/math_change.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>

</td>
<td>

</td>

<tr>
<td>math_round</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/math_round.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function mathRound(OP: 'ROUND' | 'ROUNDUP' | 'ROUNDDOWN', NUM: number): number;
```


</td>
<td>

</td>

<tr>
<td>math_random_int</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/math_random_int.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function randomIntegerFromTo(FROM: number, TO: number): number;
```


</td>
<td>

</td>

<tr>
<td>text</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/text.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function text(TEXT: string): string;
```


</td>
<td>

</td>

<tr>
<td>text_join</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/text_join.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>

</td>
<td>

</td>

<tr>
<td>text_length</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/text_length.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function lengthOf(VALUE: string): number;
```


</td>
<td>

</td>

<tr>
<td>text_indexOf</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/text_indexOf.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function inText(VALUE: string, END: 'FIRST' | 'LAST', FIND: string): number;
```


</td>
<td>

</td>

<tr>
<td>text_charAt</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/text_charAt.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>

</td>
<td>

</td>

<tr>
<td>text_getSubstring</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/text_getSubstring.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function inTextGetSubstringFromTo(STRING: string, WHERE1: 'FROM_START' | 'FROM_END' | 'FIRST', AT1: number, WHERE2: 'FROM_START' | 'FROM_END' | 'LAST', AT2: number): string;
```


</td>
<td>

</td>

<tr>
<td>variables_get</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/variables_get.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>

</td>
<td>

</td>

<tr>
<td>variables_set</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/variables_set.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>

</td>
<td>

</td>

<tr>
<td>message_broadcaster</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/message_broadcaster.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function broadcastMessageOnChannel(broadcast_message_on_channel: string): void;
```


</td>
<td>

</td>

<tr>
<td>set_property</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/set_property.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function setPropertyValue(set_property: string, value: string | number | boolean): void;
```


</td>
<td>

</td>

<tr>
<td>get_property</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/get_property.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function getProperty(get_property: string): string | number | boolean;
```


</td>
<td>

</td>

<tr>
<td>current_character_name</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/current_character_name.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function triggeringPlayersName(): string;
```


</td>
<td>

</td>

<tr>
<td>add_activity_feed_item_for_everyone</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/add_activity_feed_item_for_everyone.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function addActivityFeedItemForEveryone(add_activity_feed_item_for_everyone: string): void;
```


</td>
<td>

</td>

<tr>
<td>add_activity_feed_item_for_triggering_player</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/add_activity_feed_item_for_triggering_player.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function addActivityFeedItemForTriggeringPlayer(add_activity_feed_item_for_triggering_player: string): void;
```


</td>
<td>

</td>

<tr>
<td>add_activity_feed_item_for_game_host</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/add_activity_feed_item_for_game_host.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function addActivityFeedItemForGameHost(add_activity_feed_item_for_game_host: string): void;
```


</td>
<td>

</td>

<tr>
<td>current_character_team_number</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/current_character_team_number.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function triggeringPlayersTeamNumber(): number;
```


</td>
<td>

</td>

<tr>
<td>triggering_player_score</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/triggering_player_score.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function triggeringPlayersScore(): number;
```


</td>
<td>

</td>

<tr>
<td>get_team_score</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/get_team_score.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function getScoreOfTeam(get_score_of_team: number): number;
```


</td>
<td>

</td>

<tr>
<td>is_a_live_game</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/is_a_live_game.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function isALiveGame(): boolean;
```


</td>
<td>

</td>

<tr>
<td>is_an_assignment</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/is_an_assignment.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function isAnAssignment(): boolean;
```


</td>
<td>

</td>

<tr>
<td>seconds_into_game</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/seconds_into_game.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function secondsIntoGame(): number;
```


</td>
<td>

</td>

<tr>
<td>set_assignment_objective</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/set_assignment_objective.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function setObjectiveTo(set_objective_to: string): void;
```


</td>
<td>

</td>

<tr>
<td>set_percentage_complete</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/set_percentage_complete.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function setPercentageCompleteTo(set_percentage_complete_to: number): void;
```


</td>
<td>

</td>

<tr>
<td>increment_percentage_complete</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/increment_percentage_complete.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function incrementPercentageCompleteBy(increment_percentage_complete_by: number): void;
```


</td>
<td>

</td>

<tr>
<td>send_custom_notification</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/send_custom_notification.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function sendNotificationTitleContent(title: string, content: string): void;
```


</td>
<td>

</td>

<tr>
<td>other_character_name</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/other_character_name.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function otherPlayersName(): string;
```


</td>
<td>

</td>

<tr>
<td>other_character_team_number</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/other_character_team_number.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function otherPlayersTeamNumber(): number;
```


</td>
<td>

</td>

<tr>
<td>other_character_get_property</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/other_character_get_property.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function getPropertyAsOtherPlayer(get_property_as_other_player: string): string | number | boolean;
```


</td>
<td>

</td>

<tr>
<td>other_character_set_property</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/other_character_set_property.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function setPropertyAsOtherPlayerValue(set_property_as_other_player: string, value: string | number | boolean): void;
```


</td>
<td>

</td>

<tr>
<td>other_character_message_broadcaster</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/other_character_message_broadcaster.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function broadcastMessageAsOtherPlayerOnChannel(broadcast_message_as_other_player_on_channel: string): void;
```


</td>
<td>

</td>

<tr>
<td>grant</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/grant.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function grantPlayerSelectedItem(): void;
```


</td>
<td>

</td>

<tr>
<td>grant_custom</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/grant_custom.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function grantPlayerSelectedItemCustomAmountAmount(amount: number): void;
```


</td>
<td>

</td>

<tr>
<td>set_billboard_text</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/set_billboard_text.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function setText(set_text: string): void;
```


</td>
<td>

</td>

<tr>
<td>set_text_color</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/set_text_color.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function setTextColorTo(set_text_color_to: Color): void;
```


</td>
<td>

</td>

<tr>
<td>set_image</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/set_image.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function setImageUrl(set_image_url: string): void;
```


</td>
<td>

</td>

<tr>
<td>set_frame_color</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/set_frame_color.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function setFrameColorTo(set_frame_color_to: Color): void;
```


</td>
<td>

</td>

<tr>
<td>question_answering_streak</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/question_answering_streak.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function questionsAnsweredCorrectlyInARow(): number;
```


</td>
<td>

</td>

<tr>
<td>message_correct_answer</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/message_correct_answer.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function setMessageShownWhenPlayerAnswersCorrectly(set_message_shown_when_player_answers_correctly: string): void;
```


</td>
<td>

</td>

<tr>
<td>message_incorrect_answer</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/message_incorrect_answer.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function setMessageShownWhenPlayerAnswersIncorrectly(set_message_shown_when_player_answers_incorrectly: string): void;
```


</td>
<td>

</td>

<tr>
<td>set_header</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/set_header.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function setHeader(set_header: string): void;
```


</td>
<td>

</td>

<tr>
<td>set_content</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/set_content.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function setContent(set_content: string): void;
```


</td>
<td>

</td>

<tr>
<td>get_amount</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/get_amount.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function getAmountOfCurrentItem(): number;
```


</td>
<td>

</td>

<tr>
<td>set_gui_text</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/set_gui_text.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function setGuiText(set_text: string): void;
```


</td>
<td>

</td>

<tr>
<td>get_minutes</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/get_minutes.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function getMinutes(): number;
```


</td>
<td>

</td>

<tr>
<td>get_seconds</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/get_seconds.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function getSeconds(): number;
```


</td>
<td>

</td>

<tr>
<td>get_time_left_formatted</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/get_time_left_formatted.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function getTimeLeftFormatted(): string;
```


</td>
<td>

</td>

<tr>
<td>get_player_count</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/get_player_count.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function numberOfPlayersOnTeam(): number;
```


</td>
<td>

</td>

<tr>
<td>knockout_manager_other_character_name</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/knockout_manager_other_character_name.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function knockedPlayersName(): string;
```


</td>
<td>

</td>

<tr>
<td>knockout_manager_other_character_team_number</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/knockout_manager_other_character_team_number.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function knockedPlayersTeamNumber(): number;
```


</td>
<td>

</td>

<tr>
<td>knockout_manager_other_character_get_property</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/knockout_manager_other_character_get_property.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function getPropertyAsKnockedOutPlayer(get_property_as_knocked_out_player: string): string | number | boolean;
```


</td>
<td>

</td>

<tr>
<td>knockout_manager_other_character_set_property</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/knockout_manager_other_character_set_property.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function setPropertyAsKnockedOutPlayerValue(set_property_as_knocked_out_player: string, value: string | number | boolean): void;
```


</td>
<td>

</td>

<tr>
<td>knockout_manager_other_character_message_broadcaster</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/knockout_manager_other_character_message_broadcaster.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function broadcastMessageAsKnockedOutPlayerOnChannel(broadcast_message_as_knocked_out_player_on_channel: string): void;
```


</td>
<td>

</td>

<tr>
<td>tag_zone_other_character_name</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/tag_zone_other_character_name.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function tagZoneOtherCharacterName(): string;
```


</td>
<td>

</td>

<tr>
<td>tag_zone_other_character_team_number</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/tag_zone_other_character_team_number.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function tagZoneOtherCharacterTeamNumber(): number;
```


</td>
<td>

</td>

<tr>
<td>player_position_detector_player_x_position</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/player_position_detector_player_x_position.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function playersXPosition(): number;
```


</td>
<td>

</td>

<tr>
<td>player_position_detector_player_y_position</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/player_position_detector_player_y_position.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function playersYPosition(): number;
```


</td>
<td>

</td>

<tr>
<td>damage_custom</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/damage_custom.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function damagePlayerCustomAmountAmount(amount: number): void;
```


</td>
<td>

</td>

<tr>
<td>number_with_commas</td>
<td><p>

  <div style="width: 500px">
  <img src="./svg/number_with_commas.svg" width="500" height="40" alt="css-in-readme">
  </div>
</p></td>
<td>


```typescript
function convertNumberToTextWithCommas(convert_number_to_text_with_commas: number): string;
```


</td>
<td>

</td>

</table>
