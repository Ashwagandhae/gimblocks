# Block to JavaScript code conversion table

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

<table>
  <tr>
    <th>Block</th>
    <th>JavaScript Function</th>
    <th>Sugar</th>
  </tr>

<tr>
<td><p>

<div class="block" style="--block-hue: 230">skibidi <span class="field">hi</span> <div class="hole"></div></div>
    
</p></td>
<td>

```typescript
function textSkibidi(hi: number): any;
```

</td>
<td>

```typescript
Math.skibidi(hi);
// etc.
```

</td>
  
</table>
