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
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
      <div className="flex items-center gap-3 mb-4">
        <Avatar address={address} size="lg" />
        <div className="flex-1">
          <p className="font-medium text-white">{truncateAddress(address)}</p>
          <p className="text-xs text-gray-400">Connected</p>
        </div>
        <button
          onClick={disconnect}
          className="text-gray-400 hover:text-white transition-colors"
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
          <div className="bg-gray-900/50 rounded-lg p-3">
            <p className="text-xs text-gray-400">STX Balance</p>
            <p className="font-bold text-white">{formatBalance(stxBalance)} STX</p>
          </div>
          <div className="bg-gray-900/50 rounded-lg p-3">
            <p className="text-xs text-gray-400">STF Balance</p>
            <p className="font-bold gradient-text">{formatBalance(stfBalance)} STF</p>
          </div>
        </div>
      )}
    </div>
  );
}
