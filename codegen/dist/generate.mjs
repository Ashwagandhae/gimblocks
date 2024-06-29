// src/lib/schema.ts
import * as fs from "fs";
import * as crypto from "crypto";
import * as path from "path";
import * as TJS from "typescript-json-schema";
var schemas = [
  {
    name: "blockDefinitions",
    typeTarget: "BlockDefinitions",
    path: path.resolve("./schema/blockDefinitions.ts")
  },
  {
    name: "blockCategories",
    typeTarget: "BlockCategories",
    path: path.resolve("./schema/blockCategories.ts")
  }
];
var hashDir = path.resolve("./schema/hashes");
if (!fs.existsSync(hashDir)) {
  fs.mkdirSync(hashDir);
}
function generateHash(filePath) {
  const fileBuffer = fs.readFileSync(filePath);
  const hashSum = crypto.createHash("sha256");
  hashSum.update(fileBuffer);
  return hashSum.digest("hex");
}
function readStoredHash(hashFilePath) {
  if (!fs.existsSync(hashFilePath)) {
    return null;
  }
  return fs.readFileSync(hashFilePath, "utf-8");
}
function writeHash(hashFilePath, hash) {
  fs.writeFileSync(hashFilePath, hash, "utf-8");
}
function getSchema(filePath) {
  const name = path.basename(filePath).replace(".ts", "");
  const schemaPath = path.resolve(`./schema/${name}.json`);
  if (fs.existsSync(schemaPath)) {
    return JSON.parse(fs.readFileSync(schemaPath, "utf-8"));
  }
  throw new Error(`Schema for ${name} does not exist.`);
}
function generateSchema2(filePath, typeTarget) {
  const program = TJS.getProgramFromFiles([filePath]);
  const schema = TJS.generateSchema(program, typeTarget, {
    noExtraProps: true,
    strictNullChecks: true
  });
  const name = path.basename(filePath).replace(".ts", "");
  fs.writeFileSync(
    path.resolve(`./schema/${name}.json`),
    JSON.stringify(schema, null, 2)
  );
  return schema;
}
function generate() {
  let hasChanges = false;
  for (const { path: tsFilePath, typeTarget } of schemas) {
    const fileName = path.basename(tsFilePath);
    const hashFilePath = path.join(hashDir, `${fileName}.hash`);
    const currentHash = generateHash(tsFilePath);
    const storedHash = readStoredHash(hashFilePath);
    if (currentHash !== storedHash) {
      console.log(`File ${fileName} has changed. Regenerating schema...`);
      generateSchema2(tsFilePath, typeTarget);
      writeHash(hashFilePath, currentHash);
      hasChanges = true;
    } else {
      console.log(
        `File ${fileName} has not changed. No need to regenerate schema.`
      );
    }
  }
}
function get() {
  generate();
  let ret = {};
  for (const { name, path: path2 } of schemas) {
    const schema = getSchema(path2);
    ret[name] = schema;
  }
  return ret;
}

