# Gimblocks

Converts JavaScript code to Gimkit's Blockly blocks.

## Installation

```bash
npm i github:Ashwagandhae/gimblocks
```

## Example

```javascript
import { jsToBlocks } from 'gimblocks';

function run(d) {
  let a = 0;
  let b = 1;
  if (a + b == 1) {
    d.broadcastMessageOnChannel('hello');
  } else {
    d.setPropertyValue('x', 0);
  }
}
let blocks = jsToBlocks(code.toString());
```
