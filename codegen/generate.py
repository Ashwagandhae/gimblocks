from jsonschema import validate
import json

schema = None
with open("./codegen/definitions-schema.json") as f:
    schema = json.load(f)

definitions = {}
with open("./codegen/definitions.json") as f:
    definitions = json.load(f)

print("validating block definitions schema")

validate(definitions, schema)


print("generating block types")

out = """
import * as Basic from './basic';
"""


def generate_type_name(name: str) -> str:
    return name.title().replace("_", "") + "Block"


def field_type_name_to_type(field_type: str | list[str]) -> str:
    # check if it's a list
    if isinstance(field_type, list):
        return " | ".join([f'"{t}"' for t in field_type])
    elif field_type == "number":
        return "number"
    elif field_type == "string":
        return "string"
    elif field_type == "boolean":
        return "boolean"
    elif field_type == "id":
        return "{ id: Basic.Id }"
    else:
        raise ValueError(f"Unknown field type: {field_type}")


def generate_fields_type(fields: dict[str, str]) -> str:
    out = "{"
    for field_name, field_type in fields.items():
        out += f"{field_name}?: {field_type_name_to_type(field_type)};"
    out += "}"
    return out


def generate_inputs_type(inputs: dict[str, str]) -> str:
    out = "{"
    for input_name, attach in inputs.items():
        out += f"{input_name}?: {'{'} block: {attach_to_attach_type(attach)} | ExpressionUnknownBlock {'}'};"
    out += "}"
    return out


def attach_to_attach_type(attach: str) -> str:
    if attach == "expressionNumber":
        return "ExpressionNumberBlock"
    elif attach == "expressionString":
        return "ExpressionStringBlock"
    elif attach == "expressionBoolean":
        return "ExpressionBooleanBlock"
    elif attach == "expressionAny":
        return "ExpressionBlock"
    elif attach == "expressionUnknown":
        return "ExpressionUnknownBlock"
    elif attach == "statement":
        return "StatementBlock"
    else:
        raise ValueError(f"Unknown attach type: {attach}")


def attach_to_ts_type(input: str) -> str:
    if input == "expressionNumber":
        return "number"
    elif input == "expressionString":
        return "string"
    elif input == "expressionBoolean":
        return "boolean"
    elif input == "expressionAny":
        return "number | string | boolean"
    elif input == "expressionUnknown":
        return "number | string | boolean"
    elif input == "statement":
        return "void"
    else:
        raise ValueError(f"Unknown attach type: {attach}")


block_types = []
block_types_by_attach: dict[str, list[str]] = {
    "expressionNumber": [],
    "expressionString": [],
    "expressionBoolean": [],
    "expressionUnknown": [],
    "statement": [],
}
for name, val in definitions.items():
    type_name = generate_type_name(name)

    block_types.append(type_name)
    block_types_by_attach[val["attach"]].append(type_name)

    out += f"export type {type_name} = {'{'}"
    out += """
x?: number;
y?: number;
id: Basic.Id;"""
    out += f"type: '{name}';\n"

    if val["attach"] == "statement":
        out += "next?: { block: StatementBlock };\n"

    if "fields" in val:
        out += f"fields: {generate_fields_type(val['fields'])};\n"
    elif "customFieldsType" in val:
        out += f"fields: {val['customFieldsType']};\n"

    if "inputs" in val:
        out += f"inputs: {generate_inputs_type(val['inputs'])};\n"
    elif "customInputsType" in val:
        out += f"inputs: {val['customInputsType']};\n"

    if "intersectWith" in val:
        out += "} & " + val["intersectWith"] + ";\n"
    else:
        out += "};\n"


out += f"""
export type Block = {' | '.join(block_types)};"""
out += ";\n"
for attach_type, block_types in block_types_by_attach.items():
    attach_type_val = None
    if len(block_types) > 0:
        attach_type_val = " | ".join(block_types)
    else:
        attach_type_val = "never"
    out += f"""
export type {attach_to_attach_type(attach_type)} = {attach_type_val};"""

out += """
export type ExpressionBlock = ExpressionNumberBlock | ExpressionStringBlock | ExpressionBooleanBlock | ExpressionUnknownBlock;
"""

out += f"""
export const blockDefinitions = {json.dumps(definitions)} as const;
"""

for attach in [
    "expressionNumber",
    "expressionString",
    "expressionBoolean",
    "expressionUnknown",
    "statement",
]:
    out += (
        f"""
export function is{attach[0].upper() + attach[1:]}(block: Block): block is {attach_to_attach_type(attach)}"""
        + " {\n"
    )
    out += f"return '{attach}' === blockDefinitions[block.type].attach;\n"
    out += "}\n"

for attach in ["expressionNumber", "expressionString", "expressionBoolean"]:
    out += f"""
export function is{attach[0].upper() + attach[1:]}OrUnknown(block: Block): block is {attach_to_attach_type(attach)} | ExpressionUnknownBlock"""
    out += " {\n"
    out += f"return '{attach}' === blockDefinitions[block.type].attach || 'expressionUnknown' === blockDefinitions[block.type].attach;\n"
    out += "}\n"

out += """
export function isExpression(block: Block): block is ExpressionBlock {
    return ['expressionNumber', 'expressionString', 'expressionBoolean', 'expressionUnknown'].includes(blockDefinitions[block.type].attach);
}
"""


with open("./src/lib/blocks/generated.ts", "w") as f:
    f.write(out)


def generate_device_function_types(_global: bool) -> str:
    out = ""
    if _global:
        out += """
        export {};
        declare global {
        """
    else:
        out += """
        export type Trigger = {
        """
    for _, val in definitions.items():
        if "function" not in val:
            continue
        function_name = val["function"]
        inputs = val.get("inputs", {})
        fields = val.get("fields", {})
        if _global:
            out += f"""
            function {function_name}("""
        else:
            out += f"""
            {function_name}: ("""
        for field_name, field_type in fields.items():
            out += f"{field_name}: {field_type_name_to_type(field_type)}, "
        for input_name, attach in inputs.items():
            out += f"{input_name}: {attach_to_ts_type(attach)}, "

        if _global:
            out += f"): {attach_to_ts_type(val['attach'])};"
        else:
            out += f") => {attach_to_ts_type(val['attach'])};"
    out += """
    }
    """

    return out


print("generating device types")
with open("./src/lib/device/generated.ts", "w") as f:
    f.write(generate_device_function_types(False))

print("done")
