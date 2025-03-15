require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

module.exports = {
  solidity: "0.8.20",
  networks: {
    mainnet: {
      url: "https://eth-mainnet.g.alchemy.com/v2/XTtM1j8xY6fF2GOkqD9dGZERJKMmJAJU",
      accounts: [process.env.PRIVATE_KEY], // Make sure to store PRIVATE_KEY in .env file
    },
    goerli: {
      url: "https://eth-goerli.g.alchemy.com/v2/XTtM1j8xY6fF2GOkqD9dGZERJKMmJAJU",
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};

