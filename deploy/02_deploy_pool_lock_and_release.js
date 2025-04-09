const { network } = require("hardhat")
const { devlopmentChains,networkConfig } = require('../helper-hardhat-config')
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
    if (devlopmentChains.includes(network.name)) {
        const ccipSimulatorDeployment = await deployments.get("CCIPLocalSimulator")
        const ccipSimulator = await ethers.getContractAt("CCIPLocalSimulator", ccipSimulatorDeployment.address)
        const ccipSimulatorConfig = await ccipSimulator.configuration()
        sourceChainRouter = ccipSimulatorConfig.sourceRouter_
        linkToken = ccipSimulatorConfig.linkToken_
        log(`local environment: sourcechain router: ${sourceChainRouter}, link token: ${linkToken}`) 
    }else{
         // get router and linktoken based on network
         sourceChainRouter = networkConfig[network.config.chainId].router
         linkToken = networkConfig[network.config.chainId].linkToken
         log(`non local environment: sourcechain router: ${sourceChainRouter}, link token: ${linkToken}`)
    }
   


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