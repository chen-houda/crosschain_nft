const { network } = require("hardhat")
const { devlopmentChains, networkConfig } = require('../helper-hardhat-config')
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { firstAccount } = await getNamedAccounts();
    log("----------------------------------------------------");
    log("NFTPoolBurndeAndMint deploying...");
    // get parameters for constructor
    /**
     *    address _router,
          address _link,
          address nftAddr
     */
    let destChainRouter
    let linkToken
    let wnftAddr
    //let wnftAddr = "0x5f80bC9a2f9E2973533E1aB73B735Bfb4dc1e3A4"
    if (devlopmentChains.includes(network.name)) {
        const ccipSimulatorDeployment = await deployments.get("CCIPLocalSimulator")
        const ccipSimulator = await ethers.getContractAt("CCIPLocalSimulator", ccipSimulatorDeployment.address)
        const ccipSimulatorConfig = await ccipSimulator.configuration()
        destChainRouter = ccipSimulatorConfig.destinationRouter_
        linkToken = ccipSimulatorConfig.linkToken_
    } else {
        destChainRouter = networkConfig[network.config.chainId].router
        linkToken = networkConfig[network.config.chainId].linkToken
    }



    const wnftTx = await deployments.get("WrappedMyToken")
    wnftAddr = wnftTx.address
    log(`WNFT address: ${wnftAddr}`)

    const nft = await deploy("NFTPoolBurnAndMint", {
        contract: "NFTPoolBurnAndMint",
        from: firstAccount,
        args: [destChainRouter, linkToken, wnftAddr],
        log: true
    });

    log("NFTPoolBurndeAndMint deployed successful ...");

}
module.exports.tags = ["all", "destchain"]