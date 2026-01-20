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
      <div className="text-center py-12">
        <p className="text-gray-500">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={`grid ${columnClasses[columns]} gap-3`}>
      {nfts.map((nft) => (
        <NFTCard
          key={nft.id}
          id={nft.id}
          isStaked={nft.isStaked}
          isSelected={selectedIds.includes(nft.id)}
          onClick={() => onToggleSelect(nft.id)}
          pendingRewards={showRewards ? nft.pendingRewards : undefined}
        />
      ))}
    </div>
  );
}
