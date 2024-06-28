
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

  <div class="block" style="--block-hue: 210"><span class="field">true</span></div>
</p></td>
<td>


```typescript
function logicBoolean(BOOL: 'TRUE' | 'FALSE'): boolean;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>controls_if</td>
<td><p>

  <div class="block" style="--block-hue: 210">if <span class="hole"></span></div>
</p></td>
<td>

</td>
<td>


```typescript
if { ... } else { ... }
```


</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>logic_compare</td>
<td><p>

  <div class="block" style="--block-hue: 210"><span class="hole"></span> <span class="field">=</span> <span class="hole"></span></div>
</p></td>
<td>


```typescript
function logicCompare(A: any, OP: 'EQ' | 'NEQ' | 'LT' | 'LTE' | 'GT' | 'GTE', B: any): boolean;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>logic_operation</td>
<td><p>

  <div class="block" style="--block-hue: 210"><span class="hole"></span> <span class="field">and</span> <span class="hole"></span></div>
</p></td>
<td>


```typescript
function logicOperation(A: boolean, OP: 'AND' | 'OR', B: boolean): boolean;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>math_number</td>
<td><p>

  <div class="block" style="--block-hue: 230"><span class="field">0</span></div>
</p></td>
<td>


```typescript
function mathNumber(NUM: number): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>math_arithmetic</td>
<td><p>

  <div class="block" style="--block-hue: 230"><span class="hole"></span> <span class="field">+</span> <span class="hole"></span></div>
</p></td>
<td>


```typescript
function mathArithmetic(A: number, OP: 'ADD' | 'MINUS' | 'MULTIPLY' | 'DIVIDE' | 'POWER', B: number): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>math_single</td>
<td><p>

  <div class="block" style="--block-hue: 230"><span class="field">square root</span> <span class="hole"></span></div>
</p></td>
<td>


```typescript
function mathSingle(OP: 'ROOT' | 'ABS' | 'NEG' | 'LN' | 'LOG10' | 'EXP' | 'POW10', NUM: number): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>math_trig</td>
<td><p>

  <div class="block" style="--block-hue: 230"><span class="field">sin</span> <span class="hole"></span></div>
</p></td>
<td>


```typescript
function mathTrig(OP: 'SIN' | 'COS' | 'TAN' | 'ASIN' | 'ACOS' | 'ATAN', NUM: number): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>math_number_property</td>
<td><p>

  <div class="block" style="--block-hue: 230"><span class="hole"></span> <span class="field">is even</span></div>
</p></td>
<td>


```typescript
function mathNumberProperty(NUMBER_TO_CHECK: number, PROPERTY: 'EVEN' | 'ODD' | 'PRIME' | 'WHOLE' | 'POSITIVE' | 'NEGATIVE' | 'DIVISIBLE_BY'): boolean;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>math_change</td>
<td><p>

  <div class="block" style="--block-hue: 329">change <span class="field">x</span> by <span class="hole"></span></div>
</p></td>
<td>

</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>math_round</td>
<td><p>

  <div class="block" style="--block-hue: 230"><span class="field">round</span> <span class="hole"></span></div>
</p></td>
<td>


```typescript
function mathRound(OP: 'ROUND' | 'ROUNDUP' | 'ROUNDDOWN', NUM: number): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>math_random_int</td>
<td><p>

  <div class="block" style="--block-hue: 230">random integer from <span class="hole"></span> to <span class="hole"></span></div>
</p></td>
<td>


```typescript
function randomIntegerFromTo(FROM: number, TO: number): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>text</td>
<td><p>

  <div class="block" style="--block-hue: 161"><span class="field">text</span></div>
</p></td>
<td>


```typescript
function text(TEXT: string): string;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>text_join</td>
<td><p>

  <div class="block" style="--block-hue: 161">create text with</div>
</p></td>
<td>

</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>text_length</td>
<td><p>

  <div class="block" style="--block-hue: 161">length of <span class="hole"></span></div>
</p></td>
<td>


```typescript
function lengthOf(VALUE: string): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>text_indexOf</td>
<td><p>

  <div class="block" style="--block-hue: 161">in text <span class="hole"></span> <span class="field">find first occurrence of text</span> <span class="hole"></span></div>
</p></td>
<td>


