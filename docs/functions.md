
# Block to JavaScript code conversion table

## Guide

**Block Type & Example**: The built-in type field of the block, and a visual representation of the block.

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
    <th>Block Type & Example_________________________________________________________</th>
    <th>JavaScript Function</th>
    <th>Sugar</th>
  </tr>

<tr>
<td><p>

logic_boolean


  <img src="./svg/logic_boolean.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function logicBoolean(BOOL: "TRUE" | "FALSE"): boolean;
```


</td>
<td>


```typescript
true;
false;
```


</td>

<tr>
<td><p>

controls_if


  <img src="./svg/controls_if.svg" width="500" alt="css-in-readme">

</p></td>
<td>
no function
</td>
<td>


```typescript
if { ... } else { ... }
```


</td>

<tr>
<td><p>

logic_compare


  <img src="./svg/logic_compare.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function logicCompare(
  A: any | null,
  OP: "EQ" | "NEQ" | "LT" | "LTE" | "GT" | "GTE",
  B: any | null,
): boolean;
```


</td>
<td>


```typescript
x == y; // or ===
x != y; // or !==
x < y;
x <= y;
x > y;
x >= y;
```


</td>

<tr>
<td><p>

logic_operation


  <img src="./svg/logic_operation.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function logicOperation(
  A: boolean | null,
  OP: "AND" | "OR",
  B: boolean | null,
): boolean;
```


</td>
<td>


```typescript
x && y;
x || y;
```


</td>

<tr>
<td><p>

math_number


  <img src="./svg/math_number.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function mathNumber(NUM: number): number;
```


</td>
<td>


```typescript
42;
21.5;
// or any number
```


</td>

<tr>
<td><p>

math_arithmetic


  <img src="./svg/math_arithmetic.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function mathArithmetic(
  A: number | null,
  OP: "ADD" | "MINUS" | "MULTIPLY" | "DIVIDE" | "POWER",
  B: number | null,
): number;
```


</td>
<td>


```typescript
x + y;
x - y;
x * y;
x / y;
x ** y;
```


</td>

<tr>
<td><p>

math_single


  <img src="./svg/math_single.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function mathSingle(
  OP: "ROOT" | "ABS" | "NEG" | "LN" | "LOG10" | "EXP" | "POW10",
  NUM: number | null,
): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

math_trig


  <img src="./svg/math_trig.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function mathTrig(
  OP: "SIN" | "COS" | "TAN" | "ASIN" | "ACOS" | "ATAN",
  NUM: number | null,
): number;
```


</td>
<td>


```typescript
Math.sin(x);
Math.cos(x);
// etc.
// Will preserve JS behaviour by multiplying by Math.PI / 180
```


</td>

<tr>
<td><p>

math_number_property


  <img src="./svg/math_number_property.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function mathNumberProperty(
  NUMBER_TO_CHECK: number | null,
  PROPERTY:
    | "EVEN"
    | "ODD"
    | "PRIME"
    | "WHOLE"
    | "POSITIVE"
    | "NEGATIVE"
    | "DIVISIBLE_BY",
): boolean;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

math_change


  <img src="./svg/math_change.svg" width="500" alt="css-in-readme">

</p></td>
<td>
no function
</td>
<td>


```typescript
x += y;
```


</td>

<tr>
<td><p>

math_round


  <img src="./svg/math_round.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function mathRound(
  OP: "ROUND" | "ROUNDUP" | "ROUNDDOWN",
  NUM: number | null,
): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

math_random_int


  <img src="./svg/math_random_int.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function randomIntegerFromTo(FROM: number | null, TO: number | null): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

text


  <img src="./svg/text.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function text(TEXT: string): string;
