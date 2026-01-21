import { describe, it, expect, beforeEach } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const wallet1 = accounts.get("wallet_1")!;
const treasury = "SP1ZYBVXD24AG7HNQ9PXB7TBCY2FD4YWT307FRKA3";

describe("StakeFlow NFT", () => {
  it("should return correct NFT metadata", () => {
    const mintPrice = simnet.callReadOnlyFn("stakeflow-nft", "get-mint-price", [], deployer);
    expect(mintPrice.result).toBeUint(1000); // 0.001 STX = 1000 microSTX

    const maxSupply = simnet.callReadOnlyFn("stakeflow-nft", "get-max-supply", [], deployer);
    expect(maxSupply.result).toBeUint(10000000);

    const remaining = simnet.callReadOnlyFn("stakeflow-nft", "get-remaining-supply", [], deployer);
    expect(remaining.result).toBeUint(10000000);
  });

  it("should mint NFT for 0.001 STX", () => {
    const mintResult = simnet.callPublicFn("stakeflow-nft", "mint", [], wallet1);
    expect(mintResult.result).toBeOk(Cl.uint(1));

    // Check token ID incremented
    const lastId = simnet.callReadOnlyFn("stakeflow-nft", "get-last-token-id", [], deployer);
    expect(lastId.result).toBeOk(Cl.uint(1));

    // Check ownership
    const owner = simnet.callReadOnlyFn(
      "stakeflow-nft",
      "get-owner",
      [Cl.uint(1)],
      deployer
    );
    expect(owner.result).toBeOk(Cl.some(Cl.principal(wallet1)));
  });

  it("should allow multiple mints", () => {
    // Mint 3 NFTs
    simnet.callPublicFn("stakeflow-nft", "mint", [], wallet1);
    simnet.callPublicFn("stakeflow-nft", "mint", [], wallet1);
    simnet.callPublicFn("stakeflow-nft", "mint", [], wallet1);

    const lastId = simnet.callReadOnlyFn("stakeflow-nft", "get-last-token-id", [], deployer);
    expect(lastId.result).toBeOk(Cl.uint(3));

    const remaining = simnet.callReadOnlyFn("stakeflow-nft", "get-remaining-supply", [], deployer);
    expect(remaining.result).toBeUint(10000000 - 3);
  });

  it("should allow NFT transfer", () => {
    // Mint NFT
    simnet.callPublicFn("stakeflow-nft", "mint", [], wallet1);

    // Transfer to deployer
    const transferResult = simnet.callPublicFn(
      "stakeflow-nft",
      "transfer",
      [Cl.uint(1), Cl.principal(wallet1), Cl.principal(deployer)],
      wallet1
    );
    expect(transferResult.result).toBeOk(Cl.bool(true));

    // Check new ownership
    const owner = simnet.callReadOnlyFn(
      "stakeflow-nft",
      "get-owner",
      [Cl.uint(1)],
      deployer
    );
    expect(owner.result).toBeOk(Cl.some(Cl.principal(deployer)));
  });
});
