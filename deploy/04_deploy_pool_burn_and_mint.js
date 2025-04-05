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
    const ccipSimulatorDeployment = await deployments.get("CCIPLocalSimulator")
    const ccipSimulator = await ethers.getContractAt("CCIPLocalSimulator", ccipSimulatorDeployment.address)
    const ccipSimulatorConfig = await ccipSimulator.configuration()
    destChainRouter = ccipSimulatorConfig.destinationRouter_
    linkToken = ccipSimulatorConfig.linkToken_


    const wnftTx = await deployments.get("WrappedMyToken")
    wnftAddr = wnftTx.address
    log(`NFT address: ${wnftAddr}`)

    const nft = await deploy("NFTPoolBurnAndMint", {
        contract: "NFTPoolBurnAndMint",
        from: firstAccount,
        args: [destChainRouter, linkToken, wnftAddr],
        log: true
    });

    log("NFTPoolBurndeAndMint deployed successful ...");

}
module.exports.tags = ["all", "destchain"]