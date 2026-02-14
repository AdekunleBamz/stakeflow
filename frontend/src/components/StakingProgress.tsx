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
      className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-xl p-6 transition-all duration-300 hover:border-purple-500/30 ${className}`}
    >
      <h3 className="text-lg font-semibold text-white mb-6 uppercase tracking-wider">
        Your Staking Progress
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatBox label="Total NFTs" value={formatNumber(totalNFTs)} color="text-purple-400" />
        <StatBox label="Staked" value={formatNumber(stakedNFTs)} color="text-green-400" />
        <StatBox label="Total Earned" value={formatSTF(totalRewardsEarned)} color="text-yellow-400" />
        <StatBox label="Day Streak" value={currentStreak.toString()} color="text-blue-400" />
      </div>

      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-400 font-medium">Staking Rate</span>
          <span className="text-white font-bold">{stakingPercentage.toFixed(1)}%</span>
        </div>
        <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden border border-gray-600">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-indigo-400 rounded-full transition-all duration-500 shadow-lg"
            style={{ width: `${stakingPercentage}%` }}
          />
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2">
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

function StatBox({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="text-center p-3 rounded-lg bg-gray-700/20 hover:bg-gray-700/40 transition-colors duration-200">
      <div className={`text-2xl font-bold ${color}`}>
        {value}
      </div>
      <div className="text-xs text-gray-500 font-medium mt-1">{label}</div>
    </div>
  );
}
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
    <div className={`bg-gray-800/50 border border-gray-700/50 rounded-xl p-6 transition-all duration-300 hover:border-orange-500/30 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-sm font-semibold text-white uppercase tracking-wider">Staking Streak</h4>
        <div className="text-xs text-gray-500 font-medium">Best: <span className="text-orange-400 font-bold">{bestStreak}</span> days</div>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <div className="text-4xl animate-pulse">{streak > 0 ? "🔥" : "❄️"}</div>
        <div>
          <div className="text-3xl font-bold text-orange-400">{streak}</div>
          <div className="text-xs text-gray-500 font-medium">days</div>
        </div>
      </div>

      <div className="flex gap-1">
        {streakDays.map((active, index) => (
          <div
            key={index}
            className={`flex-1 h-3 rounded-full transition-all duration-300 ${
              active
                ? "bg-gradient-to-r from-orange-500 to-yellow-500 animate-glow"
                : "bg-gray-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
