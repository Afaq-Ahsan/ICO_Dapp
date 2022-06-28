const ICO_Contract = artifacts.require("ICO_Contract");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(ICO_Contract, accounts[0]);
};
