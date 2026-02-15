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
    <Card className={`${className} animate-fade-in`}>
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-700/50">
        <div>
          <h3 className="text-2xl font-bold gradient-text mb-1">{title}</h3>
          <p className="text-xs text-gray-500">🏆 {entries.length} stakers</p>
        </div>
      </div>

      <div className="space-y-2">
        {entries.map((entry, idx) => {
          const isCurrentUser =
            entry.isCurrentUser ||
            (currentUserAddress &&
              entry.address.toLowerCase() ===
                currentUserAddress.toLowerCase());
          const rankIcon = getRankIcon(entry.rank);

          return (
            <div
              key={entry.address}
              style={{ animationDelay: `${idx * 30}ms` }}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 animate-fade-in border ${
                isCurrentUser
                  ? "bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border-purple-500/50 shadow-lg shadow-purple-500/10"
                  : "bg-gray-800/40 hover:bg-gray-800/60 border-gray-700/30 hover:border-purple-500/30"
              }`}
            >
              <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-900/50 border border-gray-700/50 min-w-[48px]">
                {rankIcon ? (
                  <span className="text-xl">{rankIcon}</span>
                ) : (
                  <span className="text-gray-500 font-bold text-sm">#{entry.rank}</span>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`font-mono text-sm font-semibold ${
                      isCurrentUser ? "text-purple-300" : "text-white"
                    }`}
                  >
                    {formatAddress(entry.address)}
                  </span>
                  {isCurrentUser && (
                    <span className="px-2 py-0.5 text-xs bg-gradient-to-r from-purple-500/30 to-indigo-500/30 text-purple-200 rounded-full font-medium border border-purple-500/30">
                      ⭐ You
                    </span>
                  )}
                </div>
                <div className="flex gap-3 text-xs">
                  <span className="text-gray-500">Staked: <span className="text-green-400 font-semibold">{formatNumber(entry.stakedCount)} NFTs</span></span>
                </div>
              </div>

              <div className="text-right min-w-fit">
                <div className="text-sm font-bold gradient-text mb-1">
                  {formatSTF(entry.totalRewards)} STF
                </div>
                <div className="text-xs text-gray-500 font-medium">earned</div>
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
    <div className={`bg-gradient-to-br from-gray-800/60 to-gray-900/40 rounded-xl p-5 border border-gray-700/30 ${className} animate-fade-in`}>
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-700/30">
        <h4 className="text-base font-bold text-white flex items-center gap-2">
          <span>🏆</span>
          <span>Top Stakers</span>
        </h4>
        <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full font-medium">
          Top {maxDisplay}
        </span>
      </div>
      <div className="space-y-2">
        {displayEntries.map((entry, idx) => (
          <div
            key={entry.address}
            style={{ animationDelay: `${idx * 25}ms` }}
            className="flex items-center justify-between p-2.5 rounded-lg bg-gray-800/50 hover:bg-gray-800/70 transition-all duration-200 animate-fade-in border border-gray-700/20 group"
          >
            <div className="flex items-center gap-2 min-w-0">
              <span className="text-sm font-bold text-purple-400 w-6 text-center group-hover:text-purple-300 transition-colors">
                {entry.rank}
              </span>
              <span className="text-gray-400 text-sm font-mono group-hover:text-white transition-colors">
                {entry.address.slice(0, 4)}...{entry.address.slice(-4)}
              </span>
            </div>
            <span className="text-white font-semibold text-sm bg-purple-500/20 px-2 py-1 rounded text-green-400">
              {formatNumber(entry.stakedCount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
