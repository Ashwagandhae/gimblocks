# Gimblocks

Converts JavaScript code to Gimkit's Blockly blocks.

## Installation

```bash
npm i github:Ashwagandhae/gimblocks
```

## Example

### Untyped

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

Outputs JSON representation of Blockly blocks, which can be injected into Gimkit's Blockly editor with a tool like.

```json
{
  "blocks": {
    "languageVersion": 0,
    "blocks": [
      {
        "id": "ks\\Jl7h:chke6w7Sv(Ro",
        "type": "variables_set",
        "fields": {
          "VAR": { "id": "7sJ6LY%4:t1at<7Hu;C*" }
        },
        "inputs": {
          "VALUE": {
            "block": {
              "id": "wMt3Zu#vP#&XlHN#U5X%",
              "type": "math_number",
              "fields": { "NUM": 0 }
            }
          }
        },
        "next": { ... }
      },
    ],
  },
}

```
