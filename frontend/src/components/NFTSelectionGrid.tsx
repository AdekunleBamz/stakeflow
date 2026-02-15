"use client";

import React, { useState } from "react";
import { NFTAsset } from "../lib/types";
import { Spinner } from "./ui/Spinner";

interface NFTSelectionGridProps {
  nfts: NFTAsset[];
  selectedIds: number[];
  onSelectionChange: (ids: number[]) => void;
  maxSelection?: number;
  loading?: boolean;
  emptyMessage?: string;
  selectionLabel?: string;
}

export function NFTSelectionGrid({
  nfts,
  selectedIds,
  onSelectionChange,
  maxSelection = 10,
  loading = false,
  emptyMessage = "No NFTs available",
  selectionLabel = "Selected",
}: NFTSelectionGridProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const handleToggle = (tokenId: number) => {
    if (selectedIds.includes(tokenId)) {
      onSelectionChange(selectedIds.filter((id) => id !== tokenId));
    } else if (selectedIds.length < maxSelection) {
      onSelectionChange([...selectedIds, tokenId]);
    }
  };

  const handleSelectAll = () => {
    const available = nfts.slice(0, maxSelection).map((nft) => nft.tokenId);
    onSelectionChange(available);
  };

  const handleClearAll = () => {
    onSelectionChange([]);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="flex flex-col items-center gap-3">
          <Spinner size="lg" />
          <p className="text-gray-500 text-sm animate-pulse">Loading NFTs...</p>
        </div>
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500 px-4 bg-gray-800/30 rounded-lg border border-gray-700/30 animate-fade-in">
        <p className="font-medium">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="flex items-center justify-between px-4 py-3 bg-gray-800/20 rounded-lg border border-gray-700/30">
        <div className="text-sm font-medium text-gray-300">
          {selectionLabel}: 
          <span className="ml-2 px-2 py-1 bg-purple-500/30 text-purple-300 rounded font-mono text-xs">
            {selectedIds.length} / {maxSelection}
          </span>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSelectAll}
            disabled={selectedIds.length >= maxSelection}
            className="text-sm px-3 py-1 rounded bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 disabled:text-gray-600 disabled:bg-gray-700/20 disabled:cursor-not-allowed transition-colors"
          >
            ✓ Select All
          </button>
          <button
            onClick={handleClearAll}
            disabled={selectedIds.length === 0}
            className="text-sm px-3 py-1 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30 disabled:text-gray-600 disabled:bg-gray-700/20 disabled:cursor-not-allowed transition-colors"
          >
            ✕ Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {nfts.map((nft, idx) => {
          const isSelected = selectedIds.includes(nft.tokenId);
          const isHovered = hoveredId === nft.tokenId;
          const isDisabled = !isSelected && selectedIds.length >= maxSelection;

          return (
            <button
              key={nft.tokenId}
              onClick={() => handleToggle(nft.tokenId)}
              onMouseEnter={() => setHoveredId(nft.tokenId)}
              onMouseLeave={() => setHoveredId(null)}
              disabled={isDisabled}
              style={{ animationDelay: `${idx * 20}ms` }}
              className={`
                relative aspect-square rounded-lg border-2 transition-all duration-300 animate-fade-in
                ${
                  isSelected
                    ? "border-purple-400 bg-purple-500/25 shadow-lg shadow-purple-500/20"
                    : "border-gray-700 bg-gray-800/40"
                }
                ${isHovered && !isDisabled ? "border-purple-300 scale-110 shadow-lg shadow-purple-500/30" : ""}
                ${isDisabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer hover:bg-gray-800/60"}
              `}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`text-lg font-bold transition-colors ${
                    isSelected ? "text-purple-200" : "text-gray-500"
                  }`}
                >
                  #{nft.tokenId}
                </span>
              </div>
              {isSelected && (
                <div className="absolute -top-2 -right-2 animate-bounce-gentle">
                  <div className="w-5 h-5 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selectedIds.length > 0 && (
        <div className="text-xs text-gray-600 px-3 py-2 bg-gray-800/20 rounded border border-gray-700/30 animate-fade-in">
          <span className="font-medium">Selected IDs:</span> {selectedIds.sort((a, b) => a - b).join(", ")}
        </div>
      )}
    </div>
  );
}
