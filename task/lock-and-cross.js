const { task } = require("hardhat/config")
const { networkConfig } = require("../helper-hardhat-config")

task("lock-and-cross")
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
            const nftBurnAndMint = await hre.companionNetworks["destChain"].deployments.get("NFTPoolBurnAndMint")
            receiver = nftBurnAndMint.address
            console.log(`receiver is not set in commoned`)
        }
        console.log(`receiver is ${receiver}`)

        //transfer link token to addreee of the pool
        //approve pool address to call transferFrom

        const linkTokenAddr = networkConfig[network.config.chainId].linkToken
        const linkToken = await ethers.getContractAt("LinkToken", linkTokenAddr)
        const nftPoolLockAndRelease = await ethers.getContract("NFTPoolLockAndRelease", firstAccount)

        // // transfer 10 LINK token from deployer to pool
        const balanceBefore = await linkToken.balanceOf(nftPoolLockAndRelease.target)
        console.log(`balance before: ${balanceBefore}`)
        // const transferTx = await linkToken.transfer(nftPoolLockAndRelease.target, ethers.parseEther("10"))
        // await transferTx.wait(6)
        const balanceAfter = await linkToken.balanceOf(nftPoolLockAndRelease.target)
        console.log(`balance after: ${balanceAfter}`)

        // approve the pool have the permision to transfer deployer's token
        const nft = await ethers.getContract("MyToken", firstAccount)
        //console.log(`MyTokenAddress ${nft.target}`)
        await nft.approve(nftPoolLockAndRelease.target, tokenId)
        //console.log(`nftPoolLockAndReleaseAddress ${nftPoolLockAndRelease.target}`)
        console.log("approve successfully")

        // ccip send
        console.log(`${tokenId}, ${firstAccount}, ${chainselector}, ${receiver}`)
        const lockAndCrossTx = await nftPoolLockAndRelease
            .lockAndSendNFT(
                tokenId,
                firstAccount,
                chainselector,
                receiver
            )

        // provide t
        console.log(`NFT locked and crossed, transaction hash is ${lockAndCrossTx.hash}`)

    })


module.exports = {}