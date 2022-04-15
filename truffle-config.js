require("dotenv").config();

const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privateKeys = process.env.PRIVATE_KEYS || "";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", //match any network id
    },

    rinkeby: {
      provider: function () {
        return new HDWalletProvider(
          privateKeys.split(","), // array of private keys
          `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}` // Url to an Ethereum node
        );
      },
      gas: 5000000,
      gasPrice: 25000000000,
      network_id: 4,
    },

    // ropsten: {
    //   provider: function () {
    //     return new HDWalletProvider(
    //       mnemonic,
    //       "https://ropsten.infura.io/v3/84bae3d7e7a745c5830e69ba34961d6f"
    //     );
    //   },
    //   test: {
    //     provider: function () {
    //       return new HDWalletProvider(mnemonic, "http://127.0.0.1:8545/");
    //     },
    //     network_id: "*",
    //   },
    // },
  },
  contracts_directory: "./contracts",
  contracts_build_directory: "./build/contracts",

  // Configure your compilers
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      version: "^0.8.0",
    },
  },
};
