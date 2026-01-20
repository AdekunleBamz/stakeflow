"use client";

import React from "react";

interface BlockCounterProps {
  currentBlock: number;
  className?: string;
}

export function BlockCounter({ currentBlock, className = "" }: BlockCounterProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
      <span className="text-sm text-gray-400">
        Block: <span className="text-white font-mono">{currentBlock.toLocaleString()}</span>
      </span>
    </div>
  );
}

interface NetworkStatusProps {
  isConnected: boolean;
  network: "mainnet" | "testnet";
  blockHeight?: number;
}

export function NetworkStatus({
  isConnected,
  network,
  blockHeight,
}: NetworkStatusProps) {
  return (
    <div className="flex items-center gap-4 text-sm">
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full ${
            isConnected ? "bg-green-400" : "bg-gray-500"
          }`}
        />
        <span className="text-gray-400">
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </div>
      
      <span className="text-gray-600">|</span>
      
      <span className={`font-medium ${network === "mainnet" ? "text-purple-400" : "text-yellow-400"}`}>
        {network.charAt(0).toUpperCase() + network.slice(1)}
      </span>
      
      {blockHeight && (
        <>
          <span className="text-gray-600">|</span>
          <span className="text-gray-400 font-mono">
            #{blockHeight.toLocaleString()}
          </span>
        </>
      )}
    </div>
  );
}
