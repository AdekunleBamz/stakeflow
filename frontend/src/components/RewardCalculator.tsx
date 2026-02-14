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
    <div className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl p-6 border border-gray-700/50 transition-all duration-300 hover:border-green-500/30 ${className}`}>
      <h3 className="text-sm font-semibold text-gray-300 mb-6 uppercase tracking-wider">Estimated Rewards</h3>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-700/20 hover:bg-gray-700/40 transition-colors duration-200">
          <span className="text-gray-400 font-medium">Daily</span>
          <span className="font-bold text-green-400 text-lg">~{formatReward(dailyRewards)} STF</span>
        </div>
        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-700/20 hover:bg-gray-700/40 transition-colors duration-200">
          <span className="text-gray-400 font-medium">Weekly</span>
          <span className="font-bold text-green-400 text-lg">~{formatReward(weeklyRewards)} STF</span>
        </div>
        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-700/20 hover:bg-gray-700/40 transition-colors duration-200">
          <span className="text-gray-400 font-medium">Monthly</span>
          <span className="font-bold text-green-400 text-lg">~{formatReward(monthlyRewards)} STF</span>
        </div>
      </div>

      <div className="border-t border-gray-700/50 mt-4 pt-4">
        <p className="text-xs text-gray-500 font-medium">
          Based on <span className="text-green-400 font-semibold">{stakedCount}</span> staked NFT{stakedCount !== 1 ? "s" : ""}
        </p>
      </div>
    </div>
  );
}
