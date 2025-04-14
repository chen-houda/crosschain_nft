require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
//require('dotenv').config()
require('@chainlink/env-enc').config()

const SEPOLIA_RPC_URL = process.env.SEPOLIA_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const AMOY_RPC_URL = process.env.AMOY_URL

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.22"
      },
      {
        version: "0.8.19"
      },
      {
        version: "0.8.24"
      }
    ]
  },
  namedAccounts: {
    firstAccount: {
      default: 0
    },
    secondAccount: {
      default: 1
    }
  }, networks: {
    sepolia: {
      url: SEPOLIA_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 11155111,//sepolia chain id
      blockConfirmations: 6
    },
    amoy: {
      url: AMOY_RPC_URL,
      accounts: [PRIVATE_KEY],
      chainId: 80002,//sepolia chain id
      blockConfirmations: 6
    }
  }
};
