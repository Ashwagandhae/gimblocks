# Getting Started

Note: This guide assumes you have a basic understanding of JavaScript.

gimblocks takes strings of JavaScript code and converts them into JSON representations of Blockly blocks. If you're using BlockConverter, gimblocks is built-in—you can just type JavaScript into the editor and convert it.

```javascript
import { jsToBlocks } from 'gimblocks';

jsToBlocks(`function run(d) {
  let a = 0;
  let b = d.getProperty('x');
  console.log('debugging log'); // This will be ignored
  if (d.mathTrig('SIN', b) > 0 && a == 0) {
    a = 1 + 1 + 3 * 4.4;
  } else {
    d.broadcastMessageOnChannel('channel');
  }
  d.setPropertyValue('x', d.convertNumberToTextWithCommas(a));
}`);
```

The JavaScript must:

- consist of one function
- have one parameter, the device object, which can call functions that convert to blocks[^1]

```javascript
// good
function run(d) {
  d.broadcastMessageOnChannel('hello');
}

// bad
broadcastMessageOnChannel('hello');

// bad
function run() {
  broadcastMessageOnChannel('hello');
}

// bad
function run(d, e) {
  d.broadcastMessageOnChannel('hello');
}
```

These requirements can be met easily by wrapping your code in a function that takes a single parameter, and calling `jsToBlocks` on the result of the function's `toString()` method.

Because gimblocks is looking at the JavaScript code as a string, it errors on:

- most user-defined or global functions (with exceptions like `Math` functions, or `console.log` which is ignored)
- global variables
- loops, because gimkit doesn't have loop blocks
- other irrelevant JavaScript features, like `await` or `import`

Most blocks can be created by calling functions on the device object (the single parameter). You can find the names of these functions in the [functions page](./functions.md).

[^1]:
    gimblocks could have supported _global_ functions that convert to blocks, which would have made code slightly more convenient to write (`broadcastMessageOnChannel` instead of `d.broadcastMessageOnChannel`).
    However, making the functions members of a passed-in device object allows for:

    1. Better typing, because each function can have it's own device object type with access to device-specific functions.
    2. Easier simulation, because you can easily pass in a mock device object.
