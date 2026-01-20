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
        <Spinner size="lg" />
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">{emptyMessage}</div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="text-sm text-gray-400">
          {selectionLabel}: {selectedIds.length} / {maxSelection}
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleSelectAll}
            disabled={selectedIds.length >= maxSelection}
            className="text-sm text-purple-400 hover:text-purple-300 disabled:text-gray-600 disabled:cursor-not-allowed"
          >
            Select All
          </button>
          <span className="text-gray-600">|</span>
          <button
            onClick={handleClearAll}
            disabled={selectedIds.length === 0}
            className="text-sm text-purple-400 hover:text-purple-300 disabled:text-gray-600 disabled:cursor-not-allowed"
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {nfts.map((nft) => {
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
              className={`
                relative aspect-square rounded-lg border-2 transition-all duration-200
                ${
                  isSelected
                    ? "border-purple-500 bg-purple-500/20"
                    : "border-gray-700 bg-gray-800/50"
                }
                ${isHovered && !isDisabled ? "border-purple-400 scale-105" : ""}
                ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:bg-gray-700/50"}
              `}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <span
                  className={`text-lg font-bold ${
                    isSelected ? "text-purple-300" : "text-gray-400"
                  }`}
                >
                  #{nft.tokenId}
                </span>
              </div>
              {isSelected && (
                <div className="absolute top-1 right-1">
                  <div className="w-4 h-4 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {selectedIds.length > 0 && (
        <div className="text-xs text-gray-500">
          Selected IDs: {selectedIds.sort((a, b) => a - b).join(", ")}
        </div>
      )}
    </div>
  );
}
