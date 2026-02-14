"use client";

import React from "react";
import { useWallet } from "../contexts/WalletContext";
import { formatAddress } from "../lib/formatters";
import { Button } from "./ui/Button";
import { Spinner } from "./ui/Spinner";

interface ConnectWalletButtonProps {
  className?: string;
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  showAddress?: boolean;
}

export function ConnectWalletButton({
  className = "",
  variant = "primary",
  size = "md",
  showAddress = true,
}: ConnectWalletButtonProps) {
  const { isConnected, stxAddress, connect, disconnect, isConnecting } =
    useWallet();

  if (isConnecting) {
    return (
      <Button variant={variant} size={size} disabled className={className}>
        <Spinner size="sm" className="mr-2" />
        Connecting...
      </Button>
    );
  }

  if (isConnected && stxAddress) {
    return (
      <div className={`flex items-center gap-2 ${className} animate-fade-in`}>
        {showAddress && (
          <div className="px-3 py-1.5 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-colors duration-200 hover:bg-gray-700/50" title={stxAddress}>
            <span className="text-sm font-mono text-gray-300">
              {formatAddress(stxAddress, 4)}
            </span>
          </div>
        )}
        <Button 
          variant="outline" 
          size={size} 
          onClick={disconnect}
          aria-label="Disconnect wallet"
        >
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button 
      variant={variant} 
      size={size} 
      onClick={connect} 
      className={`${className} hover:shadow-2xl active:scale-95`}
      aria-label="Connect crypto wallet"
    >
      Connect Wallet
    </Button>
  );
}

interface WalletRequiredProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export function WalletRequired({ children, fallback }: WalletRequiredProps) {
  const { isConnected, connect } = useWallet();

  if (!isConnected) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex flex-col items-center justify-center py-12 text-center animate-fade-in">
        <div className="w-16 h-16 mb-4 rounded-full bg-gradient-to-br from-purple-500/30 to-indigo-500/30 flex items-center justify-center border border-purple-500/30 transition-transform duration-300 hover:scale-110">
          <svg
            className="w-8 h-8 text-purple-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">
          Wallet Required
        </h3>
        <p className="text-gray-400 mb-4 max-w-sm leading-relaxed">
          Connect your Stacks wallet to access this feature
        </p>
        <Button onClick={connect} className="hover:shadow-2xl">Connect Wallet</Button>
      </div>
    );
  }

  return <>{children}</>;
}

interface WalletGateProps {
  children: React.ReactNode;
  message?: string;
}

export function WalletGate({
  children,
  message = "Please connect your wallet to continue",
}: WalletGateProps) {
  const { isConnected } = useWallet();

  if (!isConnected) {
    return (
      <div className="relative">
        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-sm z-10 flex items-center justify-center rounded-lg animate-fade-in">
          <div className="text-center p-6">
            <p className="text-gray-300 mb-3 leading-relaxed">{message}</p>
            <ConnectWalletButton />
          </div>
        </div>
        <div className="opacity-30 pointer-events-none transition-opacity duration-300">{children}</div>
      </div>
    );
  }

  return <>{children}</>;
}
