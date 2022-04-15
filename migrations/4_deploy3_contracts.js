const ConstContract = artifacts.require("ConstContract");

module.exports = async function (deployer3, network, accounts) {
  await deployer3.deploy(ConstContract);
};
