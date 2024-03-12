import { ethers } from "hardhat";
import { expect } from "chai";

import type { Signer } from "ethers";

import {
  WillStorage__factory,
  WillManager__factory,
  WillStorage,
  WillManager,
} from "../typechain-types";

describe("WillManager", function () {
  const ONE_GWEI = 1_000_000_000;

  let WillStorage: WillStorage__factory;
  let willStorage: WillStorage;
  let WillManager: WillManager__factory;
  let willmanager: WillManager;

  let owner: Signer, nonOwner: Signer;

  before(async function () {
    [owner, nonOwner] = await ethers.getSigners();
    // 1. Deploy storage
    WillStorage = await ethers.getContractFactory("WillStorage");
    willStorage = await WillStorage.deploy();

    // 2. Deploy manager
    WillManager = await ethers.getContractFactory("WillManager");
    willmanager = await WillManager.deploy(await willStorage.getAddress());

    // 3. Set latestCallingContract for storage
    willStorage.upgradeVersion(await willmanager.getAddress());
  });

  describe("Storing and retrieving", function () {
    it("Should store will correctly", async function () {
      await expect(willmanager.addWill("BODY", { value: ONE_GWEI }))
        .to.emit(willmanager, "willAdded")
        .withArgs(
          "0xd790fca242e621d8e17571faeae2180f581d7b6fa95940f9e5abbcc71f722f02"
        );
    });

    it("Should return correct will", async function () {
      expect(
        await willmanager.getWill(
          "0xd790fca242e621d8e17571faeae2180f581d7b6fa95940f9e5abbcc71f722f02"
        )
      ).to.equal("BODY");
    });
  });

  describe("Withdraw", function () {
    it("Should revert when called by non-owner", async function () {
      await expect(willmanager.connect(nonOwner).withdraw()).to.be.reverted;
    });

    it("Should withdraw funds to owner", async function () {
      await expect(willmanager.withdraw()).to.changeEtherBalances(
        [owner, willmanager],
        [ONE_GWEI, -ONE_GWEI]
      );
    });
  });
});
