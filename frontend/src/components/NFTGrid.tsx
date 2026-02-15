"use client";

import React from "react";
import { NFTCard } from "./NFTCard";
import type { NFTAsset } from "@/lib/types";

interface NFTGridProps {
  nfts: NFTAsset[];
  selectedIds: number[];
  onToggleSelect: (id: number) => void;
  emptyMessage?: string;
  columns?: 4 | 6 | 8;
  showRewards?: boolean;
}

export function NFTGrid({
  nfts,
  selectedIds,
  onToggleSelect,
  emptyMessage = "No NFTs found",
  columns = 6,
  showRewards = false,
}: NFTGridProps) {
  const columnClasses = {
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
    6: "grid-cols-3 md:grid-cols-4 lg:grid-cols-6",
    8: "grid-cols-4 md:grid-cols-6 lg:grid-cols-8",
  };

  if (nfts.length === 0) {
    return (
      <div className="text-center py-12 px-4 bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-lg border border-gray-700/30 animate-fade-in">
        <div className="inline-block mb-3">
          <div className="text-4xl mb-2">📭</div>
        </div>
        <p className="text-gray-500 font-medium">{emptyMessage}</p>
        <p className="text-gray-600 text-sm mt-2">Start by minting your first NFT</p>
      </div>
    );
  }

  return (
    <div className={`grid ${columnClasses[columns]} gap-4 animate-fade-in`}>
      {nfts.map((nft, idx) => (
        <div
          key={nft.id}
          style={{ animationDelay: `${idx * 25}ms` }}
          className="animate-fade-in"
        >
          <NFTCard
            id={nft.id}
            isStaked={nft.isStaked}
            isSelected={selectedIds.includes(nft.id)}
            onClick={() => onToggleSelect(nft.id)}
            pendingRewards={showRewards ? nft.pendingRewards : undefined}
          />
        </div>
      ))}
    </div>
  );
}
