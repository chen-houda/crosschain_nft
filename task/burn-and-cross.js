const { task } = require("hardhat/config")
const { networkConfig } = require("../helper-hardhat-config")

task("burn-and-cross")
    .addParam("tokenid", "tokenId to be locked and crossed")
    .addOptionalParam("chainselector", "chain selector of destination chain")
    .addOptionalParam("receiver", "receiver in the destination chain")
    .setAction(async (taskArgs, hre) => {
        // get tokenId from parameter
        const tokenId = taskArgs.tokenid
        let chainselector
        let receiver
        const tokenid = taskArgs
        const { firstAccount } = await getNamedAccounts()
        if (taskArgs.chainselector) {
            chainselector = taskArgs.chainselector
        } else {
            chainselector = networkConfig[network.config.chainId].companionChainSelector
            console.log(`chainselector is not set in commoned`)
        }
        console.log(`chainselector is ${chainselector}`)
        if (taskArgs.receiver) {
            receiver = taskArgs.receiver
        } else {
            const lockAndRelease = await hre.companionNetworks["destChain"].deployments.get("NFTPoolLockAndRelease")
            receiver = lockAndRelease.address
            console.log(`receiver is not set in commoned`)
        }
        console.log(`receiver is ${receiver}`)

        //transfer link token to addreee of the pool
        //approve pool address to call transferFrom

        const linkTokenAddr = networkConfig[network.config.chainId].linkToken
        const linkToken = await ethers.getContractAt("LinkToken", linkTokenAddr)
        const nftPoolBurnAndMint = await ethers.getContract("NFTPoolBurnAndMint", firstAccount)

        // // transfer 10 LINK token from deployer to pool
        const balanceBefore = await linkToken.balanceOf(nftPoolBurnAndMint.target)
        console.log(`balance before: ${balanceBefore}`)
        const transferTx = await linkToken.transfer(nftPoolBurnAndMint.target, ethers.parseEther("10"))
        await transferTx.wait(6)
        const balanceAfter = await linkToken.balanceOf(nftPoolBurnAndMint.target)
        console.log(`balance after: ${balanceAfter}`)

        // approve the pool have the permision to transfer deployer's token
        const wnft = await ethers.getContract("WrappedMyToken", firstAccount)

        await wnft.approve(nftPoolBurnAndMint.target, tokenId)

        console.log("approve successfully")

        // ccip send
        console.log(`${tokenId}, ${firstAccount}, ${chainselector}, ${receiver}`)
        const burnAndCrossTx = await nftPoolBurnAndMint
            .burnAndMint(
                tokenId,
                firstAccount,
                chainselector,
                receiver
            )

        // provide t
        console.log(`WNFT burn and crossed, transaction hash is ${burnAndCrossTx.hash}`)

    })


module.exports = {}