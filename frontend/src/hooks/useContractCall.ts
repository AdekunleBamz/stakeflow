"use client";

import { useState, useCallback } from "react";
import { useWallet } from "@/contexts/WalletContext";
import { openContractCall } from "@stacks/connect";
import { uintCV, listCV } from "@stacks/transactions";
import { CONTRACTS } from "@/lib/constants";

interface TransactionState {
  txId: string | null;
  status: "idle" | "pending" | "success" | "error";
  error: string | null;
}

export function useContractCall() {
  const { network, address } = useWallet();
  const [state, setState] = useState<TransactionState>({
    txId: null,
    status: "idle",
    error: null,
  });

  const mint = useCallback(
    async (amount: number = 1) => {
      if (!address) throw new Error("Wallet not connected");

      setState({ txId: null, status: "pending", error: null });

      const [contractAddress, contractName] = CONTRACTS.NFT.split(".");

      return new Promise<string>((resolve, reject) => {
        if (amount === 1) {
          openContractCall({
            network,
            contractAddress,
            contractName,
            functionName: "mint",
            functionArgs: [],
            postConditionMode: 0x01,
            onFinish: (data) => {
              setState({ txId: data.txId, status: "success", error: null });
              resolve(data.txId);
            },
            onCancel: () => {
              setState({ txId: null, status: "idle", error: null });
              reject(new Error("User cancelled"));
            },
          });
        } else {
          const amounts = Array(amount).fill(uintCV(1));
          openContractCall({
            network,
            contractAddress,
            contractName,
            functionName: "mint-many",
            functionArgs: [listCV(amounts)],
            postConditionMode: 0x01,
            onFinish: (data) => {
              setState({ txId: data.txId, status: "success", error: null });
              resolve(data.txId);
            },
            onCancel: () => {
              setState({ txId: null, status: "idle", error: null });
              reject(new Error("User cancelled"));
            },
          });
        }
      });
    },
    [network, address]
  );

  const stake = useCallback(
    async (tokenIds: number[]) => {
      if (!address) throw new Error("Wallet not connected");
      if (tokenIds.length === 0) throw new Error("No NFTs selected");

      setState({ txId: null, status: "pending", error: null });

      const [contractAddress, contractName] = CONTRACTS.STAKING.split(".");
      const nftIds = tokenIds.map((id) => uintCV(id));

      return new Promise<string>((resolve, reject) => {
        openContractCall({
          network,
          contractAddress,
          contractName,
          functionName: "stake-many",
          functionArgs: [listCV(nftIds)],
          postConditionMode: 0x01,
          onFinish: (data) => {
            setState({ txId: data.txId, status: "success", error: null });
            resolve(data.txId);
          },
          onCancel: () => {
            setState({ txId: null, status: "idle", error: null });
            reject(new Error("User cancelled"));
          },
        });
      });
    },
    [network, address]
  );

  const unstake = useCallback(
    async (tokenIds: number[]) => {
      if (!address) throw new Error("Wallet not connected");
      if (tokenIds.length === 0) throw new Error("No NFTs selected");

      setState({ txId: null, status: "pending", error: null });

      const [contractAddress, contractName] = CONTRACTS.UNSTAKE.split(".");
      const nftIds = tokenIds.map((id) => uintCV(id));

      return new Promise<string>((resolve, reject) => {
        openContractCall({
          network,
          contractAddress,
          contractName,
          functionName: "unstake-many",
          functionArgs: [listCV(nftIds)],
          postConditionMode: 0x01,
          onFinish: (data) => {
            setState({ txId: data.txId, status: "success", error: null });
            resolve(data.txId);
          },
          onCancel: () => {
            setState({ txId: null, status: "idle", error: null });
            reject(new Error("User cancelled"));
          },
        });
      });
    },
    [network, address]
  );

  const claimRewards = useCallback(async () => {
    if (!address) throw new Error("Wallet not connected");

    setState({ txId: null, status: "pending", error: null });

    const [contractAddress, contractName] = CONTRACTS.REWARDS.split(".");

    return new Promise<string>((resolve, reject) => {
      openContractCall({
        network,
        contractAddress,
        contractName,
        functionName: "claim-all-rewards",
        functionArgs: [],
        postConditionMode: 0x01,
        onFinish: (data) => {
          setState({ txId: data.txId, status: "success", error: null });
          resolve(data.txId);
        },
        onCancel: () => {
          setState({ txId: null, status: "idle", error: null });
          reject(new Error("User cancelled"));
        },
      });
    });
  }, [network, address]);

  const reset = useCallback(() => {
    setState({ txId: null, status: "idle", error: null });
  }, []);

  return {
    ...state,
    mint,
    stake,
    unstake,
    claimRewards,
    reset,
  };
}
