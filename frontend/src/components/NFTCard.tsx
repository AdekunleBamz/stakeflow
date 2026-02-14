"use client";

import React from "react";

interface NFTCardProps {
  id: number;
  isStaked?: boolean;
  isSelected?: boolean;
  onClick?: () => void;
  pendingRewards?: number;
  stakedSince?: number;
}

export function NFTCard({
  id,
  isStaked = false,
  isSelected = false,
  onClick,
  pendingRewards,
  stakedSince,
}: NFTCardProps) {
  return (
    <button
      onClick={onClick}
      className={`relative aspect-square rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 focus:ring-offset-gray-900 group ${
        isSelected
          ? "border-purple-500 bg-gradient-to-br from-purple-500/30 to-purple-600/20 shadow-lg shadow-purple-500/30"
          : "border-gray-700 bg-gray-800/50 hover:border-purple-500/50 hover:bg-gray-800/70 hover:shadow-lg"
      }`}
    >
      {/* Gradient Background Effect */}
      <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-gradient-to-br from-purple-400 to-indigo-600" />
      
      {/* NFT ID */}
      <span className="text-3xl font-bold text-white relative z-10 group-hover:scale-110 transition-transform duration-200">#{id}</span>
      
      {/* Status Badge */}
      {isStaked && (
        <span className="absolute top-2 right-2 px-3 py-1 text-xs font-semibold bg-gradient-to-r from-green-900/80 to-green-800/80 text-green-300 rounded-full border border-green-700/50 transition-all duration-200 animate-pulse-subtle">
          ✓ Staked
        </span>
      )}
      
      {/* Pending Rewards */}
      {isStaked && pendingRewards !== undefined && pendingRewards > 0 && (
        <span className="text-sm text-green-400 mt-2 font-semibold relative z-10">
          +{(pendingRewards / 1000000).toFixed(2)} STF
        </span>
      )}
      
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute bottom-2 right-2 animate-bounce-gentle">
          <svg
            className="w-6 h-6 text-purple-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </button>
  );
}
