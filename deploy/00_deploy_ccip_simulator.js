
module.exports = async ({ getNamedAccounts, deployments }) => {
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

    log(`ccip deployed at ${nft.address}`);
}
module.exports.tags = ["all", "test"]