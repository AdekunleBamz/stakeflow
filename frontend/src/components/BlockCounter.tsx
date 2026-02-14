"use client";

import React from "react";

interface BlockCounterProps {
  currentBlock: number;
  className?: string;
}

export function BlockCounter({ currentBlock, className = "" }: BlockCounterProps) {
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-800/30 border border-gray-700/50 transition-all duration-200 hover:border-gray-600 ${className}`}>
      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse-subtle" />
      <span className="text-sm text-gray-300 font-medium">
        Block: <span className="text-white font-mono font-semibold">{currentBlock.toLocaleString()}</span>
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
    <div className="flex items-center gap-4 text-sm px-4 py-2 rounded-lg bg-gray-800/30 border border-gray-700/50 transition-all duration-200">
      <div className="flex items-center gap-2">
        <div
          className={`w-2 h-2 rounded-full transition-all duration-300 ${
            isConnected ? "bg-green-400 animate-pulse-subtle" : "bg-gray-500"
          }`}
        />
        <span className={`font-medium ${ isConnected ? "text-green-400" : "text-gray-400"}`}>
          {isConnected ? "Connected" : "Disconnected"}
        </span>
      </div>
      
      <span className="text-gray-600">|</span>
      
      <span className={`font-semibold ${network === "mainnet" ? "text-purple-400" : "text-yellow-400"}`}>
        {network.charAt(0).toUpperCase() + network.slice(1)}
      </span>
      
      {blockHeight && (
        <>
          <span className="text-gray-600">|</span>
          <span className="text-gray-300 font-mono">
            #{blockHeight.toLocaleString()}
          </span>
        </>
      )}
    </div>
  );
}
