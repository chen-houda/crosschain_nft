module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { deployer } = await getNamedAccounts();
    const chainId = network.config.chainId;

    log("----------------------------------------------------");
    log("Deploying NFT and waiting for confirmations...");

    const args = [];
    const nft = await deploy("NFT", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    });

    log(`NFT deployed at ${nft.address}`);
}
module.exports.tags = ["all", "sourcechain"]