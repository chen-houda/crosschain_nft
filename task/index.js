// deploy-fundme.js 和 interact-fundme.js 中定义的内容导出，以便其他文件可以通过 require 引入并使用这些任务。
exports.checkNft = require("./check-nft")
exports.mintNft = require("./mint-nft")
exports.lockAndCross = require("./lock-and-cross")
exports.checkWNft = require("./check-wnft")
exports.burnAndCross = require("./burn-and-cross")