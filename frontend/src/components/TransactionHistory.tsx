"use client";

import React from "react";
import { truncateAddress } from "@/lib/utils";

interface TransactionStatus {
  txId: string;
  status: "pending" | "success" | "failed";
  type: "mint" | "stake" | "unstake" | "claim";
  timestamp: number;
  amount?: number;
}

interface TransactionHistoryProps {
  transactions: TransactionStatus[];
  className?: string;
}

export function TransactionHistory({
  transactions,
  className = "",
}: TransactionHistoryProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "success":
        return "text-green-400";
      case "failed":
        return "text-red-400";
      default:
        return "text-yellow-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "mint":
        return "🎨";
      case "stake":
        return "📥";
      case "unstake":
        return "📤";
      case "claim":
        return "💰";
      default:
        return "📄";
    }
  };

  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  if (transactions.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500">No recent transactions</p>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      {transactions.map((tx) => (
        <div
          key={tx.txId}
          className="flex items-center justify-between bg-gray-800/30 rounded-lg p-3"
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{getTypeIcon(tx.type)}</span>
            <div>
              <p className="font-medium capitalize">{tx.type}</p>
              <a
                href={`https://explorer.stacks.co/txid/${tx.txId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-400 hover:text-purple-400"
              >
                {truncateAddress(tx.txId, 8)}
              </a>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-sm font-medium ${getStatusColor(tx.status)}`}>
              {tx.status.charAt(0).toUpperCase() + tx.status.slice(1)}
            </p>
            <p className="text-xs text-gray-500">{formatTime(tx.timestamp)}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