```typescript
function inText(VALUE: string, END: 'FIRST' | 'LAST', FIND: string): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>text_charAt</td>
<td><p>

  <div class="block" style="--block-hue: 161">in text <span class="hole"></span> <span class="field">get letter #</span></div>
</p></td>
<td>

</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>text_getSubstring</td>
<td><p>

  <div class="block" style="--block-hue: 161">in text <span class="hole"></span> get substring from <span class="field">get substring from letter #</span> <span class="hole"></span> to <span class="field">to letter #</span> <span class="hole"></span></div>
</p></td>
<td>


```typescript
function inTextGetSubstringFromTo(STRING: string, WHERE1: 'FROM_START' | 'FROM_END' | 'FIRST', AT1: number, WHERE2: 'FROM_START' | 'FROM_END' | 'LAST', AT2: number): string;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>variables_get</td>
<td><p>

  <div class="block" style="--block-hue: 329"><span class="field">x</span></div>
</p></td>
<td>

</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>variables_set</td>
<td><p>

  <div class="block" style="--block-hue: 329">set <span class="field">x</span> to <span class="hole"></span></div>
</p></td>
<td>

</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>message_broadcaster</td>
<td><p>

  <div class="block" style="--block-hue: 230">Broadcast Message On Channel <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function broadcastMessageOnChannel(broadcast_message_on_channel: string): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>set_property</td>
<td><p>

  <div class="block" style="--block-hue: 230">Set Property <span class="hole"></span> Value <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function setPropertyValue(set_property: string, value: string | number | boolean): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>get_property</td>
<td><p>

  <div class="block" style="--block-hue: 230">Get Property <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function getProperty(get_property: string): string | number | boolean;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>current_character_name</td>
<td><p>

  <div class="block" style="--block-hue: 230">Triggering Player's Name</div>
</p></td>
<td>


```typescript
function triggeringPlayersName(): string;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>add_activity_feed_item_for_everyone</td>
<td><p>

  <div class="block" style="--block-hue: 230">Add Activity Feed Item For Everyone <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function addActivityFeedItemForEveryone(add_activity_feed_item_for_everyone: string): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>add_activity_feed_item_for_triggering_player</td>
<td><p>

  <div class="block" style="--block-hue: 230">Add Activity Feed Item For Triggering Player <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function addActivityFeedItemForTriggeringPlayer(add_activity_feed_item_for_triggering_player: string): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>add_activity_feed_item_for_game_host</td>
<td><p>

  <div class="block" style="--block-hue: 230">Add Activity Feed Item For Game Host <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function addActivityFeedItemForGameHost(add_activity_feed_item_for_game_host: string): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>current_character_team_number</td>
<td><p>

  <div class="block" style="--block-hue: 230">Triggering Player's Team Number</div>
</p></td>
<td>


```typescript
function triggeringPlayersTeamNumber(): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>triggering_player_score</td>
<td><p>

  <div class="block" style="--block-hue: 230">Triggering Player's Score</div>
</p></td>
<td>


```typescript
function triggeringPlayersScore(): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>get_team_score</td>
<td><p>

  <div class="block" style="--block-hue: 230">Get Score Of Team <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function getScoreOfTeam(get_score_of_team: number): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>is_a_live_game</td>
<td><p>

  <div class="block" style="--block-hue: 230">Is A Live Game</div>
</p></td>
<td>


```typescript
function isALiveGame(): boolean;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>is_an_assignment</td>
<td><p>

  <div class="block" style="--block-hue: 230">Is An Assignment</div>
</p></td>
<td>


```typescript
function isAnAssignment(): boolean;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>seconds_into_game</td>
<td><p>

  <div class="block" style="--block-hue: 230">Seconds Into Game</div>
</p></td>
<td>


```typescript
function secondsIntoGame(): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>set_assignment_objective</td>
<td><p>

  <div class="block" style="--block-hue: 230">Set Objective To <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function setObjectiveTo(set_objective_to: string): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>set_percentage_complete</td>
<td><p>

  <div class="block" style="--block-hue: 230">Set Percentage Complete To <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function setPercentageCompleteTo(set_percentage_complete_to: number): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>increment_percentage_complete</td>
