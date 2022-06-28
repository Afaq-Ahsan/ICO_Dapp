var fs =  require('fs');

var jsonFile = "./build/contracts/ICO_Contract.json";

var parsed = JSON.parse(fs.readFileSync(jsonFile));

var abi = parsed.abi;

module.exports = abi;