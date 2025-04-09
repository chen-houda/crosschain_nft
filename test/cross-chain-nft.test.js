//prepqre variables:contract,account
const { ethers, deployments, getNamedAccounts, network } = require("hardhat")
const { assert, expect } = require("chai")
const { devlopmentChains } = require("../helper-hardhat-config")


let firstAccount
let nft
let wnft
let poolLnU
let poolMnB
let chainSelector
before(async function () {
    firstAccount = (await getNamedAccounts()).firstAccount
    await deployments.fixture(["all"])
    nft = await ethers.getContract("MyToken", firstAccount)
    wnft = await ethers.getContract("WrappedMyToken", firstAccount)
    poolLnU = await ethers.getContract("NFTPoolLockAndRelease", firstAccount)
    poolMnB = await ethers.getContract("NFTPoolBurnAndMint", firstAccount)
    ccipLocalSimulator = await ethers.getContract("CCIPLocalSimulator", firstAccount)
    chainSelector = (await ccipLocalSimulator.configuration()).chainSelector_
})
//source chain -?dest chain
//test if user can mint a nft from nft contract successfuly
describe("test if user can mint a nft from nft contract successfuly",
    async function () {
        it("test if the owner of nft is minter",
            async function () {
                // get nft
                await nft.safeMint(firstAccount)
                // check the owner
                const ownerOfNft = await nft.ownerOf(0)
                expect(ownerOfNft).to.equal(firstAccount)
                console.log("nft owner is: ", ownerOfNft)
            })
    })
//test if user can lock the nft in the pool and send ccip message on source chain

describe("test if user can lock the nft in the pool and send ccip message on source chain"
    , async function () {
        // transfer NFT from source chain to dest chain, check if the nft is locked
        it("transfer NFT from source chain to dest chain, check if the nft is locked",
            async function () {

                await nft.approve(poolLnU.target, 0)
                await ccipLocalSimulator.requestLinkFromFaucet(poolLnU.target, ethers.parseEther("10"))
                await poolLnU.lockAndSendNFT(0, firstAccount, chainSelector, poolMnB.target)
                const newOwner = await nft.ownerOf(0)
                expect(newOwner).to.equal(poolLnU.target)
            }
        )
        //test if user can get a wrapped nft in dest chain
        it("test if user can get a wrapped nft in dest chain",
            async function () {
                const newOwner = await wnft.ownerOf(0)
                expect(newOwner).to.equal(firstAccount)
            }
        )
    }
)

//dest chian -> source chain
describe("dest chian -> source chain",
    async function () {
        //test if user can burn the wnft and send ccip message on dest chain
        it("test if user can burn the wnft and send ccip message on dest chain",
            async function () {
                await wnft.approve(poolMnB.target, 0)
                await ccipLocalSimulator.requestLinkFromFaucet(poolMnB.target, ethers.parseEther("10"))
                await poolMnB.burnAndMint(0, firstAccount, chainSelector, poolLnU.target)
                const totalSuply = await wnft.totalSupply()
                expect(totalSuply).to.equal(0)
            })
        //test if user have the nft unlockes on source chain
        it("test if user have the nft unlockes on source chain",
            async function () {
                const owner = await nft.ownerOf(0)
                expect(owner).to.equal(firstAccount)
            }
        )

    })




