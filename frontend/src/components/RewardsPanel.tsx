"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@/contexts/WalletContext";
import { openContractCall } from "@stacks/connect";
import { CONTRACTS } from "@/lib/constants";
import { fetchSTFBalance } from "@/lib/api";

export default function RewardsPanel() {
  const { network, address } = useWallet();
  const [stfBalance, setStfBalance] = useState(0);
  const [pendingRewards, setPendingRewards] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      loadBalances();
    }
  }, [address]);

  const loadBalances = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const balance = await fetchSTFBalance(address);
      setStfBalance(balance);
      // TODO: Calculate pending rewards from staking data
    } catch (error) {
      console.error("Error loading balances:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClaimRewards = async () => {
    if (!address) return;

    try {
      const [contractAddress, contractName] = CONTRACTS.REWARDS.split(".");

      await openContractCall({
        network,
        contractAddress,
        contractName,
        functionName: "claim-all-rewards",
        functionArgs: [],
        postConditionMode: 0x01,
        onFinish: (data) => {
          console.log("Claim transaction:", data);
          alert(`Rewards claim submitted! TX: ${data.txId}`);
          setTimeout(loadBalances, 5000);
        },
      });
    } catch (error) {
      console.error("Claim error:", error);
    }
  };

  const formatSTF = (amount: number) => {
    return (amount / 1000000).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });
  };

  return (
    <div className="card sticky top-24">
      <h2 className="text-2xl font-semibold mb-6">Rewards</h2>

      {loading ? (
        <p className="text-gray-400">Loading...</p>
      ) : (
        <>
          <div className="space-y-4 mb-6">
            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm">STF Balance</p>
              <p className="text-2xl font-bold gradient-text">
                {formatSTF(stfBalance)} STF
              </p>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-4">
              <p className="text-gray-400 text-sm">Pending Rewards</p>
              <p className="text-2xl font-bold text-green-400">
                {formatSTF(pendingRewards)} STF
              </p>
            </div>
          </div>

          <button
            onClick={handleClaimRewards}
            disabled={pendingRewards === 0}
            className="btn-primary w-full disabled:opacity-50"
          >
            Claim Rewards
          </button>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Reward Rate</h3>
            <p className="text-lg">
              <span className="gradient-text font-bold">~14.4 STF</span>
              <span className="text-gray-400"> per day per NFT</span>
            </p>
            <p className="text-xs text-gray-500 mt-2">
              1 STF per 10 blocks (~100 seconds)
            </p>
          </div>
        </>
      )}
    </div>
  );
}
