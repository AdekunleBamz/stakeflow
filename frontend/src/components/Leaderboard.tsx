"use client";

import React from "react";
import { formatNumber, formatSTF } from "../lib/formatters";
import { Card } from "./ui/Card";

interface LeaderboardEntry {
  rank: number;
  address: string;
  stakedCount: number;
  totalRewards: number;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  entries: LeaderboardEntry[];
  currentUserAddress?: string;
  title?: string;
  className?: string;
}

export function Leaderboard({
  entries,
  currentUserAddress,
  title = "Top Stakers",
  className = "",
}: LeaderboardProps) {
  const formatAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return "🥇";
      case 2:
        return "🥈";
      case 3:
        return "🥉";
      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-xs text-gray-500">
          {entries.length} stakers
        </span>
      </div>

      <div className="space-y-2">
        {entries.map((entry) => {
          const isCurrentUser =
            entry.isCurrentUser ||
            (currentUserAddress &&
              entry.address.toLowerCase() ===
                currentUserAddress.toLowerCase());

          return (
            <div
              key={entry.address}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isCurrentUser
                  ? "bg-purple-500/20 border border-purple-500/50"
                  : "bg-gray-800/50 hover:bg-gray-800"
              }`}
            >
              <div className="w-8 text-center">
                {getRankIcon(entry.rank) || (
                  <span className="text-gray-500 text-sm">#{entry.rank}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span
                    className={`font-mono text-sm ${
                      isCurrentUser ? "text-purple-300" : "text-white"
                    }`}
                  >
                    {formatAddress(entry.address)}
                  </span>
                  {isCurrentUser && (
                    <span className="px-1.5 py-0.5 text-xs bg-purple-500/30 text-purple-300 rounded">
                      You
                    </span>
                  )}
                </div>
              </div>

              <div className="text-right">
                <div className="text-sm font-medium text-white">
                  {formatNumber(entry.stakedCount)} NFTs
                </div>
                <div className="text-xs text-gray-500">
                  {formatSTF(entry.totalRewards)} earned
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

interface LeaderboardMiniProps {
  entries: LeaderboardEntry[];
  maxDisplay?: number;
  className?: string;
}

export function LeaderboardMini({
  entries,
  maxDisplay = 5,
  className = "",
}: LeaderboardMiniProps) {
  const displayEntries = entries.slice(0, maxDisplay);

  return (
    <div className={`bg-gray-800/50 rounded-xl p-4 ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-white">Top Stakers</h4>
        <span className="text-xs text-gray-500">🏆</span>
      </div>
      <div className="space-y-2">
        {displayEntries.map((entry) => (
          <div
            key={entry.address}
            className="flex items-center justify-between text-sm"
          >
            <span className="text-gray-400">
              {entry.rank}. {entry.address.slice(0, 4)}...{entry.address.slice(-4)}
            </span>
            <span className="text-white font-medium">
              {formatNumber(entry.stakedCount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
