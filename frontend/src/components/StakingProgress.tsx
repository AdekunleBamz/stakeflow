"use client";

import React from "react";
import { formatNumber, formatSTF } from "../lib/formatters";

interface StakingProgressProps {
  totalNFTs: number;
  stakedNFTs: number;
  totalRewardsEarned: number;
  currentStreak?: number;
  className?: string;
}

export function StakingProgress({
  totalNFTs,
  stakedNFTs,
  totalRewardsEarned,
  currentStreak = 0,
  className = "",
}: StakingProgressProps) {
  const stakingPercentage = totalNFTs > 0 ? (stakedNFTs / totalNFTs) * 100 : 0;

  return (
    <div
      className={`bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-6 ${className}`}
    >
      <h3 className="text-lg font-semibold text-white mb-4">
        Your Staking Progress
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">
            {formatNumber(totalNFTs)}
          </div>
          <div className="text-xs text-gray-500">Total NFTs</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">
            {formatNumber(stakedNFTs)}
          </div>
          <div className="text-xs text-gray-500">Staked</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {formatSTF(totalRewardsEarned)}
          </div>
          <div className="text-xs text-gray-500">Total Earned</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-blue-400">
            {currentStreak}
          </div>
          <div className="text-xs text-gray-500">Day Streak</div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">Staking Rate</span>
          <span className="text-white">{stakingPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-purple-400 rounded-full transition-all duration-500"
            style={{ width: `${stakingPercentage}%` }}
          />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        <MilestoneIndicator
          label="Bronze"
          threshold={25}
          current={stakingPercentage}
        />
        <MilestoneIndicator
          label="Silver"
          threshold={50}
          current={stakingPercentage}
        />
        <MilestoneIndicator
          label="Gold"
          threshold={100}
          current={stakingPercentage}
        />
      </div>
    </div>
  );
}

interface MilestoneIndicatorProps {
  label: string;
  threshold: number;
  current: number;
}

function MilestoneIndicator({
  label,
  threshold,
  current,
}: MilestoneIndicatorProps) {
  const achieved = current >= threshold;

  return (
    <div
      className={`text-center p-2 rounded-lg ${
        achieved ? "bg-purple-500/20" : "bg-gray-800/50"
      }`}
    >
      <div
        className={`text-lg ${achieved ? "text-yellow-400" : "text-gray-600"}`}
      >
        {achieved ? "🏆" : "🔒"}
      </div>
      <div
        className={`text-xs ${achieved ? "text-purple-300" : "text-gray-500"}`}
      >
        {label}
      </div>
      <div
        className={`text-xs ${achieved ? "text-gray-400" : "text-gray-600"}`}
      >
        {threshold}%
      </div>
    </div>
  );
}

interface StakingStreakProps {
  streak: number;
  bestStreak: number;
  className?: string;
}

export function StakingStreak({
  streak,
  bestStreak,
  className = "",
}: StakingStreakProps) {
  const streakDays = Array.from({ length: 7 }, (_, i) => i < streak % 7);

  return (
    <div className={`bg-gray-800/50 rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-white">Staking Streak</h4>
        <div className="text-xs text-gray-500">Best: {bestStreak} days</div>
      </div>

      <div className="flex items-center gap-3 mb-3">
        <div className="text-3xl">🔥</div>
        <div>
          <div className="text-2xl font-bold text-orange-400">{streak}</div>
          <div className="text-xs text-gray-500">days</div>
        </div>
      </div>

      <div className="flex gap-1">
        {streakDays.map((active, index) => (
          <div
            key={index}
            className={`flex-1 h-2 rounded-full ${
              active
                ? "bg-gradient-to-r from-orange-500 to-yellow-500"
                : "bg-gray-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
