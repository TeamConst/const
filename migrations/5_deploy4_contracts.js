const NFTCollection = artifacts.require("NFTCollection");
const A = artifacts.require("A");

module.exports = async function (deployer4) {
  // await deployer4.deploy(A);
  await deployer4.deploy(NFTCollection);

  const deployedNFT = await NFTCollection.deployed();
  const NFTAddress = deployedNFT.address;
  await deployer4.deploy(A, NFTAddress);
};
