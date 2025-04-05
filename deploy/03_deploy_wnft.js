
module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments;
    const { firstAccount } = await getNamedAccounts();
    log("----------------------------------------------------");
    log("Deploying WNFT and waiting for confirmations...");

    const args = ["WrappedMyTokenOne", "WMT"]; // Replace with your NFT name and symbol
    const nft = await deploy("WrappedMyToken", {
        contract: "WrappedMyToken",
        from: firstAccount,
        args: args,
        log: true
    });

    log(`WNFT deployed at ${nft.address}`);
}
module.exports.tags = ["all", "destchain"]