require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ethers");
require("hardhat-deploy");
require("hardhat-deploy-ethers");
//require('dotenv').config()
require('@chainlink/env-enc').config()
require("./task")
//这会触发 index.js 文件的执行，从而加载并注册所有任务文件中的任务
//index.js 的作用是作为任务文件的入口点，统一加载并导出所有任务文件中的任务定义。通过这种方式，你可以在 hardhat.config.js 中只需加载一次 index.js，就能注册所有任务，简化了任务的管理和使用
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
