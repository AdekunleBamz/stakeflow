import { describe, it, expect } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const wallet1 = accounts.get("wallet_1")!;

describe("StakeFlow Integration", () => {
  it("should complete full staking lifecycle: mint -> stake -> wait -> unstake with rewards", () => {
    // 1. Authorize rewards contract to mint STF tokens
    simnet.callPublicFn(
      "stakeflow-token",
      "set-authorized-minter",
      [Cl.contractPrincipal(deployer, "stakeflow-rewards"), Cl.bool(true)],
      deployer
    );

    // 2. Mint NFT
    const mintResult = simnet.callPublicFn("stakeflow-nft", "mint", [], wallet1);
    expect(mintResult.result).toBeOk(Cl.uint(1));

    // 3. Stake NFT
    const stakeResult = simnet.callPublicFn(
      "stakeflow-staking",
      "stake-nft",
      [Cl.uint(1)],
      wallet1
    );
    expect(stakeResult.result).toBeOk(Cl.bool(true));

    // 4. Advance blocks to accumulate rewards
    simnet.mineEmptyBlocks(20);

    // 5. Check pending rewards (should be 2 STF = 20 blocks / 10 blocks per reward)
    const pendingRewards = simnet.callReadOnlyFn(
      "stakeflow-rewards",
      "calculate-rewards",
      [Cl.uint(1)],
      deployer
    );
    expect(pendingRewards.result).toBeUint(2000000); // 2 STF with 6 decimals

    // 6. Unstake (pays 0.001 STX fee, claims rewards)
    const unstakeResult = simnet.callPublicFn(
      "stakeflow-unstake",
      "unstake-nft",
      [Cl.uint(1)],
      wallet1
    );
    expect(unstakeResult.result).toBeOk(Cl.bool(true));

    // 7. Check STF balance (should have rewards)
    const stfBalance = simnet.callReadOnlyFn(
      "stakeflow-token",
      "get-balance",
      [Cl.principal(wallet1)],
      deployer
    );
    expect(stfBalance.result).toBeOk(Cl.uint(2000000));

    // 8. Verify NFT returned to wallet
    const nftOwner = simnet.callReadOnlyFn(
      "stakeflow-nft",
      "get-owner",
      [Cl.uint(1)],
      deployer
    );
    expect(nftOwner.result).toBeOk(Cl.some(Cl.principal(wallet1)));

    // 9. Verify staking state cleared
    const isStaked = simnet.callReadOnlyFn(
      "stakeflow-staking",
      "is-staked",
      [Cl.uint(1)],
      deployer
    );
    expect(isStaked.result).toBeBool(false);
  });

  it("should track rewards distribution", () => {
    // Setup
    simnet.callPublicFn(
      "stakeflow-token",
      "set-authorized-minter",
      [Cl.contractPrincipal(deployer, "stakeflow-rewards"), Cl.bool(true)],
      deployer
    );

    // Mint and stake
    simnet.callPublicFn("stakeflow-nft", "mint", [], wallet1);
    simnet.callPublicFn("stakeflow-staking", "stake-nft", [Cl.uint(1)], wallet1);

    // Wait for rewards
    simnet.mineEmptyBlocks(30);

    // Unstake
    simnet.callPublicFn("stakeflow-unstake", "unstake-nft", [Cl.uint(1)], wallet1);

    // Check total rewards distributed
    const totalDistributed = simnet.callReadOnlyFn(
      "stakeflow-rewards",
      "get-total-rewards-distributed",
      [],
      deployer
    );
    expect(totalDistributed.result).toBeUint(3000000); // 3 STF (30 blocks / 10)
  });
});
