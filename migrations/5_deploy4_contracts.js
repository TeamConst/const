const Tickets = artifacts.require("Tickets");

module.exports = async function (deployer4, network, accounts) {
  await deployer4.deploy(Tickets);
};
