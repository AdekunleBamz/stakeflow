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
    <Card className="sticky top-24">
      <h2 className="text-2xl font-semibold mb-6">Rewards</h2>

      {loading ? (
        <div className="flex items-center justify-center py-8">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Balances */}
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

          {/* Claim Button */}
          <Button
            onClick={handleClaim}
            disabled={!address || pendingRewards === 0 || isClaiming}
            loading={isClaiming}
            className="w-full"
          >
            {isClaiming ? "Claiming..." : "Claim Rewards"}
          </Button>

          {txId && status === "success" && (
            <div className="mt-3 p-3 bg-green-900/20 border border-green-800 rounded-lg">
              <p className="text-xs text-green-400 text-center">
                Claim submitted!{" "}
                <a
                  href={`https://explorer.stacks.co/txid/${txId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  View TX
                </a>
              </p>
            </div>
          )}

          {/* Refresh button */}
          {onRefresh && (
            <button
              onClick={onRefresh}
              className="w-full mt-3 text-sm text-gray-400 hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh
            </button>
          )}

          {/* Reward Calculator */}
          {stakedCount > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-800">
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
