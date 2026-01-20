"use client";

import React from "react";
import { Card, Button } from "./ui";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className = "",
}: EmptyStateProps) {
  return (
    <Card className={`text-center py-12 ${className}`}>
      {icon && <div className="mb-4 text-gray-500">{icon}</div>}
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 max-w-sm mx-auto mb-6">{description}</p>
      {action && (
        <Button onClick={action.onClick}>{action.label}</Button>
      )}
    </Card>
  );
}

export function NoNFTsState({ onMint }: { onMint?: () => void }) {
  return (
    <EmptyState
      icon={
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      }
      title="No NFTs Found"
      description="You don't have any StakeFlow NFTs yet. Mint your first NFT to get started!"
      action={onMint ? { label: "Mint NFT", onClick: onMint } : undefined}
    />
  );
}

export function NoStakedNFTsState() {
  return (
    <EmptyState
      icon={
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      }
      title="No Staked NFTs"
      description="Stake your NFTs to start earning STF rewards. Select NFTs from your collection and stake them."
    />
  );
}

export function WalletNotConnectedState({ onConnect }: { onConnect: () => void }) {
  return (
    <EmptyState
      icon={
        <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      }
      title="Connect Your Wallet"
      description="Connect your Stacks wallet to mint NFTs, stake, and earn rewards."
      action={{ label: "Connect Wallet", onClick: onConnect }}
    />
  );
}