// ../data/worldOptions.json
var codeGrids = {
  blockCategories: '[{"name":"Essentials","color":"#283593","blocks":[{"type":"message_broadcaster"},{"type":"set_property"},{"type":"get_property"},{"type":"current_character_name"},{"type":"add_activity_feed_item_for_everyone"},{"type":"add_activity_feed_item_for_triggering_player"},{"type":"add_activity_feed_item_for_game_host"},{"type":"current_character_team_number"},{"type":"triggering_player_score"},{"type":"get_team_score"},{"type":"is_a_live_game"},{"type":"is_an_assignment"},{"type":"seconds_into_game"}]},{"name":"Logic","color":"#5C81A6","blocks":[{"type":"controls_if"},{"type":"logic_compare"},{"type":"logic_operation"},{"type":"logic_boolean"}]},{"name":"Math","color":"#5CA65C","blocks":[{"type":"math_number"},{"type":"math_arithmetic"},{"type":"math_single"},{"type":"math_trig"},{"type":"math_number_property"},{"type":"math_round"},{"type":"math_random_int"}]},{"name":"Text","color":"#5ba58c","blocks":[{"type":"text"},{"type":"text_join"},{"type":"text_length"},{"type":"number_with_commas"},{"type":"text_getSubstring"},{"type":"text_charAt"},{"type":"text_indexOf"}]},{"name":"Variables","color":"#a55b80","custom":"VARIABLE","blocks":[]}]',
  customBlocks: `[{"type":"message_broadcaster","message0":"Broadcast Message On Channel %1 ","args0":[{"type":"input_value","name":"broadcast_message_on_channel","check":"String","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"set_property","message0":"Set Property %1 Value %2 ","args0":[{"type":"input_value","name":"set_property","check":"String","align":"RIGHT"},{"type":"input_value","name":"value","check":["String","Number","Boolean"],"align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"get_property","message0":"Get Property %1 ","args0":[{"type":"input_value","name":"get_property","check":"String","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","output":["String","Number","Boolean"]},{"type":"current_character_name","message0":"Triggering Player's Name","colour":230,"tooltip":"","helpUrl":"","output":"String"},{"type":"add_activity_feed_item_for_everyone","message0":"Add Activity Feed Item For Everyone %1 ","args0":[{"type":"input_value","name":"add_activity_feed_item_for_everyone","check":"String","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"add_activity_feed_item_for_triggering_player","message0":"Add Activity Feed Item For Triggering Player %1 ","args0":[{"type":"input_value","name":"add_activity_feed_item_for_triggering_player","check":"String","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"add_activity_feed_item_for_game_host","message0":"Add Activity Feed Item For Game Host %1 ","args0":[{"type":"input_value","name":"add_activity_feed_item_for_game_host","check":"String","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"current_character_team_number","message0":"Triggering Player's Team Number","colour":230,"tooltip":"","helpUrl":"","output":"Number"},{"type":"triggering_player_score","message0":"Triggering Player's Score","colour":230,"tooltip":"","helpUrl":"","output":"Number"},{"type":"get_team_score","message0":"Get Score Of Team %1 ","args0":[{"type":"input_value","name":"get_score_of_team","check":"Number","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","output":"Number"},{"type":"is_a_live_game","message0":"Is A Live Game","colour":230,"tooltip":"","helpUrl":"","output":"Boolean"},{"type":"is_an_assignment","message0":"Is An Assignment","colour":230,"tooltip":"","helpUrl":"","output":"Boolean"},{"type":"seconds_into_game","message0":"Seconds Into Game","colour":230,"tooltip":"","helpUrl":"","output":"Number"},{"type":"set_assignment_objective","message0":"Set Objective To %1 ","args0":[{"type":"input_value","name":"set_objective_to","check":"String","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"set_percentage_complete","message0":"Set Percentage Complete To %1 ","args0":[{"type":"input_value","name":"set_percentage_complete_to","check":"Number","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"increment_percentage_complete","message0":"Increment Percentage Complete By %1 ","args0":[{"type":"input_value","name":"increment_percentage_complete_by","check":"Number","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"send_custom_notification","message0":"Send Notification %1 Title %2 Content %3 ","args0":[{"type":"input_dummy"},{"type":"input_value","name":"title","check":"String","align":"RIGHT"},{"type":"input_value","name":"content","check":"String","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"other_character_name","message0":"Other Player's Name","colour":230,"tooltip":"","helpUrl":"","output":"String"},{"type":"other_character_team_number","message0":"Other Player's Team Number","colour":230,"tooltip":"","helpUrl":"","output":"Number"},{"type":"other_character_get_property","message0":"Get Property As Other Player %1 ","args0":[{"type":"input_value","name":"get_property_as_other_player","check":"String","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","output":["String","Number","Boolean"]},{"type":"other_character_set_property","message0":"Set Property (As Other Player) %1 Value %2 ","args0":[{"type":"input_value","name":"set_property_as_other_player","check":"String","align":"RIGHT"},{"type":"input_value","name":"value","check":["String","Number","Boolean"],"align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"other_character_message_broadcaster","message0":"Broadcast Message (As Other Player) On Channel %1 ","args0":[{"type":"input_value","name":"broadcast_message_as_other_player_on_channel","check":"String","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"grant","message0":"Grant Player Selected Item","colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"grant_custom","message0":"Grant Player Selected Item (Custom Amount) %1 Amount %2 ","args0":[{"type":"input_dummy"},{"type":"input_value","name":"amount","check":"Number","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"set_billboard_text","message0":"Set Text %1 ","args0":[{"type":"input_value","name":"set_text","check":"String","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"set_text_color","message0":"Set Text Color To %1 ","args0":[{"type":"field_colour","name":"set_text_color_to","colour":"#ff0000"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"set_image","message0":"Set Image URL %1 ","args0":[{"type":"input_value","name":"set_image_url","check":"String","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"set_frame_color","message0":"Set Frame Color To %1 ","args0":[{"type":"field_colour","name":"set_frame_color_to","colour":"#ff0000"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"question_answering_streak","message0":"Questions Answered Correctly In A Row","colour":230,"tooltip":"","helpUrl":"","output":"Number"},{"type":"message_correct_answer","message0":"Set Message Shown When Player Answers Correctly %1 ","args0":[{"type":"input_value","name":"set_message_shown_when_player_answers_correctly","check":"String","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"message_incorrect_answer","message0":"Set Message Shown When Player Answers Incorrectly %1 ","args0":[{"type":"input_value","name":"set_message_shown_when_player_answers_incorrectly","check":"String","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"set_header","message0":"Set Header %1 ","args0":[{"type":"input_value","name":"set_header","check":"String","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"set_content","message0":"Set Content %1 ","args0":[{"type":"input_value","name":"set_content","check":"String","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"get_amount","message0":"Get Amount Of Current Item %1 ","args0":[{"type":"input_dummy"}],"colour":230,"tooltip":"","helpUrl":"","output":["Number"]},{"type":"set_gui_text","message0":"Set Text %1 ","args0":[{"type":"input_value","name":"set_text","check":"String","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"get_minutes","message0":"Get Minutes %1 ","args0":[{"type":"input_dummy"}],"colour":230,"tooltip":"","helpUrl":"","output":["Number"]},{"type":"get_seconds","message0":"Get Seconds %1 ","args0":[{"type":"input_dummy"}],"colour":230,"tooltip":"","helpUrl":"","output":["Number"]},{"type":"get_time_left_formatted","message0":"Get Time Left Formatted %1 ","args0":[{"type":"input_dummy"}],"colour":230,"tooltip":"","helpUrl":"","output":["String"]},{"type":"get_player_count","message0":"Number Of Players On Team %1 ","args0":[{"type":"input_dummy"}],"colour":230,"tooltip":"","helpUrl":"","output":["Number"]},{"type":"knockout_manager_other_character_name","message0":"Knocked Player's Name","colour":230,"tooltip":"","helpUrl":"","output":"String"},{"type":"knockout_manager_other_character_team_number","message0":"Knocked Player's Team Number","colour":230,"tooltip":"","helpUrl":"","output":"Number"},{"type":"knockout_manager_other_character_get_property","message0":"Get Property As Knocked Out Player %1 ","args0":[{"type":"input_value","name":"get_property_as_knocked_out_player","check":"String","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","output":["String","Number","Boolean"]},{"type":"knockout_manager_other_character_set_property","message0":"Set Property (As Knocked Out Player) %1 Value %2 ","args0":[{"type":"input_value","name":"set_property_as_knocked_out_player","check":"String","align":"RIGHT"},{"type":"input_value","name":"value","check":["String","Number","Boolean"],"align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"knockout_manager_other_character_message_broadcaster","message0":"Broadcast Message (As Knocked Out Player) On Channel %1 ","args0":[{"type":"input_value","name":"broadcast_message_as_knocked_out_player_on_channel","check":"String","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"tag_zone_other_character_name","message0":"Other Player's Name","colour":230,"tooltip":"","helpUrl":"","output":"String"},{"type":"tag_zone_other_character_team_number","message0":"Other Player's Team Number","colour":230,"tooltip":"","helpUrl":"","output":"Number"},{"type":"player_position_detector_player_x_position","message0":"Player's X Position %1 ","args0":[{"type":"input_dummy"}],"colour":230,"tooltip":"","helpUrl":"","output":["Number"]},{"type":"player_position_detector_player_y_position","message0":"Player's Y Position %1 ","args0":[{"type":"input_dummy"}],"colour":230,"tooltip":"","helpUrl":"","output":["Number"]},{"type":"damage_custom","message0":"Damage Player (Custom Amount) %1 Amount %2 ","args0":[{"type":"input_dummy"},{"type":"input_value","name":"amount","check":"Number","align":"RIGHT"}],"colour":230,"tooltip":"","helpUrl":"","previousStatement":null,"nextStatement":null},{"type":"number_with_commas","message0":"Convert Number To Text (With Commas) %1 ","args0":[{"type":"input_value","name":"convert_number_to_text_with_commas","check":"Number","align":"RIGHT"}],"colour":159.7,"tooltip":"","helpUrl":"","output":"String"}]`,
  customBlocksParsed: [
    {
      type: "message_broadcaster",
      message0: "Broadcast Message On Channel %1 ",
      args0: [
        {
          type: "input_value",
          name: "broadcast_message_on_channel",
          check: "String",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "set_property",
      message0: "Set Property %1 Value %2 ",
      args0: [
        {
          type: "input_value",
          name: "set_property",
          check: "String",
          align: "RIGHT"
        },
        {
          type: "input_value",
          name: "value",
          check: ["String", "Number", "Boolean"],
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "get_property",
      message0: "Get Property %1 ",
      args0: [
        {
          type: "input_value",
          name: "get_property",
          check: "String",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: ["String", "Number", "Boolean"]
    },
    {
      type: "current_character_name",
      message0: "Triggering Player's Name",
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: "String"
    },
    {
      type: "add_activity_feed_item_for_everyone",
      message0: "Add Activity Feed Item For Everyone %1 ",
      args0: [
        {
          type: "input_value",
          name: "add_activity_feed_item_for_everyone",
          check: "String",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "add_activity_feed_item_for_triggering_player",
      message0: "Add Activity Feed Item For Triggering Player %1 ",
      args0: [
        {
          type: "input_value",
          name: "add_activity_feed_item_for_triggering_player",
          check: "String",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "add_activity_feed_item_for_game_host",
      message0: "Add Activity Feed Item For Game Host %1 ",
      args0: [
        {
          type: "input_value",
          name: "add_activity_feed_item_for_game_host",
          check: "String",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "current_character_team_number",
      message0: "Triggering Player's Team Number",
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: "Number"
    },
    {
      type: "triggering_player_score",
      message0: "Triggering Player's Score",
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: "Number"
    },
    {
      type: "get_team_score",
      message0: "Get Score Of Team %1 ",
      args0: [
        {
          type: "input_value",
          name: "get_score_of_team",
          check: "Number",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: "Number"
    },
    {
      type: "is_a_live_game",
      message0: "Is A Live Game",
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: "Boolean"
    },
    {
      type: "is_an_assignment",
      message0: "Is An Assignment",
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: "Boolean"
    },
    {
      type: "seconds_into_game",
      message0: "Seconds Into Game",
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: "Number"
    },
    {
      type: "set_assignment_objective",
      message0: "Set Objective To %1 ",
      args0: [
        {
          type: "input_value",
          name: "set_objective_to",
          check: "String",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "set_percentage_complete",
      message0: "Set Percentage Complete To %1 ",
      args0: [
        {
          type: "input_value",
          name: "set_percentage_complete_to",
          check: "Number",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "increment_percentage_complete",
      message0: "Increment Percentage Complete By %1 ",
      args0: [
        {
          type: "input_value",
          name: "increment_percentage_complete_by",
          check: "Number",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "send_custom_notification",
      message0: "Send Notification %1 Title %2 Content %3 ",
      args0: [
        { type: "input_dummy" },
        {
          type: "input_value",
          name: "title",
          check: "String",
          align: "RIGHT"
        },
        {
          type: "input_value",
          name: "content",
          check: "String",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "other_character_name",
      message0: "Other Player's Name",
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: "String"
    },
    {
      type: "other_character_team_number",
      message0: "Other Player's Team Number",
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: "Number"
    },
    {
      type: "other_character_get_property",
      message0: "Get Property As Other Player %1 ",
      args0: [
        {
          type: "input_value",
          name: "get_property_as_other_player",
          check: "String",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: ["String", "Number", "Boolean"]
    },
    {
      type: "other_character_set_property",
      message0: "Set Property (As Other Player) %1 Value %2 ",
      args0: [
        {
          type: "input_value",
          name: "set_property_as_other_player",
          check: "String",
          align: "RIGHT"
        },
        {
          type: "input_value",
          name: "value",
          check: ["String", "Number", "Boolean"],
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "other_character_message_broadcaster",
      message0: "Broadcast Message (As Other Player) On Channel %1 ",
      args0: [
        {
          type: "input_value",
          name: "broadcast_message_as_other_player_on_channel",
          check: "String",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "grant",
      message0: "Grant Player Selected Item",
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "grant_custom",
      message0: "Grant Player Selected Item (Custom Amount) %1 Amount %2 ",
      args0: [
        { type: "input_dummy" },
        {
          type: "input_value",
          name: "amount",
          check: "Number",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "set_billboard_text",
      message0: "Set Text %1 ",
      args0: [
        {
          type: "input_value",
          name: "set_text",
          check: "String",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "set_text_color",
      message0: "Set Text Color To %1 ",
      args0: [
        {
          type: "field_colour",
          name: "set_text_color_to",
          colour: "#ff0000"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "set_image",
      message0: "Set Image URL %1 ",
      args0: [
        {
          type: "input_value",
          name: "set_image_url",
          check: "String",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "set_frame_color",
      message0: "Set Frame Color To %1 ",
      args0: [
        {
          type: "field_colour",
          name: "set_frame_color_to",
          colour: "#ff0000"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "question_answering_streak",
      message0: "Questions Answered Correctly In A Row",
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: "Number"
    },
    {
      type: "message_correct_answer",
      message0: "Set Message Shown When Player Answers Correctly %1 ",
      args0: [
        {
          type: "input_value",
          name: "set_message_shown_when_player_answers_correctly",
          check: "String",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "message_incorrect_answer",
      message0: "Set Message Shown When Player Answers Incorrectly %1 ",
      args0: [
        {
          type: "input_value",
          name: "set_message_shown_when_player_answers_incorrectly",
          check: "String",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "set_header",
      message0: "Set Header %1 ",
      args0: [
        {
          type: "input_value",
          name: "set_header",
          check: "String",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "set_content",
      message0: "Set Content %1 ",
      args0: [
        {
          type: "input_value",
          name: "set_content",
          check: "String",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "get_amount",
      message0: "Get Amount Of Current Item %1 ",
      args0: [{ type: "input_dummy" }],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: ["Number"]
    },
    {
      type: "set_gui_text",
      message0: "Set Text %1 ",
      args0: [
        {
          type: "input_value",
          name: "set_text",
          check: "String",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "get_minutes",
      message0: "Get Minutes %1 ",
      args0: [{ type: "input_dummy" }],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: ["Number"]
    },
    {
      type: "get_seconds",
      message0: "Get Seconds %1 ",
      args0: [{ type: "input_dummy" }],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: ["Number"]
    },
    {
      type: "get_time_left_formatted",
      message0: "Get Time Left Formatted %1 ",
      args0: [{ type: "input_dummy" }],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: ["String"]
    },
    {
      type: "get_player_count",
      message0: "Number Of Players On Team %1 ",
      args0: [{ type: "input_dummy" }],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: ["Number"]
    },
    {
      type: "knockout_manager_other_character_name",
      message0: "Knocked Player's Name",
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: "String"
    },
    {
      type: "knockout_manager_other_character_team_number",
      message0: "Knocked Player's Team Number",
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: "Number"
    },
    {
      type: "knockout_manager_other_character_get_property",
      message0: "Get Property As Knocked Out Player %1 ",
      args0: [
        {
          type: "input_value",
          name: "get_property_as_knocked_out_player",
          check: "String",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: ["String", "Number", "Boolean"]
    },
    {
      type: "knockout_manager_other_character_set_property",
      message0: "Set Property (As Knocked Out Player) %1 Value %2 ",
      args0: [
        {
          type: "input_value",
          name: "set_property_as_knocked_out_player",
          check: "String",
          align: "RIGHT"
        },
        {
          type: "input_value",
          name: "value",
          check: ["String", "Number", "Boolean"],
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "knockout_manager_other_character_message_broadcaster",
      message0: "Broadcast Message (As Knocked Out Player) On Channel %1 ",
      args0: [
        {
          type: "input_value",
          name: "broadcast_message_as_knocked_out_player_on_channel",
          check: "String",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "tag_zone_other_character_name",
      message0: "Other Player's Name",
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: "String"
    },
    {
      type: "tag_zone_other_character_team_number",
      message0: "Other Player's Team Number",
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: "Number"
    },
    {
      type: "player_position_detector_player_x_position",
      message0: "Player's X Position %1 ",
      args0: [{ type: "input_dummy" }],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: ["Number"]
    },
    {
      type: "player_position_detector_player_y_position",
      message0: "Player's Y Position %1 ",
      args0: [{ type: "input_dummy" }],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      output: ["Number"]
    },
    {
      type: "damage_custom",
      message0: "Damage Player (Custom Amount) %1 Amount %2 ",
      args0: [
        { type: "input_dummy" },
        {
          type: "input_value",
          name: "amount",
          check: "Number",
          align: "RIGHT"
        }
      ],
      colour: 230,
      tooltip: "",
      helpUrl: "",
      previousStatement: null,
      nextStatement: null
    },
    {
      type: "number_with_commas",
      message0: "Convert Number To Text (With Commas) %1 ",
      args0: [
        {
          type: "input_value",
          name: "convert_number_to_text_with_commas",
          check: "Number",
          align: "RIGHT"
        }
      ],
      colour: 159.7,
      tooltip: "",
      helpUrl: "",
      output: "String"
    }
  ]
};

// ../data/primitiveBlockDefinitions.ts
var logical = [
  // Block for boolean data type: true and false.
  {
    type: "logic_boolean",
    message0: "%1",
    args0: [
      {
        type: "field_dropdown",
        name: "BOOL",
        options: [
          ["%{BKY_LOGIC_BOOLEAN_TRUE}", "TRUE"],
          ["%{BKY_LOGIC_BOOLEAN_FALSE}", "FALSE"]
        ]
      }
    ],
    output: "Boolean",
    style: "logic_blocks",
    tooltip: "%{BKY_LOGIC_BOOLEAN_TOOLTIP}",
    helpUrl: "%{BKY_LOGIC_BOOLEAN_HELPURL}",
    $codegenSugar: "true;\nfalse;"
  },
  // Block for if/elseif/else condition.
  {
    type: "controls_if",
    message0: "%{BKY_CONTROLS_IF_MSG_IF} %1",
    args0: [
      {
        type: "input_value",
        name: "IF0",
        check: "Boolean"
      }
    ],
    message1: "%{BKY_CONTROLS_IF_MSG_THEN} %1",
    args1: [
      {
        type: "input_statement",
        name: "DO0"
      }
    ],
    previousStatement: null,
    nextStatement: null,
    style: "logic_blocks",
    helpUrl: "%{BKY_CONTROLS_IF_HELPURL}",
    suppressPrefixSuffix: true,
    mutator: "controls_if_mutator",
    extensions: ["controls_if_tooltip"],
    $codegenCustomInputsType: "Partial<Record<`IF${number}`, {block: BooleanValueBlock | MaybeBooleanValueBlock}> & Record<`DO${number}` | 'ELSE', {block: StatementBlock}>>",
    $codegenIntersectsWith: "{ extraState?: { hasElse?: true; elseIfCount?: number; } }",
    $codegenNoFunction: true,
    $codegenSugar: "if { ... } else { ... }"
  },
  // Block for comparison operator.
  {
    type: "logic_compare",
    message0: "%1 %2 %3",
    args0: [
      {
        type: "input_value",
        name: "A"
      },
      {
        type: "field_dropdown",
        name: "OP",
        options: [
          ["=", "EQ"],
          ["\u2260", "NEQ"],
          ["\u200F<", "LT"],
          ["\u200F\u2264", "LTE"],
          ["\u200F>", "GT"],
          ["\u200F\u2265", "GTE"]
        ]
      },
      {
        type: "input_value",
        name: "B"
      }
    ],
    inputsInline: true,
    output: "Boolean",
    style: "logic_blocks",
    helpUrl: "%{BKY_LOGIC_COMPARE_HELPURL}",
    extensions: ["logic_compare", "logic_op_tooltip"],
    $codegenSugar: "x == y; // or ===\nx != y; // or !==\nx < y;\nx <= y;\nx > y;\nx >= y;"
  },
  // Block for logical operations: 'and', 'or'.
  {
    type: "logic_operation",
    message0: "%1 %2 %3",
    args0: [
      {
        type: "input_value",
        name: "A",
        check: "Boolean"
      },
      {
        type: "field_dropdown",
        name: "OP",
        options: [
          ["%{BKY_LOGIC_OPERATION_AND}", "AND"],
          ["%{BKY_LOGIC_OPERATION_OR}", "OR"]
        ]
      },
      {
        type: "input_value",
        name: "B",
        check: "Boolean"
      }
    ],
    inputsInline: true,
    output: "Boolean",
    style: "logic_blocks",
    helpUrl: "%{BKY_LOGIC_OPERATION_HELPURL}",
    extensions: ["logic_op_tooltip"],
    $codegenSugar: "x && y;\nx || y;"
  }
  // Block for negation.
  // {
  //   type: 'logic_negate',
  //   message0: '%{BKY_LOGIC_NEGATE_TITLE}',
  //   args0: [
  //     {
  //       type: 'input_value',
  //       name: 'BOOL',
  //       check: 'Boolean',
  //     },
  //   ],
  //   output: 'Boolean',
  //   style: 'logic_blocks',
  //   tooltip: '%{BKY_LOGIC_NEGATE_TOOLTIP}',
  //   helpUrl: '%{BKY_LOGIC_NEGATE_HELPURL}',
  // },
];
var math = [
  // Block for numeric value.
  {
    type: "math_number",
    message0: "%1",
    args0: [
      {
        type: "field_number",
        name: "NUM",
        value: 0
      }
    ],
    output: "Number",
    helpUrl: "%{BKY_MATH_NUMBER_HELPURL}",
    style: "math_blocks",
    tooltip: "%{BKY_MATH_NUMBER_TOOLTIP}",
    extensions: ["parent_tooltip_when_inline"],
    $codegenSugar: "42;\n21.5;\n// or any number"
  },
  // Block for basic arithmetic operator.
  {
    type: "math_arithmetic",
    message0: "%1 %2 %3",
    args0: [
      {
        type: "input_value",
        name: "A",
        check: "Number"
      },
      {
        type: "field_dropdown",
        name: "OP",
        options: [
          ["%{BKY_MATH_ADDITION_SYMBOL}", "ADD"],
          ["%{BKY_MATH_SUBTRACTION_SYMBOL}", "MINUS"],
          ["%{BKY_MATH_MULTIPLICATION_SYMBOL}", "MULTIPLY"],
          ["%{BKY_MATH_DIVISION_SYMBOL}", "DIVIDE"],
          ["%{BKY_MATH_POWER_SYMBOL}", "POWER"]
        ]
      },
      {
        type: "input_value",
        name: "B",
        check: "Number"
      }
    ],
    inputsInline: true,
    output: "Number",
    style: "math_blocks",
    helpUrl: "%{BKY_MATH_ARITHMETIC_HELPURL}",
    extensions: ["math_op_tooltip"],
    $codegenSugar: "x + y;\nx - y;\nx * y;\nx / y;\nx ** y;"
  },
  // Block for advanced math operators with single operand.
  {
    type: "math_single",
    message0: "%1 %2",
    args0: [
      {
        type: "field_dropdown",
        name: "OP",
        options: [
          ["%{BKY_MATH_SINGLE_OP_ROOT}", "ROOT"],
          ["%{BKY_MATH_SINGLE_OP_ABSOLUTE}", "ABS"],
          ["-", "NEG"],
          ["ln", "LN"],
          ["log10", "LOG10"],
          ["e^", "EXP"],
          ["10^", "POW10"]
        ]
      },
      {
        type: "input_value",
        name: "NUM",
        check: "Number"
      }
    ],
    output: "Number",
    style: "math_blocks",
    helpUrl: "%{BKY_MATH_SINGLE_HELPURL}",
    extensions: ["math_op_tooltip"]
  },
  // Block for trigonometry operators.
  {
    type: "math_trig",
    message0: "%1 %2",
    args0: [
      {
        type: "field_dropdown",
        name: "OP",
        options: [
          ["%{BKY_MATH_TRIG_SIN}", "SIN"],
          ["%{BKY_MATH_TRIG_COS}", "COS"],
          ["%{BKY_MATH_TRIG_TAN}", "TAN"],
          ["%{BKY_MATH_TRIG_ASIN}", "ASIN"],
          ["%{BKY_MATH_TRIG_ACOS}", "ACOS"],
          ["%{BKY_MATH_TRIG_ATAN}", "ATAN"]
        ]
      },
      {
        type: "input_value",
        name: "NUM",
        check: "Number"
      }
    ],
    output: "Number",
    style: "math_blocks",
    helpUrl: "%{BKY_MATH_TRIG_HELPURL}",
    extensions: ["math_op_tooltip"],
    $codegenSugar: "Math.sin(x);\nMath.cos(x);\n// etc.\n// Will preserve JS behaviour by multiplying by Math.PI / 180"
  },
  // Block for constants: PI, E, the Golden Ratio, sqrt(2), 1/sqrt(2), INFINITY.
  // {
  //   type: 'math_constant',
  //   message0: '%1',
  //   args0: [
  //     {
  //       type: 'field_dropdown',
  //       name: 'CONSTANT',
  //       options: [
  //         ['\u03c0', 'PI'],
  //         ['e', 'E'],
  //         ['\u03c6', 'GOLDEN_RATIO'],
  //         ['sqrt(2)', 'SQRT2'],
  //         ['sqrt(\u00bd)', 'SQRT1_2'],
  //         ['\u221e', 'INFINITY'],
  //       ],
  //     },
  //   ],
  //   output: 'Number',
  //   style: 'math_blocks',
  //   tooltip: '%{BKY_MATH_CONSTANT_TOOLTIP}',
  //   helpUrl: '%{BKY_MATH_CONSTANT_HELPURL}',
  // },
  // Block for checking if a number is even, odd, prime, whole, positive,
  // negative or if it is divisible by certain number.
  {
    type: "math_number_property",
    message0: "%1 %2",
    args0: [
      {
        type: "input_value",
        name: "NUMBER_TO_CHECK",
        check: "Number"
      },
      {
        type: "field_dropdown",
        name: "PROPERTY",
        options: [
          ["%{BKY_MATH_IS_EVEN}", "EVEN"],
          ["%{BKY_MATH_IS_ODD}", "ODD"],
          ["%{BKY_MATH_IS_PRIME}", "PRIME"],
          ["%{BKY_MATH_IS_WHOLE}", "WHOLE"],
          ["%{BKY_MATH_IS_POSITIVE}", "POSITIVE"],
          ["%{BKY_MATH_IS_NEGATIVE}", "NEGATIVE"],
          ["%{BKY_MATH_IS_DIVISIBLE_BY}", "DIVISIBLE_BY"]
        ]
      }
    ],
    inputsInline: true,
    output: "Boolean",
    style: "math_blocks",
    tooltip: "%{BKY_MATH_IS_TOOLTIP}",
    mutator: "math_is_divisibleby_mutator"
  },
  // Block for adding to a variable in place.
  {
    type: "math_change",
    message0: "%{BKY_MATH_CHANGE_TITLE}",
    args0: [
      {
        type: "field_variable",
        name: "VAR",
        variable: "%{BKY_MATH_CHANGE_TITLE_ITEM}"
      },
      {
        type: "input_value",
        name: "DELTA",
        check: "Number"
      }
    ],
    previousStatement: null,
    nextStatement: null,
    style: "variable_blocks",
    helpUrl: "%{BKY_MATH_CHANGE_HELPURL}",
    extensions: ["math_change_tooltip"],
    $codegenNoFunction: true,
    $codegenForceInclude: true,
    $codegenSugar: "x += y;"
  },
  // Block for rounding functions.
  {
    type: "math_round",
    message0: "%1 %2",
    args0: [
      {
        type: "field_dropdown",
        name: "OP",
        options: [
          ["%{BKY_MATH_ROUND_OPERATOR_ROUND}", "ROUND"],
          ["%{BKY_MATH_ROUND_OPERATOR_ROUNDUP}", "ROUNDUP"],
          ["%{BKY_MATH_ROUND_OPERATOR_ROUNDDOWN}", "ROUNDDOWN"]
        ]
      },
      {
        type: "input_value",
        name: "NUM",
        check: "Number"
      }
    ],
    output: "Number",
    style: "math_blocks",
    helpUrl: "%{BKY_MATH_ROUND_HELPURL}",
    tooltip: "%{BKY_MATH_ROUND_TOOLTIP}"
  },
  // Block for remainder of a division.
  // {
  //   type: 'math_modulo',
  //   message0: '%{BKY_MATH_MODULO_TITLE}',
  //   args0: [
  //     {
  //       type: 'input_value',
  //       name: 'DIVIDEND',
  //       check: 'Number',
  //     },
  //     {
  //       type: 'input_value',
  //       name: 'DIVISOR',
  //       check: 'Number',
  //     },
  //   ],
  //   inputsInline: true,
  //   output: 'Number',
  //   style: 'math_blocks',
  //   tooltip: '%{BKY_MATH_MODULO_TOOLTIP}',
  //   helpUrl: '%{BKY_MATH_MODULO_HELPURL}',
  // },
  // Block for constraining a number between two limits.
  // {
  //   type: 'math_constrain',
  //   message0: '%{BKY_MATH_CONSTRAIN_TITLE}',
  //   args0: [
  //     {
  //       type: 'input_value',
  //       name: 'VALUE',
  //       check: 'Number',
  //     },
  //     {
  //       type: 'input_value',
  //       name: 'LOW',
  //       check: 'Number',
  //     },
  //     {
  //       type: 'input_value',
  //       name: 'HIGH',
  //       check: 'Number',
  //     },
  //   ],
  //   inputsInline: true,
  //   output: 'Number',
  //   style: 'math_blocks',
  //   tooltip: '%{BKY_MATH_CONSTRAIN_TOOLTIP}',
  //   helpUrl: '%{BKY_MATH_CONSTRAIN_HELPURL}',
  // },
  // Block for random integer between [X] and [Y].
  {
    type: "math_random_int",
    message0: "%{BKY_MATH_RANDOM_INT_TITLE}",
    args0: [
      {
        type: "input_value",
        name: "FROM",
        check: "Number"
      },
      {
        type: "input_value",
        name: "TO",
        check: "Number"
      }
    ],
    inputsInline: true,
    output: "Number",
    style: "math_blocks",
    tooltip: "%{BKY_MATH_RANDOM_INT_TOOLTIP}",
    helpUrl: "%{BKY_MATH_RANDOM_INT_HELPURL}"
  }
  // Block for random integer between [X] and [Y].
  // {
  //   type: 'math_random_float',
  //   message0: '%{BKY_MATH_RANDOM_FLOAT_TITLE_RANDOM}',
  //   output: 'Number',
  //   style: 'math_blocks',
  //   tooltip: '%{BKY_MATH_RANDOM_FLOAT_TOOLTIP}',
  //   helpUrl: '%{BKY_MATH_RANDOM_FLOAT_HELPURL}',
  // },
  // Block for calculating atan2 of [X] and [Y].
  // {
  //   type: 'math_atan2',
  //   message0: '%{BKY_MATH_ATAN2_TITLE}',
  //   args0: [
  //     {
  //       type: 'input_value',
  //       name: 'X',
  //       check: 'Number',
  //     },
  //     {
  //       type: 'input_value',
  //       name: 'Y',
  //       check: 'Number',
  //     },
  //   ],
  //   inputsInline: true,
  //   output: 'Number',
  //   style: 'math_blocks',
  //   tooltip: '%{BKY_MATH_ATAN2_TOOLTIP}',
  //   helpUrl: '%{BKY_MATH_ATAN2_HELPURL}',
  // },
];
var text = [
  // Block for text value
  {
    type: "text",
    message0: "%1",
    args0: [
      {
        type: "field_input",
        name: "TEXT",
        text: ""
      }
    ],
    output: "String",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_TEXT_HELPURL}",
    tooltip: "%{BKY_TEXT_TEXT_TOOLTIP}",
    extensions: ["text_quotes", "parent_tooltip_when_inline"],
    $codegenSugar: `'Hello';
"World";
// or any text`
  },
  {
    type: "text_join",
    message0: "create text with",
    output: "String",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_JOIN_HELPURL}",
    tooltip: "%{BKY_TEXT_JOIN_TOOLTIP}",
    mutator: "text_join_mutator",
    $codegenCustomInputsType: "Partial<Record<`ADD${number}`, {block: ValueBlock}>>",
    $codegenIntersectsWith: "{ extraState?: { itemCount?: number; } }",
    $codegenCustomFunctionArgs: "...args: any[]"
  },
  // {
  //   type: 'text_append',
  //   message0: '%{BKY_TEXT_APPEND_TITLE}',
  //   args0: [
  //     {
  //       type: 'field_variable',
  //       name: 'VAR',
  //       variable: '%{BKY_TEXT_APPEND_VARIABLE}',
  //     },
  //     {
  //       type: 'input_value',
  //       name: 'TEXT',
  //     },
  //   ],
  //   previousStatement: null,
  //   nextStatement: null,
  //   style: 'text_blocks',
  //   extensions: ['text_append_tooltip'],
  // },
  {
    type: "text_length",
    message0: "%{BKY_TEXT_LENGTH_TITLE}",
    args0: [
      {
        type: "input_value",
        name: "VALUE",
        check: ["String"]
      }
    ],
    output: "Number",
    style: "text_blocks",
    tooltip: "%{BKY_TEXT_LENGTH_TOOLTIP}",
    helpUrl: "%{BKY_TEXT_LENGTH_HELPURL}"
  },
  // {
  //   type: 'text_isEmpty',
  //   message0: '%{BKY_TEXT_ISEMPTY_TITLE}',
  //   args0: [
  //     {
  //       type: 'input_value',
  //       name: 'VALUE',
  //       check: ['String'],
  //     },
  //   ],
  //   output: 'Boolean',
  //   style: 'text_blocks',
  //   tooltip: '%{BKY_TEXT_ISEMPTY_TOOLTIP}',
  //   helpUrl: '%{BKY_TEXT_ISEMPTY_HELPURL}',
  // },
  {
    type: "text_indexOf",
    message0: "%{BKY_TEXT_INDEXOF_TITLE}",
    args0: [
      {
        type: "input_value",
        name: "VALUE",
        check: "String"
      },
      {
        type: "field_dropdown",
        name: "END",
        options: [
          ["%{BKY_TEXT_INDEXOF_OPERATOR_FIRST}", "FIRST"],
          ["%{BKY_TEXT_INDEXOF_OPERATOR_LAST}", "LAST"]
        ]
      },
      {
        type: "input_value",
        name: "FIND",
        check: "String"
      }
    ],
    output: "Number",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_INDEXOF_HELPURL}",
    inputsInline: true,
    extensions: ["text_indexOf_tooltip"]
  },
  {
    type: "text_charAt",
    message0: "%{BKY_TEXT_CHARAT_TITLE}",
    // "in text %1 %2"
    args0: [
      {
        type: "input_value",
        name: "VALUE",
        check: "String"
      },
      {
        type: "field_dropdown",
        name: "WHERE",
        options: [
          ["%{BKY_TEXT_CHARAT_FROM_START}", "FROM_START"],
          ["%{BKY_TEXT_CHARAT_FROM_END}", "FROM_END"],
          ["%{BKY_TEXT_CHARAT_FIRST}", "FIRST"],
          ["%{BKY_TEXT_CHARAT_LAST}", "LAST"],
          ["%{BKY_TEXT_CHARAT_RANDOM}", "RANDOM"]
        ]
      }
    ],
    output: "String",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_CHARAT_HELPURL}",
    inputsInline: true,
    mutator: "text_charAt_mutator"
  },
  // function (this: GetSubstringBlock) {
  //   this['WHERE_OPTIONS_1'] = [
  //     [Msg['TEXT_GET_SUBSTRING_START_FROM_START'], 'FROM_START'],
  //     [Msg['TEXT_GET_SUBSTRING_START_FROM_END'], 'FROM_END'],
  //     [Msg['TEXT_GET_SUBSTRING_START_FIRST'], 'FIRST'],
  //   ];
  //   this['WHERE_OPTIONS_2'] = [
  //     [Msg['TEXT_GET_SUBSTRING_END_FROM_START'], 'FROM_START'],
  //     [Msg['TEXT_GET_SUBSTRING_END_FROM_END'], 'FROM_END'],
  //     [Msg['TEXT_GET_SUBSTRING_END_LAST'], 'LAST'],
  //   ];
  //   this.setHelpUrl(Msg['TEXT_GET_SUBSTRING_HELPURL']);
  //   this.setStyle('text_blocks');
  //   this.appendValueInput('STRING')
  //     .setCheck('String')
  //     .appendField(Msg['TEXT_GET_SUBSTRING_INPUT_IN_TEXT']);
  //   this.appendDummyInput('AT1');
  //   this.appendDummyInput('AT2');
  //   if (Msg['TEXT_GET_SUBSTRING_TAIL']) {
  //     this.appendDummyInput('TAIL').appendField(Msg['TEXT_GET_SUBSTRING_TAIL']);
  //   }
  //   this.setInputsInline(true);
  //   this.setOutput(true, 'String');
  //   this.updateAt_(1, true);
  //   this.updateAt_(2, true);
  //   this.setTooltip(Msg['TEXT_GET_SUBSTRING_TOOLTIP']);
  // }
  {
    type: "text_getSubstring",
    message0: "in text %1 get substring from %2 %3 to %4 %5",
    args0: [
      {
        type: "input_value",
        name: "STRING",
        check: "String"
      },
      {
        type: "field_dropdown",
        name: "WHERE1",
        options: [
          ["%{BKY_TEXT_GET_SUBSTRING_START_FROM_START}", "FROM_START"],
          ["%{BKY_TEXT_GET_SUBSTRING_START_FROM_END}", "FROM_END"],
          ["%{BKY_TEXT_GET_SUBSTRING_START_FIRST}", "FIRST"]
        ]
      },
      {
        type: "input_value",
        name: "AT1",
        check: "Number"
      },
      {
        type: "field_dropdown",
        name: "WHERE2",
        options: [
          ["%{BKY_TEXT_GET_SUBSTRING_END_FROM_START}", "FROM_START"],
          ["%{BKY_TEXT_GET_SUBSTRING_END_FROM_END}", "FROM_END"],
          ["%{BKY_TEXT_GET_SUBSTRING_END_LAST}", "LAST"]
        ]
      },
      {
        type: "input_value",
        name: "AT2",
        check: "Number"
      }
    ],
    output: "String",
    style: "text_blocks",
    helpUrl: "%{BKY_TEXT_GET_SUBSTRING_HELPURL}",
    inputsInline: true,
    extensions: ["text_getSubstring_tooltip"]
  }
];
var variables = [
  // Block for variable getter.
  {
    type: "variables_get",
    message0: "%1",
    args0: [
      {
        type: "field_variable",
        name: "VAR",
        variable: "%{BKY_VARIABLES_DEFAULT_NAME}"
      }
    ],
    output: null,
    style: "variable_blocks",
    helpUrl: "%{BKY_VARIABLES_GET_HELPURL}",
    tooltip: "%{BKY_VARIABLES_GET_TOOLTIP}",
    extensions: ["contextMenu_variableSetterGetter"],
    $codegenNoFunction: true,
    $codegenSugar: "x // just use the variable name",
    $codegenForceInclude: true
  },
  // Block for variable setter.
  {
    type: "variables_set",
    message0: "%{BKY_VARIABLES_SET}",
    args0: [
      {
        type: "field_variable",
        name: "VAR",
        variable: "%{BKY_VARIABLES_DEFAULT_NAME}"
      },
      {
        type: "input_value",
        name: "VALUE"
      }
    ],
    previousStatement: null,
    nextStatement: null,
    style: "variable_blocks",
    tooltip: "%{BKY_VARIABLES_SET_TOOLTIP}",
    helpUrl: "%{BKY_VARIABLES_SET_HELPURL}",
    extensions: ["contextMenu_variableSetterGetter"],
    $codegenNoFunction: true,
    $codegenForceInclude: true,
    $codegenSugar: "let x = ...;\nvar x = ...;\nconst x = ...;\nx = ...;"
  }
];
var definitions = [
  ...logical,
  ...math,
  ...text,
  ...variables
];

// ../data/en.ts
var en = {
  VARIABLES_DEFAULT_NAME: "item",
  UNNAMED_KEY: "unnamed",
  TODAY: "Today",
  DUPLICATE_BLOCK: "Duplicate",
  ADD_COMMENT: "Add Comment",
  REMOVE_COMMENT: "Remove Comment",
  DUPLICATE_COMMENT: "Duplicate Comment",
  EXTERNAL_INPUTS: "External Inputs",
  INLINE_INPUTS: "Inline Inputs",
  DELETE_BLOCK: "Delete Block",
  DELETE_X_BLOCKS: "Delete %1 Blocks",
  DELETE_ALL_BLOCKS: "Delete all %1 blocks?",
  CLEAN_UP: "Clean up Blocks",
  COLLAPSE_BLOCK: "Collapse Block",
  COLLAPSE_ALL: "Collapse Blocks",
  EXPAND_BLOCK: "Expand Block",
  EXPAND_ALL: "Expand Blocks",
  DISABLE_BLOCK: "Disable Block",
  ENABLE_BLOCK: "Enable Block",
  HELP: "Help",
  UNDO: "Undo",
  REDO: "Redo",
  CHANGE_VALUE_TITLE: "Change value:",
  RENAME_VARIABLE: "Rename variable...",
  RENAME_VARIABLE_TITLE: "Rename all '%1' variables to:",
  NEW_VARIABLE: "Create variable...",
  NEW_STRING_VARIABLE: "Create string variable...",
  NEW_NUMBER_VARIABLE: "Create number variable...",
  NEW_COLOUR_VARIABLE: "Create colour variable...",
  NEW_VARIABLE_TYPE_TITLE: "New variable type:",
  NEW_VARIABLE_TITLE: "New variable name:",
  VARIABLE_ALREADY_EXISTS: "A variable named '%1' already exists.",
  VARIABLE_ALREADY_EXISTS_FOR_ANOTHER_TYPE: "A variable named '%1' already exists for another type: '%2'.",
  VARIABLE_ALREADY_EXISTS_FOR_A_PARAMETER: "A variable named '%1' already exists as a parameter in the procedure '%2'.",
  DELETE_VARIABLE_CONFIRMATION: "Delete %1 uses of the '%2' variable?",
  CANNOT_DELETE_VARIABLE_PROCEDURE: "Can't delete the variable '%1' because it's part of the definition of the function '%2'",
  DELETE_VARIABLE: "Delete the '%1' variable",
  COLOUR_PICKER_HELPURL: "https://en.wikipedia.org/wiki/Color",
  COLOUR_PICKER_TOOLTIP: "Choose a colour from the palette.",
  COLOUR_RANDOM_HELPURL: "http://randomcolour.com",
  COLOUR_RANDOM_TITLE: "random colour",
  COLOUR_RANDOM_TOOLTIP: "Choose a colour at random.",
  COLOUR_RGB_HELPURL: "https://www.december.com/html/spec/colorpercompact.html",
  COLOUR_RGB_TITLE: "colour with",
  COLOUR_RGB_RED: "red",
  COLOUR_RGB_GREEN: "green",
  COLOUR_RGB_BLUE: "blue",
  COLOUR_RGB_TOOLTIP: "Create a colour with the specified amount of red, green, and blue. All values must be between 0 and 100.",
  COLOUR_BLEND_HELPURL: "https://meyerweb.com/eric/tools/color-blend/#:::rgbp",
  COLOUR_BLEND_TITLE: "blend",
  COLOUR_BLEND_COLOUR1: "colour 1",
  COLOUR_BLEND_COLOUR2: "colour 2",
  COLOUR_BLEND_RATIO: "ratio",
  COLOUR_BLEND_TOOLTIP: "Blends two colours together with a given ratio (0.0 - 1.0).",
  CONTROLS_REPEAT_HELPURL: "https://en.wikipedia.org/wiki/For_loop",
  CONTROLS_REPEAT_TITLE: "repeat %1 times",
  CONTROLS_REPEAT_INPUT_DO: "do",
  CONTROLS_REPEAT_TOOLTIP: "Do some statements several times.",
  CONTROLS_WHILEUNTIL_HELPURL: "https://github.com/google/blockly/wiki/Loops#repeat",
  CONTROLS_WHILEUNTIL_OPERATOR_WHILE: "repeat while",
  CONTROLS_WHILEUNTIL_OPERATOR_UNTIL: "repeat until",
  CONTROLS_WHILEUNTIL_TOOLTIP_WHILE: "While a value is true, then do some statements.",
  CONTROLS_WHILEUNTIL_TOOLTIP_UNTIL: "While a value is false, then do some statements.",
  CONTROLS_FOR_HELPURL: "https://github.com/google/blockly/wiki/Loops#count-with",
  CONTROLS_FOR_TOOLTIP: "Have the variable '%1' take on the values from the start number to the end number, counting by the specified interval, and do the specified blocks.",
  CONTROLS_FOR_TITLE: "count with %1 from %2 to %3 by %4",
  CONTROLS_FOREACH_HELPURL: "https://github.com/google/blockly/wiki/Loops#for-each",
  CONTROLS_FOREACH_TITLE: "for each item %1 in list %2",
  CONTROLS_FOREACH_TOOLTIP: "For each item in a list, set the variable '%1' to the item, and then do some statements.",
  CONTROLS_FLOW_STATEMENTS_HELPURL: "https://github.com/google/blockly/wiki/Loops#loop-termination-blocks",
  CONTROLS_FLOW_STATEMENTS_OPERATOR_BREAK: "break out of loop",
  CONTROLS_FLOW_STATEMENTS_OPERATOR_CONTINUE: "continue with next iteration of loop",
  CONTROLS_FLOW_STATEMENTS_TOOLTIP_BREAK: "Break out of the containing loop.",
  CONTROLS_FLOW_STATEMENTS_TOOLTIP_CONTINUE: "Skip the rest of this loop, and continue with the next iteration.",
  CONTROLS_FLOW_STATEMENTS_WARNING: "Warning: This block may only be used within a loop.",
  CONTROLS_IF_HELPURL: "https://github.com/google/blockly/wiki/IfElse",
  CONTROLS_IF_TOOLTIP_1: "If a value is true, then do some statements.",
  CONTROLS_IF_TOOLTIP_2: "If a value is true, then do the first block of statements. Otherwise, do the second block of statements.",
  CONTROLS_IF_TOOLTIP_3: "If the first value is true, then do the first block of statements. Otherwise, if the second value is true, do the second block of statements.",
  CONTROLS_IF_TOOLTIP_4: "If the first value is true, then do the first block of statements. Otherwise, if the second value is true, do the second block of statements. If none of the values are true, do the last block of statements.",
  CONTROLS_IF_MSG_IF: "if",
  CONTROLS_IF_MSG_ELSEIF: "else if",
  CONTROLS_IF_MSG_ELSE: "else",
  CONTROLS_IF_IF_TOOLTIP: "Add, remove, or reorder sections to reconfigure this if block.",
  CONTROLS_IF_ELSEIF_TOOLTIP: "Add a condition to the if block.",
  CONTROLS_IF_ELSE_TOOLTIP: "Add a final, catch-all condition to the if block.",
  LOGIC_COMPARE_HELPURL: "https://en.wikipedia.org/wiki/Inequality_(mathematics)",
  LOGIC_COMPARE_TOOLTIP_EQ: "Return true if both inputs equal each other.",
  LOGIC_COMPARE_TOOLTIP_NEQ: "Return true if both inputs are not equal to each other.",
  LOGIC_COMPARE_TOOLTIP_LT: "Return true if the first input is smaller than the second input.",
  LOGIC_COMPARE_TOOLTIP_LTE: "Return true if the first input is smaller than or equal to the second input.",
  LOGIC_COMPARE_TOOLTIP_GT: "Return true if the first input is greater than the second input.",
  LOGIC_COMPARE_TOOLTIP_GTE: "Return true if the first input is greater than or equal to the second input.",
  LOGIC_OPERATION_HELPURL: "https://github.com/google/blockly/wiki/Logic#logical-operations",
  LOGIC_OPERATION_TOOLTIP_AND: "Return true if both inputs are true.",
  LOGIC_OPERATION_AND: "and",
  LOGIC_OPERATION_TOOLTIP_OR: "Return true if at least one of the inputs is true.",
  LOGIC_OPERATION_OR: "or",
  LOGIC_NEGATE_HELPURL: "https://github.com/google/blockly/wiki/Logic#not",
  LOGIC_NEGATE_TITLE: "not %1",
  LOGIC_NEGATE_TOOLTIP: "Returns true if the input is false. Returns false if the input is true.",
  LOGIC_BOOLEAN_HELPURL: "https://github.com/google/blockly/wiki/Logic#values",
  LOGIC_BOOLEAN_TRUE: "true",
  LOGIC_BOOLEAN_FALSE: "false",
  LOGIC_BOOLEAN_TOOLTIP: "Returns either true or false.",
  LOGIC_NULL_HELPURL: "https://en.wikipedia.org/wiki/Nullable_type",
  LOGIC_NULL: "null",
  LOGIC_NULL_TOOLTIP: "Returns null.",
  LOGIC_TERNARY_HELPURL: "https://en.wikipedia.org/wiki/%3F:",
  LOGIC_TERNARY_CONDITION: "test",
  LOGIC_TERNARY_IF_TRUE: "if true",
  LOGIC_TERNARY_IF_FALSE: "if false",
  LOGIC_TERNARY_TOOLTIP: "Check the condition in 'test'. If the condition is true, returns the 'if true' value; otherwise returns the 'if false' value.",
  MATH_NUMBER_HELPURL: "https://en.wikipedia.org/wiki/Number",
  MATH_NUMBER_TOOLTIP: "A number.",
  MATH_ADDITION_SYMBOL: "+",
  MATH_SUBTRACTION_SYMBOL: "-",
  MATH_DIVISION_SYMBOL: "\xF7",
  MATH_MULTIPLICATION_SYMBOL: "\xD7",
  MATH_POWER_SYMBOL: "^",
  MATH_TRIG_SIN: "sin",
  MATH_TRIG_COS: "cos",
  MATH_TRIG_TAN: "tan",
  MATH_TRIG_ASIN: "asin",
  MATH_TRIG_ACOS: "acos",
  MATH_TRIG_ATAN: "atan",
  MATH_ARITHMETIC_HELPURL: "https://en.wikipedia.org/wiki/Arithmetic",
  MATH_ARITHMETIC_TOOLTIP_ADD: "Return the sum of the two numbers.",
  MATH_ARITHMETIC_TOOLTIP_MINUS: "Return the difference of the two numbers.",
  MATH_ARITHMETIC_TOOLTIP_MULTIPLY: "Return the product of the two numbers.",
  MATH_ARITHMETIC_TOOLTIP_DIVIDE: "Return the quotient of the two numbers.",
  MATH_ARITHMETIC_TOOLTIP_POWER: "Return the first number raised to the power of the second number.",
  MATH_SINGLE_HELPURL: "https://en.wikipedia.org/wiki/Square_root",
  MATH_SINGLE_OP_ROOT: "square root",
  MATH_SINGLE_TOOLTIP_ROOT: "Return the square root of a number.",
  MATH_SINGLE_OP_ABSOLUTE: "absolute",
  MATH_SINGLE_TOOLTIP_ABS: "Return the absolute value of a number.",
  MATH_SINGLE_TOOLTIP_NEG: "Return the negation of a number.",
  MATH_SINGLE_TOOLTIP_LN: "Return the natural logarithm of a number.",
  MATH_SINGLE_TOOLTIP_LOG10: "Return the base 10 logarithm of a number.",
  MATH_SINGLE_TOOLTIP_EXP: "Return e to the power of a number.",
  MATH_SINGLE_TOOLTIP_POW10: "Return 10 to the power of a number.",
  MATH_TRIG_HELPURL: "https://en.wikipedia.org/wiki/Trigonometric_functions",
  MATH_TRIG_TOOLTIP_SIN: "Return the sine of a degree (not radian).",
  MATH_TRIG_TOOLTIP_COS: "Return the cosine of a degree (not radian).",
  MATH_TRIG_TOOLTIP_TAN: "Return the tangent of a degree (not radian).",
  MATH_TRIG_TOOLTIP_ASIN: "Return the arcsine of a number.",
  MATH_TRIG_TOOLTIP_ACOS: "Return the arccosine of a number.",
  MATH_TRIG_TOOLTIP_ATAN: "Return the arctangent of a number.",
  MATH_CONSTANT_HELPURL: "https://en.wikipedia.org/wiki/Mathematical_constant",
  MATH_CONSTANT_TOOLTIP: "Return one of the common constants: \u03C0 (3.141\u2026), e (2.718\u2026), \u03C6 (1.618\u2026), sqrt(2) (1.414\u2026), sqrt(\xBD) (0.707\u2026), or \u221E (infinity).",
  MATH_IS_EVEN: "is even",
  MATH_IS_ODD: "is odd",
  MATH_IS_PRIME: "is prime",
  MATH_IS_WHOLE: "is whole",
  MATH_IS_POSITIVE: "is positive",
  MATH_IS_NEGATIVE: "is negative",
  MATH_IS_DIVISIBLE_BY: "is divisible by",
  MATH_IS_TOOLTIP: "Check if a number is an even, odd, prime, whole, positive, negative, or if it is divisible by certain number. Returns true or false.",
  MATH_CHANGE_HELPURL: "https://en.wikipedia.org/wiki/Programming_idiom#Incrementing_a_counter",
  MATH_CHANGE_TITLE: "change %1 by %2",
  MATH_CHANGE_TOOLTIP: "Add a number to variable '%1'.",
  MATH_ROUND_HELPURL: "https://en.wikipedia.org/wiki/Rounding",
  MATH_ROUND_TOOLTIP: "Round a number up or down.",
  MATH_ROUND_OPERATOR_ROUND: "round",
  MATH_ROUND_OPERATOR_ROUNDUP: "round up",
  MATH_ROUND_OPERATOR_ROUNDDOWN: "round down",
  MATH_ONLIST_HELPURL: "",
  MATH_ONLIST_OPERATOR_SUM: "sum of list",
  MATH_ONLIST_TOOLTIP_SUM: "Return the sum of all the numbers in the list.",
  MATH_ONLIST_OPERATOR_MIN: "min of list",
  MATH_ONLIST_TOOLTIP_MIN: "Return the smallest number in the list.",
  MATH_ONLIST_OPERATOR_MAX: "max of list",
  MATH_ONLIST_TOOLTIP_MAX: "Return the largest number in the list.",
  MATH_ONLIST_OPERATOR_AVERAGE: "average of list",
  MATH_ONLIST_TOOLTIP_AVERAGE: "Return the average (arithmetic mean) of the numeric values in the list.",
  MATH_ONLIST_OPERATOR_MEDIAN: "median of list",
  MATH_ONLIST_TOOLTIP_MEDIAN: "Return the median number in the list.",
  MATH_ONLIST_OPERATOR_MODE: "modes of list",
  MATH_ONLIST_TOOLTIP_MODE: "Return a list of the most common item(s) in the list.",
  MATH_ONLIST_OPERATOR_STD_DEV: "standard deviation of list",
  MATH_ONLIST_TOOLTIP_STD_DEV: "Return the standard deviation of the list.",
  MATH_ONLIST_OPERATOR_RANDOM: "random item of list",
  MATH_ONLIST_TOOLTIP_RANDOM: "Return a random element from the list.",
  MATH_MODULO_HELPURL: "https://en.wikipedia.org/wiki/Modulo_operation",
  MATH_MODULO_TITLE: "remainder of %1 \xF7 %2",
  MATH_MODULO_TOOLTIP: "Return the remainder from dividing the two numbers.",
  MATH_CONSTRAIN_HELPURL: "https://en.wikipedia.org/wiki/Clamping_(graphics)",
  MATH_CONSTRAIN_TITLE: "constrain %1 low %2 high %3",
  MATH_CONSTRAIN_TOOLTIP: "Constrain a number to be between the specified limits (inclusive).",
  MATH_RANDOM_INT_HELPURL: "https://en.wikipedia.org/wiki/Random_number_generation",
  MATH_RANDOM_INT_TITLE: "random integer from %1 to %2",
  MATH_RANDOM_INT_TOOLTIP: "Return a random integer between the two specified limits, inclusive.",
  MATH_RANDOM_FLOAT_HELPURL: "https://en.wikipedia.org/wiki/Random_number_generation",
  MATH_RANDOM_FLOAT_TITLE_RANDOM: "random fraction",
  MATH_RANDOM_FLOAT_TOOLTIP: "Return a random fraction between 0.0 (inclusive) and 1.0 (exclusive).",
  MATH_ATAN2_HELPURL: "https://en.wikipedia.org/wiki/Atan2",
  MATH_ATAN2_TITLE: "atan2 of X:%1 Y:%2",
  MATH_ATAN2_TOOLTIP: "Return the arctangent of point (X, Y) in degrees from -180 to 180.",
  TEXT_TEXT_HELPURL: "https://en.wikipedia.org/wiki/String_(computer_science)",
  TEXT_TEXT_TOOLTIP: "A letter, word, or line of text.",
  TEXT_JOIN_HELPURL: "https://github.com/google/blockly/wiki/Text#text-creation",
  TEXT_JOIN_TITLE_CREATEWITH: "create text with",
  TEXT_JOIN_TOOLTIP: "Create a piece of text by joining together any number of items.",
  TEXT_CREATE_JOIN_TITLE_JOIN: "join",
  TEXT_CREATE_JOIN_TOOLTIP: "Add, remove, or reorder sections to reconfigure this text block.",
  TEXT_CREATE_JOIN_ITEM_TOOLTIP: "Add an item to the text.",
  TEXT_APPEND_HELPURL: "https://github.com/google/blockly/wiki/Text#text-modification",
  TEXT_APPEND_TITLE: "to %1 append text %2",
  TEXT_APPEND_TOOLTIP: "Append some text to variable '%1'.",
  TEXT_LENGTH_HELPURL: "https://github.com/google/blockly/wiki/Text#text-modification",
  TEXT_LENGTH_TITLE: "length of %1",
  TEXT_LENGTH_TOOLTIP: "Returns the number of letters (including spaces) in the provided text.",
  TEXT_ISEMPTY_HELPURL: "https://github.com/google/blockly/wiki/Text#checking-for-empty-text",
  TEXT_ISEMPTY_TITLE: "%1 is empty",
  TEXT_ISEMPTY_TOOLTIP: "Returns true if the provided text is empty.",
  TEXT_INDEXOF_HELPURL: "https://github.com/google/blockly/wiki/Text#finding-text",
  TEXT_INDEXOF_TOOLTIP: "Returns the index of the first/last occurrence of the first text in the second text. Returns %1 if text is not found.",
  TEXT_INDEXOF_TITLE: "in text %1 %2 %3",
  TEXT_INDEXOF_OPERATOR_FIRST: "find first occurrence of text",
  TEXT_INDEXOF_OPERATOR_LAST: "find last occurrence of text",
  TEXT_CHARAT_HELPURL: "https://github.com/google/blockly/wiki/Text#extracting-text",
  TEXT_CHARAT_TITLE: "in text %1 %2",
  TEXT_CHARAT_FROM_START: "get letter #",
  TEXT_CHARAT_FROM_END: "get letter # from end",
  TEXT_CHARAT_FIRST: "get first letter",
  TEXT_CHARAT_LAST: "get last letter",
  TEXT_CHARAT_RANDOM: "get random letter",
  TEXT_CHARAT_TAIL: "",
  TEXT_CHARAT_TOOLTIP: "Returns the letter at the specified position.",
  TEXT_GET_SUBSTRING_TOOLTIP: "Returns a specified portion of the text.",
  TEXT_GET_SUBSTRING_HELPURL: "https://github.com/google/blockly/wiki/Text#extracting-a-region-of-text",
  TEXT_GET_SUBSTRING_INPUT_IN_TEXT: "in text",
  TEXT_GET_SUBSTRING_START_FROM_START: "get substring from letter #",
  TEXT_GET_SUBSTRING_START_FROM_END: "get substring from letter # from end",
  TEXT_GET_SUBSTRING_START_FIRST: "get substring from first letter",
  TEXT_GET_SUBSTRING_END_FROM_START: "to letter #",
  TEXT_GET_SUBSTRING_END_FROM_END: "to letter # from end",
  TEXT_GET_SUBSTRING_END_LAST: "to last letter",
  TEXT_GET_SUBSTRING_TAIL: "",
  TEXT_CHANGECASE_HELPURL: "https://github.com/google/blockly/wiki/Text#adjusting-text-case",
  TEXT_CHANGECASE_TOOLTIP: "Return a copy of the text in a different case.",
  TEXT_CHANGECASE_OPERATOR_UPPERCASE: "to UPPER CASE",
  TEXT_CHANGECASE_OPERATOR_LOWERCASE: "to lower case",
  TEXT_CHANGECASE_OPERATOR_TITLECASE: "to Title Case",
  TEXT_TRIM_HELPURL: "https://github.com/google/blockly/wiki/Text#trimming-removing-spaces",
  TEXT_TRIM_TOOLTIP: "Return a copy of the text with spaces removed from one or both ends.",
  TEXT_TRIM_OPERATOR_BOTH: "trim spaces from both sides of",
  TEXT_TRIM_OPERATOR_LEFT: "trim spaces from left side of",
  TEXT_TRIM_OPERATOR_RIGHT: "trim spaces from right side of",
  TEXT_PRINT_HELPURL: "https://github.com/google/blockly/wiki/Text#printing-text",
  TEXT_PRINT_TITLE: "print %1",
  TEXT_PRINT_TOOLTIP: "Print the specified text, number or other value.",
  TEXT_PROMPT_HELPURL: "https://github.com/google/blockly/wiki/Text#getting-input-from-the-user",
  TEXT_PROMPT_TYPE_TEXT: "prompt for text with message",
  TEXT_PROMPT_TYPE_NUMBER: "prompt for number with message",
  TEXT_PROMPT_TOOLTIP_NUMBER: "Prompt for user for a number.",
  TEXT_PROMPT_TOOLTIP_TEXT: "Prompt for user for some text.",
  TEXT_COUNT_MESSAGE0: "count %1 in %2",
  TEXT_COUNT_HELPURL: "https://github.com/google/blockly/wiki/Text#counting-substrings",
  TEXT_COUNT_TOOLTIP: "Count how many times some text occurs within some other text.",
  TEXT_REPLACE_MESSAGE0: "replace %1 with %2 in %3",
  TEXT_REPLACE_HELPURL: "https://github.com/google/blockly/wiki/Text#replacing-substrings",
  TEXT_REPLACE_TOOLTIP: "Replace all occurances of some text within some other text.",
  TEXT_REVERSE_MESSAGE0: "reverse %1",
  TEXT_REVERSE_HELPURL: "https://github.com/google/blockly/wiki/Text#reversing-text",
  TEXT_REVERSE_TOOLTIP: "Reverses the order of the characters in the text.",
  LISTS_CREATE_EMPTY_HELPURL: "https://github.com/google/blockly/wiki/Lists#create-empty-list",
  LISTS_CREATE_EMPTY_TITLE: "create empty list",
  LISTS_CREATE_EMPTY_TOOLTIP: "Returns a list, of length 0, containing no data records",
  LISTS_CREATE_WITH_HELPURL: "https://github.com/google/blockly/wiki/Lists#create-list-with",
  LISTS_CREATE_WITH_TOOLTIP: "Create a list with any number of items.",
  LISTS_CREATE_WITH_INPUT_WITH: "create list with",
  LISTS_CREATE_WITH_CONTAINER_TITLE_ADD: "list",
  LISTS_CREATE_WITH_CONTAINER_TOOLTIP: "Add, remove, or reorder sections to reconfigure this list block.",
  LISTS_CREATE_WITH_ITEM_TOOLTIP: "Add an item to the list.",
  LISTS_REPEAT_HELPURL: "https://github.com/google/blockly/wiki/Lists#create-list-with",
  LISTS_REPEAT_TOOLTIP: "Creates a list consisting of the given value repeated the specified number of times.",
  LISTS_REPEAT_TITLE: "create list with item %1 repeated %2 times",
  LISTS_LENGTH_HELPURL: "https://github.com/google/blockly/wiki/Lists#length-of",
  LISTS_LENGTH_TITLE: "length of %1",
  LISTS_LENGTH_TOOLTIP: "Returns the length of a list.",
  LISTS_ISEMPTY_HELPURL: "https://github.com/google/blockly/wiki/Lists#is-empty",
  LISTS_ISEMPTY_TITLE: "%1 is empty",
  LISTS_ISEMPTY_TOOLTIP: "Returns true if the list is empty.",
  LISTS_INLIST: "in list",
  LISTS_INDEX_OF_HELPURL: "https://github.com/google/blockly/wiki/Lists#finding-items-in-a-list",
  LISTS_INDEX_OF_FIRST: "find first occurrence of item",
  LISTS_INDEX_OF_LAST: "find last occurrence of item",
  LISTS_INDEX_OF_TOOLTIP: "Returns the index of the first/last occurrence of the item in the list. Returns %1 if item is not found.",
  LISTS_GET_INDEX_HELPURL: "https://github.com/google/blockly/wiki/Lists#getting-items-from-a-list",
  LISTS_GET_INDEX_GET: "get",
  LISTS_GET_INDEX_GET_REMOVE: "get and remove",
  LISTS_GET_INDEX_REMOVE: "remove",
  LISTS_GET_INDEX_FROM_START: "#",
  LISTS_GET_INDEX_FROM_END: "# from end",
  LISTS_GET_INDEX_FIRST: "first",
  LISTS_GET_INDEX_LAST: "last",
  LISTS_GET_INDEX_RANDOM: "random",
  LISTS_GET_INDEX_TAIL: "",
  LISTS_INDEX_FROM_START_TOOLTIP: "%1 is the first item.",
  LISTS_INDEX_FROM_END_TOOLTIP: "%1 is the last item.",
  LISTS_GET_INDEX_TOOLTIP_GET_FROM: "Returns the item at the specified position in a list.",
  LISTS_GET_INDEX_TOOLTIP_GET_FIRST: "Returns the first item in a list.",
  LISTS_GET_INDEX_TOOLTIP_GET_LAST: "Returns the last item in a list.",
  LISTS_GET_INDEX_TOOLTIP_GET_RANDOM: "Returns a random item in a list.",
  LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FROM: "Removes and returns the item at the specified position in a list.",
  LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_FIRST: "Removes and returns the first item in a list.",
  LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_LAST: "Removes and returns the last item in a list.",
  LISTS_GET_INDEX_TOOLTIP_GET_REMOVE_RANDOM: "Removes and returns a random item in a list.",
  LISTS_GET_INDEX_TOOLTIP_REMOVE_FROM: "Removes the item at the specified position in a list.",
  LISTS_GET_INDEX_TOOLTIP_REMOVE_FIRST: "Removes the first item in a list.",
  LISTS_GET_INDEX_TOOLTIP_REMOVE_LAST: "Removes the last item in a list.",
  LISTS_GET_INDEX_TOOLTIP_REMOVE_RANDOM: "Removes a random item in a list.",
  LISTS_SET_INDEX_HELPURL: "https://github.com/google/blockly/wiki/Lists#in-list--set",
  LISTS_SET_INDEX_SET: "set",
  LISTS_SET_INDEX_INSERT: "insert at",
  LISTS_SET_INDEX_INPUT_TO: "as",
  LISTS_SET_INDEX_TOOLTIP_SET_FROM: "Sets the item at the specified position in a list.",
  LISTS_SET_INDEX_TOOLTIP_SET_FIRST: "Sets the first item in a list.",
  LISTS_SET_INDEX_TOOLTIP_SET_LAST: "Sets the last item in a list.",
  LISTS_SET_INDEX_TOOLTIP_SET_RANDOM: "Sets a random item in a list.",
  LISTS_SET_INDEX_TOOLTIP_INSERT_FROM: "Inserts the item at the specified position in a list.",
  LISTS_SET_INDEX_TOOLTIP_INSERT_FIRST: "Inserts the item at the start of a list.",
  LISTS_SET_INDEX_TOOLTIP_INSERT_LAST: "Append the item to the end of a list.",
  LISTS_SET_INDEX_TOOLTIP_INSERT_RANDOM: "Inserts the item randomly in a list.",
  LISTS_GET_SUBLIST_HELPURL: "https://github.com/google/blockly/wiki/Lists#getting-a-sublist",
  LISTS_GET_SUBLIST_START_FROM_START: "get sub-list from #",
  LISTS_GET_SUBLIST_START_FROM_END: "get sub-list from # from end",
  LISTS_GET_SUBLIST_START_FIRST: "get sub-list from first",
  LISTS_GET_SUBLIST_END_FROM_START: "to #",
  LISTS_GET_SUBLIST_END_FROM_END: "to # from end",
  LISTS_GET_SUBLIST_END_LAST: "to last",
  LISTS_GET_SUBLIST_TAIL: "",
  LISTS_GET_SUBLIST_TOOLTIP: "Creates a copy of the specified portion of a list.",
  LISTS_SORT_HELPURL: "https://github.com/google/blockly/wiki/Lists#sorting-a-list",
  LISTS_SORT_TITLE: "sort %1 %2 %3",
  LISTS_SORT_TOOLTIP: "Sort a copy of a list.",
  LISTS_SORT_ORDER_ASCENDING: "ascending",
  LISTS_SORT_ORDER_DESCENDING: "descending",
  LISTS_SORT_TYPE_NUMERIC: "numeric",
  LISTS_SORT_TYPE_TEXT: "alphabetic",
  LISTS_SORT_TYPE_IGNORECASE: "alphabetic, ignore case",
  LISTS_SPLIT_HELPURL: "https://github.com/google/blockly/wiki/Lists#splitting-strings-and-joining-lists",
  LISTS_SPLIT_LIST_FROM_TEXT: "make list from text",
  LISTS_SPLIT_TEXT_FROM_LIST: "make text from list",
  LISTS_SPLIT_WITH_DELIMITER: "with delimiter",
  LISTS_SPLIT_TOOLTIP_SPLIT: "Split text into a list of texts, breaking at each delimiter.",
  LISTS_SPLIT_TOOLTIP_JOIN: "Join a list of texts into one text, separated by a delimiter.",
  LISTS_REVERSE_HELPURL: "https://github.com/google/blockly/wiki/Lists#reversing-a-list",
  LISTS_REVERSE_MESSAGE0: "reverse %1",
  LISTS_REVERSE_TOOLTIP: "Reverse a copy of a list.",
  ORDINAL_NUMBER_SUFFIX: "",
  VARIABLES_GET_HELPURL: "https://github.com/google/blockly/wiki/Variables#get",
  VARIABLES_GET_TOOLTIP: "Returns the value of this variable.",
  VARIABLES_GET_CREATE_SET: "Create 'set %1'",
  VARIABLES_SET_HELPURL: "https://github.com/google/blockly/wiki/Variables#set",
  VARIABLES_SET: "set %1 to %2",
  VARIABLES_SET_TOOLTIP: "Sets this variable to be equal to the input.",
  VARIABLES_SET_CREATE_GET: "Create 'get %1'",
  PROCEDURES_DEFNORETURN_HELPURL: "https://en.wikipedia.org/wiki/Subroutine",
  PROCEDURES_DEFNORETURN_TITLE: "to",
  PROCEDURES_DEFNORETURN_PROCEDURE: "do something",
  PROCEDURES_BEFORE_PARAMS: "with:",
  PROCEDURES_CALL_BEFORE_PARAMS: "with:",
  PROCEDURES_CALL_DISABLED_DEF_WARNING: "Can't run the user-defined function '%1' because the definition block is disabled.",
  PROCEDURES_DEFNORETURN_DO: "",
  PROCEDURES_DEFNORETURN_TOOLTIP: "Creates a function with no output.",
  PROCEDURES_DEFNORETURN_COMMENT: "Describe this function...",
  PROCEDURES_DEFRETURN_HELPURL: "https://en.wikipedia.org/wiki/Subroutine",
  PROCEDURES_DEFRETURN_RETURN: "return",
  PROCEDURES_DEFRETURN_TOOLTIP: "Creates a function with an output.",
  PROCEDURES_ALLOW_STATEMENTS: "allow statements",
  PROCEDURES_DEF_DUPLICATE_WARNING: "Warning: This function has duplicate parameters.",
  PROCEDURES_CALLNORETURN_HELPURL: "https://en.wikipedia.org/wiki/Subroutine",
  PROCEDURES_CALLNORETURN_TOOLTIP: "Run the user-defined function '%1'.",
  PROCEDURES_CALLRETURN_HELPURL: "https://en.wikipedia.org/wiki/Subroutine",
  PROCEDURES_CALLRETURN_TOOLTIP: "Run the user-defined function '%1' and use its output.",
  PROCEDURES_MUTATORCONTAINER_TITLE: "inputs",
  PROCEDURES_MUTATORCONTAINER_TOOLTIP: "Add, remove, or reorder inputs to this function.",
  PROCEDURES_MUTATORARG_TITLE: "input name:",
  PROCEDURES_MUTATORARG_TOOLTIP: "Add an input to the function.",
  PROCEDURES_HIGHLIGHT_DEF: "Highlight function definition",
  PROCEDURES_CREATE_DO: "Create '%1'",
  PROCEDURES_IFRETURN_TOOLTIP: "If a value is true, then return a second value.",
  PROCEDURES_IFRETURN_HELPURL: "https://c2.com/cgi/wiki?GuardClause",
  PROCEDURES_IFRETURN_WARNING: "Warning: This block may be used only within a function definition.",
  WORKSPACE_COMMENT_DEFAULT_TEXT: "Say something...",
  WORKSPACE_ARIA_LABEL: "Blockly Workspace",
  COLLAPSED_WARNINGS_WARNING: "Collapsed blocks contain warnings.",
  DIALOG_OK: "OK",
  DIALOG_CANCEL: "Cancel"
};

// src/lib/function.ts
function generateFunctionNameMap(blockDefinitions) {
  let out = {};
  for (let def of blockDefinitions) {
    addNewFunctionName(def, out);
  }
  return out;
}
function addNewFunctionName(def, out) {
  let message = getEn(def.message0);
  let functionName = processMessage(message).trim();
  if (functionName.length == 0) {
    functionName = processType(def.type);
  }
  if (out[functionName] != null) {
    functionName = processType(def.type);
  }
  if (out[functionName] != null) {
    throw new Error(`Duplicate, unresolvable function name ${functionName}`);
  }
  out[functionName] = def.type;
}
function getEn(text2) {
  let match;
  let newText = text2;
  while (match = newText.match(/%{BKY_([^}]+)}/)) {
    let key = match[1];
    let value = en[key];
    if (value == null) {
      throw new Error(`Could not find key ${key} in en`);
    }
    newText = newText.replace(match[0], value);
  }
  return newText;
}
function processMessage(message) {
  let cleaned = message.replace(/%[0-9]+/g, "");
  cleaned = cleaned.replace(/[^a-zA-Z0-9 ]/g, "");
  let words = cleaned.split(" ");
  return words.map((word, i) => {
    if (i === 0) {
      return word.toLowerCase();
    } else {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
  }).join("");
}
function processType(type) {
  let parts = type.split("_");
  return parts.map((part, i) => {
    if (i === 0) {
      return part;
    } else {
      return part.charAt(0).toUpperCase() + part.slice(1);
    }
  }).join("");
}
var genericVarNames = ["T", "U", "V", "W", "X", "Y", "Z"];
function generateFunction(def, map, style = "codegen") {
  if (def.$codegenNoFunction) {
    return null;
  }
  let functionName = map[def.type];
  let out = "";
  if (style == "codegen") {
    out += `
    /**
     * Function generated for "${def.type}" block. 
     * 
    `;
  }
  let args = def.args0 ?? [];
  let genericStrings = [];
  let argStrings = [];
  let argDescs = [];
  let genericVarNameIndex = 0;
  for (let arg of args) {
    let res = generateArg(arg);
    if (res == null)
      continue;
    switch (res.tag) {
      case "normal": {
        argStrings.push(res.argString);
        argDescs.push(res.argDesc);
        break;
      }
      case "generic": {
        let next = genericVarNames[genericVarNameIndex];
        if (next == null) {
          throw new Error(`Too many generic variables in ${def.type}`);
        }
        let { argString, argDesc, genericString } = res.create(next);
        argStrings.push(argString);
        argDescs.push(argDesc);
        genericStrings.push(genericString);
        break;
      }
    }
  }
  if (style == "codegen") {
    for (let desc of argDescs) {
      out += ` * ${desc}
`;
    }
    out += ` */
`;
  }
  if (style == "codegen") {
    out += `${functionName}: `;
  } else {
    out += `function ${functionName}`;
  }
  if (genericStrings.length > 0) {
    out += `<${genericStrings.join(", ")}>`;
  }
  out += `(`;
  if (def.$codegenCustomFunctionArgs) {
    out += def.$codegenCustomFunctionArgs;
  } else {
    out += argStrings.join(", ");
  }
  if (style == "codegen") {
    out += `) => ${generateReturnType(def)};`;
  } else {
    out += `): ${generateReturnType(def)};`;
  }
  return out;
}
function generateArg(arg) {
  if (arg.type == "input_dummy") {
    return null;
  }
  let argName = arg.name;
  function normal(type, input) {
    return {
      tag: "normal",
      argString: `${argName}: ${type}`,
      argDesc: input ? `@param ${argName} - An input block.` : `@param ${argName} - A field. It must be a literal, non-dynamic value.`
    };
  }
  switch (arg.type) {
    case "input_value": {
      return normal(checkToType(arg.check), true);
    }
    case "input_statement": {
      throw new Error("Statement args not supported");
    }
    case "field_colour": {
      return normal("Color", false);
    }
    case "field_dropdown": {
      return normal(arg.options.map((o) => `'${o[1]}'`).join(" | "), false);
    }
    case "field_number": {
      return normal("number", false);
    }
    case "field_variable": {
      throw new Error("Variable args not supported");
    }
    case "field_input": {
      return normal("string", false);
    }
    default:
      throw new Error("Unknown argument type: " + arg);
  }
}
function generateReturnType(def) {
  if (!def.hasOwnProperty("output")) {
    return "void";
  }
  return checkToType(def.output);
}
function checkToType(check) {
  switch (check) {
    case "Number":
      return "number";
    case "String":
      return "string";
    case "Boolean":
      return "boolean";
    case null:
      return "any";
    case void 0:
      return "any";
    default:
      return check.map(checkToType).join(" | ");
  }
}

// src/lib/blocks.ts
function generate2(definitions2) {
  let out = `import * as Basic from './basic'
`;
  let groups = {
    NumberValueBlock: [],
    StringValueBlock: [],
    BooleanValueBlock: [],
    MaybeNumberValueBlock: [],
    MaybeStringValueBlock: [],
    MaybeBooleanValueBlock: [],
    ValueBlock: [],
    StatementBlock: [],
    Block: []
  };
  for (let definition of definitions2) {
    out += generateBlock(definition);
    let name = definitionBlockTypeName(definition);
    groups.Block.push(name);
    if (definition.hasOwnProperty("output")) {
      groups.ValueBlock.push(name);
      switch (definition.output) {
        case "Boolean":
          groups.BooleanValueBlock.push(name);
          break;
        case "String":
          groups.StringValueBlock.push(name);
          break;
        case "Number":
          groups.NumberValueBlock.push(name);
          break;
        case null:
          groups.MaybeBooleanValueBlock.push(name);
          groups.MaybeStringValueBlock.push(name);
          groups.MaybeNumberValueBlock.push(name);
          break;
        default:
          for (let check of definition.output) {
            switch (check) {
              case "Boolean":
                groups.MaybeBooleanValueBlock.push(name);
                break;
              case "String":
                groups.MaybeStringValueBlock.push(name);
                break;
              case "Number":
                groups.MaybeNumberValueBlock.push(name);
                break;
              default:
                throw new Error(`Unknown check ${check}`);
            }
          }
      }
    } else if (definition.hasOwnProperty("previousStatement")) {
      groups.StatementBlock.push(name);
    } else {
      throw new Error(`Block is neither statement nor value ${definition}`);
    }
  }
  for (let [name, blocks] of Object.entries(groups)) {
    out += `export type ${name} = ${blocks.join(" | ")};
`;
  }
  out += `export const blockDefinitions = ${JSON.stringify(
    definitions2
  )} as const;
`;
  out += `export const functionNameMap: Record<string, string> = ${JSON.stringify(
    generateFunctionNameMap(definitions2)
  )};
`;
  return out;
}
function generateBlock(definition) {
  let out = `export type ${definitionBlockTypeName(
    definition
  )} = Basic.BlockBase & `;
  if (definition?.$codegenIntersectsWith != null) {
    out += `(${definition.$codegenIntersectsWith}) & `;
  }
  out += `{
  type: '${definition.type}';`;
  let [fields, inputs] = definitionFieldsInputs(definition);
  if (fields != null) {
    out += `fields: ${fields};`;
  }
  if (inputs != null) {
    out += `inputs: ${inputs};`;
  }
  if (definition.hasOwnProperty("nextStatement")) {
    out += `next?: { block: StatementBlock };`;
  }
  out += `};
`;
  return out;
}
function definitionBlockTypeName(definition) {
  let parts = definition.type.split("_");
  return parts.map((part) => {
    let firstChar = part.at(0);
    if (firstChar === void 0) {
      return "";
    }
    return firstChar.toUpperCase() + part.slice(1);
  }).join("") + "Block";
}
function definitionFieldsInputs(definition) {
  let fields = [];
  let inputs = [];
  for (let arg of definition.args0 ?? []) {
    switch (arg.type) {
      case "input_value": {
        inputs.push(`${arg.name}?: { block: ${checkToBlockType(arg.check)} }`);
        break;
      }
      case "input_dummy": {
        break;
      }
      case "input_statement": {
        inputs.push(`${arg.name}?: { block: StatementBlock }`);
        break;
      }
      case "field_colour": {
        fields.push(`${arg.name}?: Basic.Color`);
        break;
      }
      case "field_dropdown": {
        fields.push(
          `${arg.name}?: ${arg.options.map((o) => `"${o[1]}"`).join(" | ")}`
        );
        break;
      }
      case "field_variable": {
        fields.push(`${arg.name}?: { id: Basic.Id }`);
        break;
      }
      case "field_number": {
        fields.push(`${arg.name}?: number`);
        break;
      }
      case "field_input": {
        fields.push(`${arg.name}?: string`);
        break;
      }
      default:
        throw new Error(`Unknown arg type ${arg}`);
    }
  }
  let inputsRet = inputs.length > 0 ? `{${inputs.join(", ")}}` : null;
  let fieldsRet = fields.length > 0 ? `{${fields.join(", ")}}` : null;
  if (definition.$codegenCustomInputsType != null) {
    inputsRet = definition.$codegenCustomInputsType;
  }
  return [fieldsRet, inputsRet];
}
function checkToBlockType(check) {
  if (check == null) {
    return "ValueBlock";
  }
  switch (check) {
    case "Number":
      return "(NumberValueBlock | MaybeNumberValueBlock)";
    case "String":
      return "(StringValueBlock | MaybeStringValueBlock)";
    case "Boolean":
      return "(BooleanValueBlock | MaybeBooleanValueBlock)";
    case null:
      return "ValueBlock";
    default:
      return check.map((c) => checkToBlockType(c)).join(" | ");
  }
}

// src/lib/device.ts
function generate3(defs) {
  let map = generateFunctionNameMap(defs);
  let reverseMap = {};
  for (let key in map) {
    reverseMap[map[key]] = key;
  }
  let out = `
import { Color } from './basic';

/**
 * A literal number which isn't dynamically created. Used to specify block fields, which can't be dynamic.

/**
 * The union of all possible devices.
 * 
 * @remarks
 * No actual device will have all of these functions. The user
 * must ensure that the device they are using has these functions.
 */
export type Union = {`;
  for (let def of defs) {
    let functionString = generateFunction(def, reverseMap);
    if (functionString == null) {
      continue;
    }
    out += functionString;
  }
  out += `
};`;
  return out;
}

// src/lib/docs.ts
import { writeFileSync as writeFileSync2 } from "fs";
import * as prettier from "prettier";
var STYLES = `
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
async function generate4(defs) {
  let map = generateFunctionNameMap(defs);
  let reverseMap = {};
  for (let key in map) {
    reverseMap[map[key]] = key;
  }
  let out = `
# Block to JavaScript code conversion table

## Guide

**Block Type & Example**: The built-in type field of the block, and a visual representation of the block.

**JavaScript Function**: The JavaScript function that converts to the block. 
  - The function name is created using a simple algorithm:
      - If there's text written on the block, punctuation is removed and the text is converted to camelCase to make the function name.
      - If there's no text written on the block or there's a name collision, the function name is the block type converted to camelCase.
  - Doesn't exist for some blocks where it's not possible (for example \`if\`)\u2014see the Sugar column in that case. 

  
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
function styleToHue(style) {
  switch (style) {
    case "logic_blocks":
      return 210;
    case "math_blocks":
      return 230;
    case "text_blocks":
      return 161;
    case "variable_blocks":
      return 329;
    default:
      return 0;
  }
}
function encloseInTypescriptOrEmpty(string, empty) {
  if (string == null) {
    return empty;
  }
  return `

\`\`\`typescript
${string}
\`\`\`

`;
}
async function generateRow(def, functionNameMap) {
  let blockString = generateBlockHtml(def);
  let unformattedFunctionString = generateFunction(
    def,
    functionNameMap,
    "docs"
  );
  let functionString = encloseInTypescriptOrEmpty(
    unformattedFunctionString == null ? null : (await prettier.format(unformattedFunctionString, {
      parser: "typescript"
    })).trim(),
    "no function"
  );
  let sugarString = encloseInTypescriptOrEmpty(def.$codegenSugar, "no sugar");
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
function wrapInSvg(html, name) {
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
  writeFileSync2(`./docs/svg/${name}.svg`, out);
  return `
  <img src="./svg/${name}.svg" width="500" alt="css-in-readme">
`;
}
function generateBlockHtml(def) {
  let out = `
  <div class="block"`;
  out += ` style="--block-hue: ${def.colour ?? styleToHue(def.style ?? "")}"`;
  out += `>`;
  out += generateBlockMessage(def);
  out += `</div>`;
  return wrapInSvg(out, def.type);
}
function generateBlockMessage(def) {
  let out = getEn(def.message0);
  if (def.args0 == null)
    return out;
  for (let i = 0; i < def.args0.length; i++) {
    let num = i + 1;
    if (out.includes(`%${num}`)) {
      out = out.replace(`%${num}`, generateArgHtml(def.args0[i]));
    }
  }
  return out;
}
function generateArgHtml(arg) {
  switch (arg.type) {
    case "input_value":
      return `<span class="hole"></span>`;
    case "input_dummy":
      return "";
    case "input_statement":
      return `<span class="hole"></span>`;
    case "field_colour":
      return `<span class="field color"></span>`;
    case "field_dropdown":
      let optString = arg.options[0][0];
      return `<span class="field">${getEn(optString)}</span>`;
    case "field_number":
      return `<span class="field">0</span>`;
    case "field_variable":
      return `<span class="field">x</span>`;
    case "field_input":
      return `<span class="field">text</span>`;
    default:
      throw new Error(`Unknown arg type: ${arg}`);
  }
}

// src/generate.ts
import { writeFileSync as writeFileSync3 } from "fs";
import Ajv from "ajv";

// src/lib/primitive.ts
function primitiveBlocksMatchesBlockCategories(primitiveBlocks, customBlocks, blockCategories) {
  let definitionsTypeSet = new Set(primitiveBlocks.map((block) => block.type));
  let forceIncludeTypeSet = new Set(
    primitiveBlocks.filter((block) => block.$codegenForceInclude).map((block) => block.type)
  );
  let customTypeSet = new Set(customBlocks.map((block) => block.type));
  let categoriesTypeSet = new Set(
    blockCategories.filter((category) => category.name != "Essentials").flatMap((category) => category.blocks.map((block) => block.type))
  );
  let missingTypes = Array.from(categoriesTypeSet.values()).filter(
    (type) => !definitionsTypeSet.has(type) && !customTypeSet.has(type)
  );
  if (missingTypes.length > 0) {
    throw new Error(
      `Block definitions missing for types: ${missingTypes.join(", ")}`
    );
  }
  let extraTypes = Array.from(definitionsTypeSet.values()).filter(
    (type) => !categoriesTypeSet.has(type) && !forceIncludeTypeSet.has(type)
  );
  if (extraTypes.length > 0) {
    throw new Error(
      `Extra block definitions for types: ${extraTypes.join(", ")}`
    );
  }
}

// src/generate.ts
var ajv = new Ajv();
var schemas2 = get();
var validateBlockDefinitions = ajv.compile(schemas2["blockDefinitions"]);
var validateBlockCategories = ajv.compile(schemas2["blockCategories"]);
function getBlockCategories() {
  let ret = JSON.parse(codeGrids.blockCategories);
  if (!validateBlockCategories(ret)) {
    console.error(validateBlockCategories.errors);
    throw new Error("Invalid block categories");
  }
  return ret;
}
function getCustomBlocks() {
  let ret = JSON.parse(codeGrids.customBlocks);
  if (!validateBlockDefinitions(ret)) {
    console.error(validateBlockDefinitions.errors);
    throw new Error("Invalid custom blocks");
  }
  return ret;
}
function getPrimitiveBlocks() {
  if (!validateBlockDefinitions(definitions)) {
    console.error(validateBlockDefinitions.errors);
    throw new Error("Invalid primitive blocks");
  }
  return definitions;
}
var primitiveBlockDefinitions = getPrimitiveBlocks();
var customBlockDefinitions = getCustomBlocks();
var blockDefs = [
  ...primitiveBlockDefinitions,
  ...customBlockDefinitions
];
primitiveBlocksMatchesBlockCategories(
  primitiveBlockDefinitions,
  customBlockDefinitions,
  getBlockCategories()
);
writeFileSync3("./src/lib/blocks/generated.ts", generate2(blockDefs));
writeFileSync3("./src/lib/device/generated.ts", generate3(blockDefs));
writeFileSync3("./docs/functions.md", await generate4(blockDefs));
