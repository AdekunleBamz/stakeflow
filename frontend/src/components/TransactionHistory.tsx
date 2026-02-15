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
      <div className={`text-center py-8 px-4 ${className} bg-gray-800/20 rounded-lg border border-gray-700/30 animate-fade-in`}>
        <p className="text-3xl mb-2">📭</p>
        <p className="text-gray-400 font-medium">No recent transactions</p>
        <p className="text-sm text-gray-500 mt-1">Your transactions will appear here</p>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className} animate-fade-in`}>
      {transactions.map((tx, index) => (
        <div
          key={tx.txId}
          style={{ animationDelay: `${index * 50}ms` }}
          className={`flex items-center justify-between p-4 rounded-lg border transition-all duration-300 animate-slide-in-left
            ${tx.status === "success" 
              ? "bg-green-500/10 border-green-500/30 hover:bg-green-500/15 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10"
              : tx.status === "failed"
              ? "bg-red-500/10 border-red-500/30 hover:bg-red-500/15 hover:border-red-500/50 hover:shadow-lg hover:shadow-red-500/10"
              : "bg-yellow-500/10 border-yellow-500/30 hover:bg-yellow-500/15 hover:border-yellow-500/50 hover:shadow-lg hover:shadow-yellow-500/10"
            }
          `}
        >
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <span className="text-2xl transition-transform duration-300 hover:scale-130">{getTypeIcon(tx.type)}</span>
            <div className="min-w-0">
              <p className="font-semibold text-white capitalize">{tx.type}</p>
              <a
                href={`https://explorer.stacks.co/txid/${tx.txId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-purple-400 transition-colors duration-200 font-mono hover:underline truncate"
              >
                {truncateAddress(tx.txId, 8)} ↗
              </a>
            </div>
          </div>
          <div className="text-right ml-4 flex items-center gap-4">
            <div>
              <p className={`text-sm font-bold transition-colors ${getStatusColor(tx.status)}`}>
                {tx.status === "success" ? "✓ Success" : tx.status === "failed" ? "✕ Failed" : "⏳ Pending"}
              </p>
              <p className="text-xs text-gray-500 font-medium">{formatTime(tx.timestamp)}</p>
            </div>
            {tx.amount && (
              <div className="text-right px-2 py-1 bg-gray-900/50 rounded border border-gray-700/50">
                <p className="text-xs font-bold text-purple-400">{tx.amount} STF</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
