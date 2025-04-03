module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { firstAccount } = await getNamedAccounts();
    log("----------------------------------------------------");
    log("NFTPoolLockAndRelease deploying...");
    // get parameters for constructor
    let sourceChainRouter
    let linkToken
    let nftAddr

    const nft = await deploy("NFTPoolLockAndRelease", {
        contract: "nFTPoolLockAndRelease",
        from: firstAccount,
        args: args,
        log: true
    });
    const nftTx = await deployments.get("MyToken")
    nftAddr = nftTx.address
    log(`NFT address: ${nftAddr}`)

}
module.exports.tags = ["all", "sourcechain"]