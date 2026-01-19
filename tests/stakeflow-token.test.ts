import { describe, it, expect, beforeEach } from "vitest";
import { Cl } from "@stacks/transactions";

const accounts = simnet.getAccounts();
const deployer = accounts.get("deployer")!;
const wallet1 = accounts.get("wallet_1")!;
const wallet2 = accounts.get("wallet_2")!;

describe("StakeFlow Token (STF)", () => {
  it("should return correct token metadata", () => {
    const name = simnet.callReadOnlyFn("stakeflow-token", "get-name", [], deployer);
    expect(name.result).toBeOk(Cl.stringAscii("StakeFlow Token"));

    const symbol = simnet.callReadOnlyFn("stakeflow-token", "get-symbol", [], deployer);
    expect(symbol.result).toBeOk(Cl.stringAscii("STF"));

    const decimals = simnet.callReadOnlyFn("stakeflow-token", "get-decimals", [], deployer);
    expect(decimals.result).toBeOk(Cl.uint(6));
  });

  it("should allow deployer to mint tokens", () => {
    const mintResult = simnet.callPublicFn(
      "stakeflow-token",
      "mint",
      [Cl.uint(1000000), Cl.principal(wallet1)],
      deployer
    );
    expect(mintResult.result).toBeOk(Cl.bool(true));

    const balance = simnet.callReadOnlyFn(
      "stakeflow-token",
      "get-balance",
      [Cl.principal(wallet1)],
      deployer
    );
    expect(balance.result).toBeOk(Cl.uint(1000000));
  });

  it("should not allow unauthorized minting", () => {
    const mintResult = simnet.callPublicFn(
      "stakeflow-token",
      "mint",
      [Cl.uint(1000000), Cl.principal(wallet2)],
      wallet1
    );
    expect(mintResult.result).toBeErr(Cl.uint(100));
  });

  it("should allow token transfers", () => {
    // First mint tokens to wallet1
    simnet.callPublicFn(
      "stakeflow-token",
      "mint",
      [Cl.uint(1000000), Cl.principal(wallet1)],
      deployer
    );

    // Transfer from wallet1 to wallet2
    const transferResult = simnet.callPublicFn(
      "stakeflow-token",
      "transfer",
      [Cl.uint(500000), Cl.principal(wallet1), Cl.principal(wallet2), Cl.none()],
      wallet1
    );
    expect(transferResult.result).toBeOk(Cl.bool(true));

    // Check balances
    const balance1 = simnet.callReadOnlyFn(
      "stakeflow-token",
      "get-balance",
      [Cl.principal(wallet1)],
      deployer
    );
    expect(balance1.result).toBeOk(Cl.uint(500000));

    const balance2 = simnet.callReadOnlyFn(
      "stakeflow-token",
      "get-balance",
      [Cl.principal(wallet2)],
      deployer
    );
    expect(balance2.result).toBeOk(Cl.uint(500000));
  });
});
