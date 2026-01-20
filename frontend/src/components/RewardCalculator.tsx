"use client";

import React from "react";

interface RewardCalculatorProps {
  stakedCount: number;
  rewardPerBlock: number;
  blocksPerDay?: number;
  className?: string;
}

export function RewardCalculator({
  stakedCount,
  rewardPerBlock,
  blocksPerDay = 144,
  className = "",
}: RewardCalculatorProps) {
  const dailyRewards = stakedCount * (rewardPerBlock * (blocksPerDay / 10)); // 10 blocks per reward
  const weeklyRewards = dailyRewards * 7;
  const monthlyRewards = dailyRewards * 30;

  const formatReward = (amount: number) => {
    return (amount / 1_000_000).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <div className={`bg-gray-800/50 rounded-xl p-4 ${className}`}>
      <h3 className="text-sm font-medium text-gray-400 mb-4">Estimated Rewards</h3>
      
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-400">Daily</span>
          <span className="font-medium text-green-400">~{formatReward(dailyRewards)} STF</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Weekly</span>
          <span className="font-medium text-green-400">~{formatReward(weeklyRewards)} STF</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400">Monthly</span>
          <span className="font-medium text-green-400">~{formatReward(monthlyRewards)} STF</span>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4">
        Based on {stakedCount} staked NFT{stakedCount !== 1 ? "s" : ""}
      </p>
    </div>
  );
}
