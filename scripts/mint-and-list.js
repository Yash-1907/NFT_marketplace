const { SignerWithAddress } = require("@nomiclabs/hardhat-ethers/signers")
const { ethers } = require("hardhat")

const PRICE = ethers.utils.parseEther("0.1")

async function mintAndList() {
    const basicNft = await ethers.getContract("BasicNft")
    console.log("Hello")
    const nftMarketplace = await ethers.getContract("NftMarketplace")

    console.log("Minting")
    const mintTx = await basicNft.mintNft()
    const mintTxReceipt = await mintTx.wait(1)
    const tokenId = mintTxReceipt.events[0].args.tokenId
    console.log("Approving")

    const approveTx = await basicNft.approve(nftMarketplace.address, tokenId)
    await approveTx.wait(1)
    console.log("Listing")
    const tx = await nftMarketplace.listItem(nftMarketplace.address, tokenId, PRICE)
    await tx.wait(1)
    console.log("Listed")
}

mintAndList()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
