module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { firstAccount } = await getNamedAccounts();
    log("----------------------------------------------------");
    log("NFTPoolLockAndRelease deploying...");
    // get parameters for constructor
    /**
     *    address _router,
          address _link,
          address nftAddr
     */
    let sourceChainRouter
    let linkToken
    let nftAddr
    const ccipSimulatorDeployment = await deployments.get("CCIPLocalSimulator")
    const ccipSimulator = await ethers.getContractAt("CCIPLocalSimulator", ccipSimulatorDeployment.address)
    const ccipSimulatorConfig = await ccipSimulator.configuration()
    sourceChainRouter = ccipSimulatorConfig.sourceRouter_
    linkToken = ccipSimulatorConfig.linkToken_


    const nftTx = await deployments.get("MyToken")
    nftAddr = nftTx.address
    log(`NFT address: ${nftAddr}`)

    const nft = await deploy("NFTPoolLockAndRelease", {
        contract: "NFTPoolLockAndRelease",
        from: firstAccount,
        args: [sourceChainRouter, linkToken, nftAddr],
        log: true
    });

    log("NFTPoolLockAndRelease deployed successful ...");

}
module.exports.tags = ["all", "sourcechain"]