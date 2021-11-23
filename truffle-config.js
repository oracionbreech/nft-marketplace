require("dotenv").config();

const HDWalletProvider = require("truffle-hdwallet-provider-privkey");
const privateKeys = process.env.PRIVATE_KEYS || "";
const privateKey =
  "8b0de449eecc4b476692c160a50f63cb9997b0450b65fd7f4a832bec39416720";
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", //match any network id
    },
    testnet: {
      provider: () =>
        new HDWalletProvider(
          [privateKey],
          `https://data-seed-prebsc-1-s1.binance.org:8545`
        ),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
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
  },
  contracts_directory: "./src/contracts",
  contracts_build_directory: "./src/abis",

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
