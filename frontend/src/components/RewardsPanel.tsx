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
    <div className="card sticky top-24 border-gradient">
      <h2 className="text-2xl font-bold mb-6 uppercase tracking-wider">Your Rewards</h2>

      {loading ? (
        <div className="animate-pulse space-y-4">
          <div className="h-20 bg-gray-700 rounded-lg" />
          <div className="h-20 bg-gray-700 rounded-lg" />
        </div>
      ) : (
        <>
          <div className="space-y-4 mb-8">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-lg p-5 transition-all duration-300 hover:border-purple-500/30">
              <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-2">STF Balance</p>
              <p className="text-3xl font-bold gradient-text">
                {formatSTF(stfBalance)}
                <span className="text-lg text-gray-400 ml-2">STF</span>
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-800/20 to-green-900/20 border border-green-700/30 rounded-lg p-5 transition-all duration-300 hover:border-green-500/50">
              <p className="text-green-400 text-sm font-semibold uppercase tracking-wider mb-2">💰 Pending Rewards</p>
              <p className="text-3xl font-bold text-green-400">
                {formatSTF(pendingRewards)}
                <span className="text-lg text-gray-400 ml-2">STF</span>
              </p>
            </div>
          </div>

          <button
            onClick={handleClaimRewards}
            disabled={pendingRewards === 0}
            className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {pendingRewards === 0 ? "No Rewards to Claim" : "🎉 Claim Rewards"}
          </button>

          <div className="mt-8 pt-6 border-t border-gray-700/50">
            <h3 className="text-sm font-semibold text-gray-300 mb-4 uppercase tracking-wider">Reward Rate</h3>
            <div className="space-y-2">
              <p className="text-lg font-semibold">
                <span className="gradient-text">~14.4 STF</span>
                <span className="text-gray-400 ml-2">per day per NFT</span>
              </p>
              <p className="text-xs text-gray-500 font-medium">
                1 STF per 10 blocks (~100 seconds)
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
