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
      className={`relative aspect-square rounded-xl border-2 flex flex-col items-center justify-center transition-all duration-200 ${
        isSelected
          ? "border-purple-500 bg-purple-500/20 shadow-lg shadow-purple-500/20"
          : "border-gray-700 bg-gray-800/50 hover:border-gray-600 hover:bg-gray-800"
      }`}
    >
      {/* NFT ID */}
      <span className="text-lg font-bold text-white">#{id}</span>
      
      {/* Status Badge */}
      {isStaked && (
        <span className="absolute top-2 right-2 px-2 py-0.5 text-xs font-medium bg-green-900/50 text-green-400 rounded-full border border-green-800">
          Staked
        </span>
      )}
      
      {/* Pending Rewards */}
      {isStaked && pendingRewards !== undefined && pendingRewards > 0 && (
        <span className="text-xs text-purple-400 mt-1">
          +{(pendingRewards / 1000000).toFixed(2)} STF
        </span>
      )}
      
      {/* Selection Indicator */}
      {isSelected && (
        <div className="absolute bottom-2 right-2">
          <svg
            className="w-5 h-5 text-purple-400"
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
