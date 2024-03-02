require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require('hardhat-contract-sizer');

// Compile: npx hardhat compile
// Run tests: npx hardhat test
// Deploy: npx hardhat run scripts/deploy.js --network rinkeby
// Verify contract: npx hardhat verify --network rinkeby DEPLOYED_CONTRACT_ADDRESS
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

module.exports = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    ropsten: {
      url: process.env.ROPSTEN_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 3,
      gasPrice: 40000000000,
      timeout: 500000
    },
     rinkeby: {
      url: process.env.RINKEBY_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 4,
      gasPrice: 100000000000,
      timeout: 500000
    },
    local: {
      url: 'http://localhost:8545',
    },
    mainnet: {
      url: process.env.MAINNET_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 97,
      gasPrice: 10000000000,
    }
  },
  contractSizer: {
  alphaSort: true,
  disambiguatePaths: false,
  runOnCompile: true,
  strict: true,
  only: [],
  },
  // run: npx hardhat test
  // to see results of gas reporter
  gasReporter: {
    currency: 'ETH', // USD, EUR etc
    gasPrice: 120,
    enabled: true,
    coinmarketcap: process.env.CMC_API,
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
