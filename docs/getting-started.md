# Getting Started

Note: This guide assumes you have a basic understanding of JavaScript.

gimblocks takes strings of JavaScript code and converts them into JSON representations of Blockly blocks.

```javascript
import { jsToBlocks } from 'gimblocks';
```

The JavaScript must:

- consist of one function
- have one parameter, the device object, which can call functions that convert to blocks[^1]

These requirements can be met easily by wrapping your code in a function that takes a single parameter, and calling `jsToBlocks` on the result of the function's `toString()` method.

Because gimblocks is looking at the JavaScript code as a string, it errors on:

- most user-defined or global functions (with exceptions like `Math` functions, or `console.log` which is ignored)
- global variables
- loops, because gimkit doesn't have loop blocks
- other irrelevant JavaScript features, like `await` or `import`

[^1]:
    gimblocks could have supported _global_ functions that convert to blocks, which would have made code slightly more convenient to write (`broadcastMessageOnChannel` instead of `d.broadcastMessageOnChannel`).
    However, making the functions members of a passed-in device object allows for:

    1. Better typing, because each function can have it's own device object type with access to device-specific functions.
    2. Easier simulation, because you can easily pass in a mock device object.