<td><p>

  <div class="block" style="--block-hue: 230">Increment Percentage Complete By <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function incrementPercentageCompleteBy(increment_percentage_complete_by: number): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>send_custom_notification</td>
<td><p>

  <div class="block" style="--block-hue: 230">Send Notification <br> Title <span class="hole"></span> Content <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function sendNotificationTitleContent(title: string, content: string): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>other_character_name</td>
<td><p>

  <div class="block" style="--block-hue: 230">Other Player's Name</div>
</p></td>
<td>


```typescript
function otherPlayersName(): string;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>other_character_team_number</td>
<td><p>

  <div class="block" style="--block-hue: 230">Other Player's Team Number</div>
</p></td>
<td>


```typescript
function otherPlayersTeamNumber(): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>other_character_get_property</td>
<td><p>

  <div class="block" style="--block-hue: 230">Get Property As Other Player <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function getPropertyAsOtherPlayer(get_property_as_other_player: string): string | number | boolean;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>other_character_set_property</td>
<td><p>

  <div class="block" style="--block-hue: 230">Set Property (As Other Player) <span class="hole"></span> Value <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function setPropertyAsOtherPlayerValue(set_property_as_other_player: string, value: string | number | boolean): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>other_character_message_broadcaster</td>
<td><p>

  <div class="block" style="--block-hue: 230">Broadcast Message (As Other Player) On Channel <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function broadcastMessageAsOtherPlayerOnChannel(broadcast_message_as_other_player_on_channel: string): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>grant</td>
<td><p>

  <div class="block" style="--block-hue: 230">Grant Player Selected Item</div>
</p></td>
<td>


```typescript
function grantPlayerSelectedItem(): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>grant_custom</td>
<td><p>

  <div class="block" style="--block-hue: 230">Grant Player Selected Item (Custom Amount) <br> Amount <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function grantPlayerSelectedItemCustomAmountAmount(amount: number): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>set_billboard_text</td>
<td><p>

  <div class="block" style="--block-hue: 230">Set Text <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function setText(set_text: string): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>set_text_color</td>
<td><p>

  <div class="block" style="--block-hue: 230">Set Text Color To <span class="field color"></span> </div>
</p></td>
<td>


```typescript
function setTextColorTo(set_text_color_to: Color): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>set_image</td>
<td><p>

  <div class="block" style="--block-hue: 230">Set Image URL <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function setImageUrl(set_image_url: string): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>set_frame_color</td>
<td><p>

  <div class="block" style="--block-hue: 230">Set Frame Color To <span class="field color"></span> </div>
</p></td>
<td>


```typescript
function setFrameColorTo(set_frame_color_to: Color): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>question_answering_streak</td>
<td><p>

  <div class="block" style="--block-hue: 230">Questions Answered Correctly In A Row</div>
</p></td>
<td>


```typescript
function questionsAnsweredCorrectlyInARow(): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>message_correct_answer</td>
<td><p>

  <div class="block" style="--block-hue: 230">Set Message Shown When Player Answers Correctly <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function setMessageShownWhenPlayerAnswersCorrectly(set_message_shown_when_player_answers_correctly: string): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>message_incorrect_answer</td>
<td><p>

  <div class="block" style="--block-hue: 230">Set Message Shown When Player Answers Incorrectly <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function setMessageShownWhenPlayerAnswersIncorrectly(set_message_shown_when_player_answers_incorrectly: string): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>set_header</td>
<td><p>

  <div class="block" style="--block-hue: 230">Set Header <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function setHeader(set_header: string): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>set_content</td>
<td><p>

  <div class="block" style="--block-hue: 230">Set Content <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function setContent(set_content: string): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>get_amount</td>
<td><p>

  <div class="block" style="--block-hue: 230">Get Amount Of Current Item <br> </div>
</p></td>
<td>


```typescript
function getAmountOfCurrentItem(): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>set_gui_text</td>
<td><p>

  <div class="block" style="--block-hue: 230">Set Text <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function setGuiText(set_text: string): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>get_minutes</td>
<td><p>

  <div class="block" style="--block-hue: 230">Get Minutes <br> </div>
</p></td>
<td>


```typescript
function getMinutes(): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>get_seconds</td>
<td><p>

  <div class="block" style="--block-hue: 230">Get Seconds <br> </div>
</p></td>
<td>


