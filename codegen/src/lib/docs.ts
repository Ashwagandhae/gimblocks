import {
  Argument,
  BlockDefinition,
  BlockDefinitions,
} from '../../../schema/blockDefinitions';
import { generateFunction, generateFunctionNameMap, getEn } from './function';
import { writeFileSync } from 'fs';
import * as prettier from 'prettier';

const STYLES = `
<style>
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
    font-family: sans-serif;
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
</style>`;

export async function generate(defs: BlockDefinitions): Promise<string> {
  let map = generateFunctionNameMap(defs);
  // reverese the map
  let reverseMap: Record<string, string> = {};
  for (let key in map) {
    reverseMap[map[key]!] = key;
  }
  let out = `
# Block to JavaScript code conversion table

## Guide

**Block Type & Example**: The built-in type field of the block, and a visual representation of the block.

**JavaScript Function**: The JavaScript function that converts to the block. 
  - The function name is created using a simple algorithm:
      - If there's text written on the block, punctuation is removed and the text is converted to camelCase to make the function name.
      - If there's no text written on the block or there's a name collision, the function name is the block type converted to camelCase.
  - Doesn't exist for some blocks where it's not possible (for example \`if\`)—see the Sugar column in that case. 

  
**Sugar**: The shorthand syntax for the block, if it exists.
  - Should intuitively map JavaScript features to blocks. For example, \`if { ... }\` maps to an \`if\` block.

## Table

<table>
  <tr>
    <th>Block Type & Example_________________________________________________________</th>
    <th>JavaScript Function</th>
    <th>Sugar</th>
  </tr>
`;

  for (let def of defs) {
    let functionString = await generateRow(def, reverseMap);
    out += functionString;
  }

  out += `
</table>
`;

  return out;
}

function styleToHue(style: string): number {
  switch (style) {
    case 'logic_blocks':
      return 210;
    case 'math_blocks':
      return 230;
    case 'text_blocks':
      return 161;
    case 'variable_blocks':
      return 329;
    default:
      return 0;
  }
}

function encloseInTypescriptOrEmpty(
  string: string | null | undefined,
  empty: string
): string {
  if (string == null) {
    return empty;
  }
  return `

\`\`\`typescript
${string}
\`\`\`

`;
}

async function generateRow(
  def: BlockDefinition,
  functionNameMap: Record<string, string>
): Promise<string> {
  let blockString = generateBlockHtml(def);
  let unformattedFunctionString = generateFunction(
    def,
    functionNameMap,
    'docs'
  );
  let functionString = encloseInTypescriptOrEmpty(
    unformattedFunctionString == null
      ? null
      : (
          await prettier.format(unformattedFunctionString, {
            parser: 'typescript',
          })
        ).trim(),
    'no function'
  );
  let sugarString = encloseInTypescriptOrEmpty(def.$codegenSugar, 'no sugar');

  let out = `
<tr>
<td><p>

${def.type}

${blockString}
</p></td>
<td>
${functionString}
</td>
<td>
${sugarString}
</td>
`;
  return out;
}

function wrapInSvg(html: string, name: string): string {
  let out = `
  <svg fill="none" viewBox="0 0 500 40" width="500" height="40" xmlns="http://www.w3.org/2000/svg">
    <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">`;
  out += html;
  out += STYLES;
  out += `
        </div>
    </foreignObject>
  </svg>
  `;
  writeFileSync(`./docs/svg/${name}.svg`, out);
  return `
  <img src="./svg/${name}.svg" width="500" alt="css-in-readme">
`;
}

function generateBlockHtml(def: BlockDefinition): string {
  let out = `
  <div class="block"`;
  out += ` style="--block-hue: ${def.colour ?? styleToHue(def.style ?? '')}"`;
  out += `>`;
  out += generateBlockMessage(def);

  out += `</div>`;
  return wrapInSvg(out, def.type);
}

function generateBlockMessage(def: BlockDefinition): string {
  let out = getEn(def.message0);
  if (def.args0 == null) return out;
  for (let i = 0; i < def.args0.length; i++) {
    let num = i + 1;
    // TODO make this safer
    if (out.includes(`%${num}`)) {
      out = out.replace(`%${num}`, generateArgHtml(def.args0[i]!));
    }
  }
  return out;
}

function generateArgHtml(arg: Argument): string {
  switch (arg.type) {
    case 'input_value':
      return `<span class="hole"></span>`;
    case 'input_dummy':
      return '';
    case 'input_statement':
      return `<span class="hole"></span>`;
    case 'field_colour':
      return `<span class="field color"></span>`;
    case 'field_dropdown':
      let optString = arg.options[0]![0];
      return `<span class="field">${getEn(optString)}</span>`;
    case 'field_number':
      return `<span class="field">0</span>`;
    case 'field_variable':
      return `<span class="field">x</span>`;
    case 'field_input':
      return `<span class="field">text</span>`;
    default:
      throw new Error(`Unknown arg type: ${arg}`);
  }
}
