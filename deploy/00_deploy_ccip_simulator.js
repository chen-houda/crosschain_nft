const { network } = require("hardhat")
const { devlopmentChains } = require('../helper-hardhat-config')
module.exports = async ({ getNamedAccounts, deployments }) => {
    if (devlopmentChains.includes(network.name)) {
        const { deploy, log } = deployments;
        const { firstAccount } = await getNamedAccounts();
        log("----------------------------------------------------");
        log("Deploying ccip simulator...");

        const ccip = await deploy("CCIPLocalSimulator", {
            contract: "CCIPLocalSimulator",
            from: firstAccount,
            args: [],
            log: true
        });

        log(`ccip deployed at ${ccip.address}`);
    } else {
        console.log("CCIPLocalSimulator is only deployed on development chains")
    }

}
module.exports.tags = ["all", "test"]