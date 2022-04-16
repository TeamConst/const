const Tickets = artifacts.require("Tickets");

module.exports = async function(deployer2, network, accounts) {
    await deployer2.deploy(Tickets);
};
