// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.24;

// Adapted from fravoll/solidity-patterns licensed under MIT License
// https://github.com/fravoll/solidity-patterns/blob/master/EternalStorage/EternalStorage.sol
contract WillStorage {
    address owner = msg.sender;
    address latestVersion;

    mapping(bytes32 => uint) uIntStorage;
    mapping(bytes32 => string) stringStorage;

    modifier onlyLatestVersion() {
        require(msg.sender == latestVersion);
        _;
    }

    function upgradeVersion(address _newVersion) public {
        require(msg.sender == owner);
        latestVersion = _newVersion;
    }

    function getUint(bytes32 _key) external view returns (uint) {
        return uIntStorage[_key];
    }

    function getString(bytes32 _key) external view returns (string memory) {
        return stringStorage[_key];
    }

    function setUint(bytes32 _key, uint _value) external onlyLatestVersion {
        uIntStorage[_key] = _value;
    }

    function setString(
        bytes32 _key,
        string memory _value
    ) external onlyLatestVersion {
        stringStorage[_key] = _value;
    }
}
