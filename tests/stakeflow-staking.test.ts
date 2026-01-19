import { describe, it, expect } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const wallet1 = accounts.get("wallet_1")!;

describe("StakeFlow Staking", () => {
  it("should stake NFT successfully", () => {
    // Mint an NFT first
    simnet.callPublicFn("stakeflow-nft", "mint", [], wallet1);

    // Stake the NFT
    const stakeResult = simnet.callPublicFn(
      "stakeflow-staking",
      "stake-nft",
      [Cl.uint(1)],
      wallet1
    );
    expect(stakeResult.result).toBeOk(Cl.bool(true));

    // Check stake info exists
    const stakeInfo = simnet.callReadOnlyFn(
      "stakeflow-staking",
      "is-staked",
      [Cl.uint(1)],
      deployer
    );
    expect(stakeInfo.result).toBeBool(true);

    // Check total staked
    const totalStaked = simnet.callReadOnlyFn(
      "stakeflow-staking",
      "get-total-staked",
      [],
      deployer
    );
    expect(totalStaked.result).toBeUint(1);

    // Check staked count for wallet
    const stakedCount = simnet.callReadOnlyFn(
      "stakeflow-staking",
      "get-staked-count",
      [Cl.principal(wallet1)],
      deployer
    );
    expect(stakedCount.result).toBeUint(1);
  });

  it("should not allow non-owner to stake NFT", () => {
    // Mint NFT to wallet1
    simnet.callPublicFn("stakeflow-nft", "mint", [], wallet1);

    // Try to stake as deployer (not owner)
    const stakeResult = simnet.callPublicFn(
      "stakeflow-staking",
      "stake-nft",
      [Cl.uint(1)],
      deployer
    );
    expect(stakeResult.result).toBeErr(Cl.uint(101)); // ERR-NOT-TOKEN-OWNER
  });

  it("should check if NFT is staked", () => {
    // Mint NFT
    simnet.callPublicFn("stakeflow-nft", "mint", [], wallet1);

    // Before staking
    let isStaked = simnet.callReadOnlyFn(
      "stakeflow-staking",
      "is-staked",
      [Cl.uint(1)],
      deployer
    );
    expect(isStaked.result).toBeBool(false);

    // Stake
    simnet.callPublicFn("stakeflow-staking", "stake-nft", [Cl.uint(1)], wallet1);

    // After staking
    isStaked = simnet.callReadOnlyFn(
      "stakeflow-staking",
      "is-staked",
      [Cl.uint(1)],
      deployer
    );
    expect(isStaked.result).toBeBool(true);
  });
});
