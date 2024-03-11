import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat";
import { expect } from "chai";

import type { Signer } from "ethers";
import { WillStorage__factory } from "../typechain-types";
import { WillStorage } from "../typechain-types/WillStorage.sol";

describe("WillStorage", function () {
  const testRecordId = ethers.keccak256(ethers.toUtf8Bytes("test"));

  let owner: Signer,
    nonOwner: Signer,
    latestCallingContract: Signer,
    oldCallingContract: Signer;
  let WillStorage: WillStorage__factory;
  let willStorage: WillStorage;

  before(async function () {
    [owner, nonOwner, latestCallingContract, oldCallingContract] =
      await ethers.getSigners();
    WillStorage = await ethers.getContractFactory("WillStorage");
    willStorage = await WillStorage.deploy();
  });

  describe("Managing", function () {
    it("Should by upgradeable by owner", async function () {
      await expect(
        willStorage.connect(owner).upgradeVersion(latestCallingContract)
      ).to.not.be.reverted;
    });

    it("Should not be upgradeable by non-owner", async function () {
      await expect(
        willStorage.connect(nonOwner).upgradeVersion(latestCallingContract)
      ).to.be.reverted;
    });
  });

  describe("Storing and retrieving", function () {
    it("Should store uint value correctly", async function () {
      await willStorage.connect(latestCallingContract).setUint(testRecordId, 0);
    });
    it("Should return correct uint value", async function () {
      expect(await willStorage.getUint(testRecordId)).to.equal(0);
    });
    it("Should store string value correctly", async function () {
      await willStorage
        .connect(latestCallingContract)
        .setString(testRecordId, "test");
    });
    it("Should return string uint value", async function () {
      expect(await willStorage.getString(testRecordId)).to.equal("test");
    });
  });
});
