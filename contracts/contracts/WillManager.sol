// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

import "./WillStorage.sol";

contract WillManager {
    address owner;
    WillStorage willStorage;
    uint count = 0;

    event willAdded(bytes32 willId);

    constructor(WillStorage _willStorage) {
        willStorage = _willStorage;
        owner = msg.sender;
    }

    function addWill(string memory willBody) external payable {
        bytes32 willId = keccak256(abi.encode(count, willBody));
        willStorage.setString(willId, willBody);
        count++;

        emit willAdded(willId);
    }

    function getWill(bytes32 willId) external view returns (string memory) {
        return willStorage.getString(willId);
    }

    function withdraw() external {
        require(msg.sender == owner);

        uint256 amount = address(this).balance;
        (bool success, ) = payable(owner).call{value: amount}("");
        require(success, "Could not withdraw");
    }
}