```


</td>
<td>


```typescript
'Hello';
"World";
// or any text
```


</td>

<tr>
<td><p>

text_join


  <img src="./svg/text_join.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function createTextWith(...args: any[]): string;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

text_length


  <img src="./svg/text_length.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function lengthOf(VALUE: string | null): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

text_indexOf


  <img src="./svg/text_indexOf.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function inText(
  VALUE: string | null,
  END: "FIRST" | "LAST",
  FIND: string | null,
): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

text_charAt


  <img src="./svg/text_charAt.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function textCharAt(
  VALUE: string | null,
  WHERE: "FROM_START" | "FROM_END" | "FIRST" | "LAST" | "RANDOM",
  AT: number | null,
): string;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

text_getSubstring


  <img src="./svg/text_getSubstring.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function inTextGetSubstringFromTo(
  STRING: string | null,
  WHERE1: "FROM_START" | "FROM_END" | "FIRST",
  AT1: number | null,
  WHERE2: "FROM_START" | "FROM_END" | "LAST",
  AT2: number | null,
): string;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

variables_get


  <img src="./svg/variables_get.svg" width="500" alt="css-in-readme">

</p></td>
<td>
no function
</td>
<td>


```typescript
x // just use the variable name
```


</td>

<tr>
<td><p>

variables_set


  <img src="./svg/variables_set.svg" width="500" alt="css-in-readme">

</p></td>
<td>
no function
</td>
<td>


```typescript
let x = ...;
var x = ...;
const x = ...;
x = ...;
```


</td>

<tr>
<td><p>

message_broadcaster


  <img src="./svg/message_broadcaster.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function broadcastMessageOnChannel(
  broadcast_message_on_channel: string | null,
): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

set_property


  <img src="./svg/set_property.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function setPropertyValue(
  set_property: string | null,
  value: string | number | boolean | null,
): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

get_property


  <img src="./svg/get_property.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function getProperty(get_property: string | null): string | number | boolean;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

current_character_name


  <img src="./svg/current_character_name.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function triggeringPlayersName(): string;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

add_activity_feed_item_for_everyone


  <img src="./svg/add_activity_feed_item_for_everyone.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function addActivityFeedItemForEveryone(
  add_activity_feed_item_for_everyone: string | null,
): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

add_activity_feed_item_for_triggering_player


  <img src="./svg/add_activity_feed_item_for_triggering_player.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function addActivityFeedItemForTriggeringPlayer(
  add_activity_feed_item_for_triggering_player: string | null,
): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

add_activity_feed_item_for_game_host


  <img src="./svg/add_activity_feed_item_for_game_host.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function addActivityFeedItemForGameHost(
  add_activity_feed_item_for_game_host: string | null,
): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

current_character_team_number


  <img src="./svg/current_character_team_number.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function triggeringPlayersTeamNumber(): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

triggering_player_score


  <img src="./svg/triggering_player_score.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function triggeringPlayersScore(): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

get_team_score


  <img src="./svg/get_team_score.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function getScoreOfTeam(get_score_of_team: number | null): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

is_a_live_game


  <img src="./svg/is_a_live_game.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function isALiveGame(): boolean;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

is_an_assignment


  <img src="./svg/is_an_assignment.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function isAnAssignment(): boolean;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

seconds_into_game


  <img src="./svg/seconds_into_game.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function secondsIntoGame(): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

set_assignment_objective


  <img src="./svg/set_assignment_objective.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function setObjectiveTo(set_objective_to: string | null): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

set_percentage_complete


  <img src="./svg/set_percentage_complete.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function setPercentageCompleteTo(
  set_percentage_complete_to: number | null,
): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

increment_percentage_complete


  <img src="./svg/increment_percentage_complete.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function incrementPercentageCompleteBy(
  increment_percentage_complete_by: number | null,
): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

send_custom_notification


  <img src="./svg/send_custom_notification.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function sendNotificationTitleContent(
  title: string | null,
  content: string | null,
): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

other_character_name


  <img src="./svg/other_character_name.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function otherPlayersName(): string;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

other_character_team_number


  <img src="./svg/other_character_team_number.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function otherPlayersTeamNumber(): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

other_character_get_property


  <img src="./svg/other_character_get_property.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function getPropertyAsOtherPlayer(
  get_property_as_other_player: string | null,
): string | number | boolean;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

other_character_set_property


  <img src="./svg/other_character_set_property.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function setPropertyAsOtherPlayerValue(
  set_property_as_other_player: string | null,
  value: string | number | boolean | null,
): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

other_character_message_broadcaster


  <img src="./svg/other_character_message_broadcaster.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function broadcastMessageAsOtherPlayerOnChannel(
  broadcast_message_as_other_player_on_channel: string | null,
): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

grant


  <img src="./svg/grant.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function grantPlayerSelectedItem(): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

grant_custom


  <img src="./svg/grant_custom.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function grantPlayerSelectedItemCustomAmountAmount(amount: number | null): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

set_billboard_text


  <img src="./svg/set_billboard_text.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function setText(set_text: string | null): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

set_text_color


  <img src="./svg/set_text_color.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function setTextColorTo(set_text_color_to: Color): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

set_image


  <img src="./svg/set_image.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function setImageUrl(set_image_url: string | null): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

set_frame_color


  <img src="./svg/set_frame_color.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function setFrameColorTo(set_frame_color_to: Color): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

question_answering_streak


  <img src="./svg/question_answering_streak.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function questionsAnsweredCorrectlyInARow(): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

message_correct_answer


  <img src="./svg/message_correct_answer.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function setMessageShownWhenPlayerAnswersCorrectly(
  set_message_shown_when_player_answers_correctly: string | null,
): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

message_incorrect_answer


  <img src="./svg/message_incorrect_answer.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function setMessageShownWhenPlayerAnswersIncorrectly(
  set_message_shown_when_player_answers_incorrectly: string | null,
): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

set_header


  <img src="./svg/set_header.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function setHeader(set_header: string | null): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

set_content


  <img src="./svg/set_content.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function setContent(set_content: string | null): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

get_amount


  <img src="./svg/get_amount.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function getAmountOfCurrentItem(): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

set_gui_text


  <img src="./svg/set_gui_text.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function setGuiText(set_text: string | null): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

get_minutes


  <img src="./svg/get_minutes.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function getMinutes(): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

get_seconds


  <img src="./svg/get_seconds.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function getSeconds(): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

get_time_left_formatted


  <img src="./svg/get_time_left_formatted.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function getTimeLeftFormatted(): string;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

get_player_count


  <img src="./svg/get_player_count.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function numberOfPlayersOnTeam(): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

knockout_manager_other_character_name


  <img src="./svg/knockout_manager_other_character_name.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function knockedPlayersName(): string;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

knockout_manager_other_character_team_number


  <img src="./svg/knockout_manager_other_character_team_number.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function knockedPlayersTeamNumber(): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

knockout_manager_other_character_get_property


  <img src="./svg/knockout_manager_other_character_get_property.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function getPropertyAsKnockedOutPlayer(
  get_property_as_knocked_out_player: string | null,
): string | number | boolean;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

knockout_manager_other_character_set_property


  <img src="./svg/knockout_manager_other_character_set_property.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function setPropertyAsKnockedOutPlayerValue(
  set_property_as_knocked_out_player: string | null,
  value: string | number | boolean | null,
): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

knockout_manager_other_character_message_broadcaster


  <img src="./svg/knockout_manager_other_character_message_broadcaster.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function broadcastMessageAsKnockedOutPlayerOnChannel(
  broadcast_message_as_knocked_out_player_on_channel: string | null,
): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

tag_zone_other_character_name


  <img src="./svg/tag_zone_other_character_name.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function tagZoneOtherCharacterName(): string;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

tag_zone_other_character_team_number


  <img src="./svg/tag_zone_other_character_team_number.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function tagZoneOtherCharacterTeamNumber(): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

player_position_detector_player_x_position


  <img src="./svg/player_position_detector_player_x_position.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function playersXPosition(): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

player_position_detector_player_y_position


  <img src="./svg/player_position_detector_player_y_position.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function playersYPosition(): number;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

damage_custom


  <img src="./svg/damage_custom.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function damagePlayerCustomAmountAmount(amount: number | null): void;
```


</td>
<td>
no sugar
</td>

<tr>
<td><p>

number_with_commas


  <img src="./svg/number_with_commas.svg" width="500" alt="css-in-readme">

</p></td>
<td>


```typescript
function convertNumberToTextWithCommas(
  convert_number_to_text_with_commas: number | null,
): string;
```


</td>
<td>
no sugar
</td>

</table>