```typescript
function getSeconds(): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>get_time_left_formatted</td>
<td><p>

  <div class="block" style="--block-hue: 230">Get Time Left Formatted <br> </div>
</p></td>
<td>


```typescript
function getTimeLeftFormatted(): string;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>get_player_count</td>
<td><p>

  <div class="block" style="--block-hue: 230">Number Of Players On Team <br> </div>
</p></td>
<td>


```typescript
function numberOfPlayersOnTeam(): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>knockout_manager_other_character_name</td>
<td><p>

  <div class="block" style="--block-hue: 230">Knocked Player's Name</div>
</p></td>
<td>


```typescript
function knockedPlayersName(): string;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>knockout_manager_other_character_team_number</td>
<td><p>

  <div class="block" style="--block-hue: 230">Knocked Player's Team Number</div>
</p></td>
<td>


```typescript
function knockedPlayersTeamNumber(): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>knockout_manager_other_character_get_property</td>
<td><p>

  <div class="block" style="--block-hue: 230">Get Property As Knocked Out Player <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function getPropertyAsKnockedOutPlayer(get_property_as_knocked_out_player: string): string | number | boolean;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>knockout_manager_other_character_set_property</td>
<td><p>

  <div class="block" style="--block-hue: 230">Set Property (As Knocked Out Player) <span class="hole"></span> Value <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function setPropertyAsKnockedOutPlayerValue(set_property_as_knocked_out_player: string, value: string | number | boolean): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>knockout_manager_other_character_message_broadcaster</td>
<td><p>

  <div class="block" style="--block-hue: 230">Broadcast Message (As Knocked Out Player) On Channel <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function broadcastMessageAsKnockedOutPlayerOnChannel(broadcast_message_as_knocked_out_player_on_channel: string): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>tag_zone_other_character_name</td>
<td><p>

  <div class="block" style="--block-hue: 230">Other Player's Name</div>
</p></td>
<td>


```typescript
function tagZoneOtherCharacterName(): string;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>tag_zone_other_character_team_number</td>
<td><p>

  <div class="block" style="--block-hue: 230">Other Player's Team Number</div>
</p></td>
<td>


```typescript
function tagZoneOtherCharacterTeamNumber(): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>player_position_detector_player_x_position</td>
<td><p>

  <div class="block" style="--block-hue: 230">Player's X Position <br> </div>
</p></td>
<td>


```typescript
function playersXPosition(): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>player_position_detector_player_y_position</td>
<td><p>

  <div class="block" style="--block-hue: 230">Player's Y Position <br> </div>
</p></td>
<td>


```typescript
function playersYPosition(): number;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>damage_custom</td>
<td><p>

  <div class="block" style="--block-hue: 230">Damage Player (Custom Amount) <br> Amount <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function damagePlayerCustomAmountAmount(amount: number): void;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

<tr>
<td>number_with_commas</td>
<td><p>

  <div class="block" style="--block-hue: 159.7">Convert Number To Text (With Commas) <span class="hole"></span> </div>
</p></td>
<td>


```typescript
function convertNumberToTextWithCommas(convert_number_to_text_with_commas: number): string;
```


</td>
<td>

</td>

<style>
  table {
    width: 100%;
    --block-hue: 0;
  }

  .block {
    font-size: 14px;
    padding: 4px;
    white-space: nowrap;
    color: white;
    width: min-content;
    background: hsl(var(--block-hue), 30%, 50%);
    border-top: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-left: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-bottom: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-right: 1px solid hsl(var(--block-hue), 29%, 42%);
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }
  .text {
    white-space: pre-wrap;
  }
  .field {
    color: black;
    background: hsl(var(--block-hue), 29%, 81%);
    font-size: 12px;
    border-radius: 4px;
    padding: 0 4px;
  }
  .field.color {
    background: red;
    width: 18px;
    height: 18px;
  }
  .hole {
    border-bottom: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-right: 1px solid hsl(var(--block-hue), 34%, 68%);
    border-top: 1px solid hsl(var(--block-hue), 29%, 42%);
    border-left: 1px solid hsl(var(--block-hue), 29%, 42%);
    background: black;
    height: 18px;
    width: 18px;
  }

  td {
    vertical-align: top; 
  }
</style>

</table>
