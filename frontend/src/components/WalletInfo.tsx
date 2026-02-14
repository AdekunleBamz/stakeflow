"use client";

import React from "react";
import { useWallet } from "@/contexts/WalletContext";
import { Avatar } from "./ui/Avatar";
import { truncateAddress } from "@/lib/utils";

interface WalletInfoProps {
  stxBalance?: number;
  stfBalance?: number;
  showDetails?: boolean;
}

export function WalletInfo({
  stxBalance = 0,
  stfBalance = 0,
  showDetails = true,
}: WalletInfoProps) {
  const { isConnected, address, disconnect } = useWallet();

  if (!isConnected || !address) {
    return null;
  }

  const formatBalance = (balance: number, decimals = 6) => {
    return (balance / 1_000_000).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 transition-all duration-300 hover:border-gray-600 hover:bg-gray-800 animate-fade-in">
      <div className="flex items-center gap-3 mb-4">
        <div className="transform hover:scale-110 transition-transform duration-200">
          <Avatar address={address} size="lg" />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-white text-sm">{truncateAddress(address)}</p>
          <p className="text-xs text-green-400 font-medium flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-subtle"></span>
            Connected
          </p>
        </div>
        <button
          onClick={disconnect}
          className="text-gray-400 hover:text-red-400 transition-colors duration-200 hover:scale-110 transform"
          aria-label="Disconnect wallet"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
        </button>
      </div>

      {showDetails && (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50 transition-all duration-200 hover:border-blue-500/30 hover:bg-gray-900">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">STX Balance</p>
            <p className="font-bold text-white text-lg mt-1">{formatBalance(stxBalance)} &nbsp;<span className="text-sm text-gray-400">STX</span></p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/50 transition-all duration-200 hover:border-purple-500/30 hover:bg-gray-900">
            <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">STF Balance</p>
            <p className="font-bold gradient-text text-lg mt-1">{formatBalance(stfBalance)} &nbsp;<span className="text-sm text-gray-400">STF</span></p>
          </div>
        </div>
      )}
    </div>
  );
}
