"use client";

import React from "react";
import { Card, CardContent, Button } from "./ui";
import { useWallet } from "@/contexts/WalletContext";
import { useContractCall } from "@/hooks/useContractCall";
import { RewardCalculator } from "./RewardCalculator";
import { Spinner } from "./ui/Spinner";
import { REWARD_AMOUNT } from "@/lib/constants";

interface RewardsPanelEnhancedProps {
  stfBalance: number;
  pendingRewards: number;
  stakedCount: number;
  loading?: boolean;
  onRefresh?: () => void;
}

export function RewardsPanelEnhanced({
  stfBalance,
  pendingRewards,
  stakedCount,
  loading = false,
  onRefresh,
}: RewardsPanelEnhancedProps) {
  const { address } = useWallet();
  const { claimRewards, status, txId } = useContractCall();

  const handleClaim = async () => {
    try {
      await claimRewards();
      if (onRefresh) setTimeout(onRefresh, 5000);
    } catch (error) {
      console.error("Claim error:", error);
    }
  };

  const formatSTF = (amount: number) => {
    return (amount / 1_000_000).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });
  };

  const isClaiming = status === "pending";

  return (
    <Card className="sticky top-24 animate-fade-in">
      <div className="mb-6 pb-4 border-b border-gray-700/50">
        <h2 className="text-3xl font-bold gradient-text">🎁 Rewards</h2>
        <p className="text-gray-500 text-sm mt-1">Manage your STF rewards</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Spinner />
            <p className="text-gray-500 text-sm mt-3 animate-pulse">Loading rewards...</p>
          </div>
        </div>
      ) : (
        <>
          {/* Balances */}
          <div className="space-y-4 mb-6">
            <div className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-lg p-5 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
              <p className="text-gray-400 text-xs font-medium mb-2">💼 STF Balance</p>
              <p className="text-3xl font-bold gradient-text">
                {formatSTF(stfBalance)} <span className="text-sm text-gray-500">STF</span>
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-5 border border-green-500/30 hover:border-green-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/10">
              <p className="text-gray-400 text-xs font-medium mb-2">✨ Pending Rewards</p>
              <p className="text-3xl font-bold text-green-400">
                {formatSTF(pendingRewards)} <span className="text-sm text-gray-500">STF</span>
              </p>
            </div>
          </div>

          {/* Claim Button */}
          <Button
            onClick={handleClaim}
            disabled={!address || pendingRewards === 0 || isClaiming}
            loading={isClaiming}
            className="w-full font-semibold text-base transition-all duration-300 hover:shadow-lg"
          >
            {isClaiming ? "⏳ Claiming..." : "💰 Claim Rewards"}
          </Button>

          {txId && status === "success" && (
            <div className="mt-4 p-4 bg-green-900/30 border border-green-700/50 rounded-lg animate-fade-in">
              <p className="text-sm text-green-400 font-medium text-center mb-2">
                ✓ Claim submitted successfully!
              </p>
              <a
                href={`https://explorer.stacks.co/txid/${txId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-green-400/80 hover:text-green-300 underline inline-block w-full text-center transition-colors"
              >
                View Transaction ↗
              </a>
            </div>
          )}

          {/* Refresh button */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="w-full mt-4 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-800 border border-gray-700/30 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <svg className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Data
            </button>
          )}

          {/* Reward Calculator */}
          {stakedCount > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-700/50">
              <RewardCalculator
                stakedCount={stakedCount}
                rewardPerBlock={REWARD_AMOUNT}
              />
            </div>
          )}
        </>
      )}
    </Card>
  );
}
