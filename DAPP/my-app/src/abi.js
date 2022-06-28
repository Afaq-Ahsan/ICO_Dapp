import { readFileSync } from "fs";

var jsonFile = require("./ICO_Contract.json");
console.log(jsonFile);
var parsed = JSON.parse(readFileSync(jsonFile.abi));

var abi = parsed.abi;

export default abi;
