
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { firstAccount } = await getNamedAccounts();
    log("----------------------------------------------------");
    log("Deploying NFT and waiting for confirmations...");

    const args = ["MyTokenOne", "MT"]; // Replace with your NFT name and symbol
    const nft = await deploy("MyToken", {
        contract: "MyToken",
        from: firstAccount,
        args: args,
        log: true
    });

    log(`NFT deployed at ${nft.address}`);
}
module.exports.tags = ["all", "sourcechain"]