// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.22;

import {MyToken} from "./MyNFT.sol";

contract WrappedMyToken is MyToken {
    constructor(
        string memory tokeNmae,
        string memory tokeSymbol,
        address _originalTokenAddress
    ) MyToken(tokeNmae, tokeSymbol) {}

    function mintWithSpecificTokenId(address to, uint256 _tokenId) public {
        _safeMint(to, _tokenId);
    }
}
