"use client";

import React, { useState } from "react";
import { NFTAsset } from "../lib/types";
import { Button } from "./ui/Button";
import { Modal } from "./ui/Modal";
import { Spinner } from "./ui/Spinner";
import { CountdownTimer } from "./CountdownTimer";

interface BatchOperationsProps {
  nfts: NFTAsset[];
  currentBlock: number;
  onBatchStake: (tokenIds: number[]) => Promise<void>;
  onBatchUnstake: (tokenIds: number[]) => Promise<void>;
  className?: string;
}

export function BatchOperations({
  nfts,
  currentBlock,
  onBatchStake,
  onBatchUnstake,
  className = "",
}: BatchOperationsProps) {
  const [isStakeModalOpen, setIsStakeModalOpen] = useState(false);
  const [isUnstakeModalOpen, setIsUnstakeModalOpen] = useState(false);
  const [selectedStakeIds, setSelectedStakeIds] = useState<number[]>([]);
  const [selectedUnstakeIds, setSelectedUnstakeIds] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const unstaked = nfts.filter((nft) => !nft.isStaked);
  const staked = nfts.filter((nft) => nft.isStaked);

  const handleBatchStake = async () => {
    if (selectedStakeIds.length === 0) return;
    setIsLoading(true);
    try {
      await onBatchStake(selectedStakeIds);
      setSelectedStakeIds([]);
      setIsStakeModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBatchUnstake = async () => {
    if (selectedUnstakeIds.length === 0) return;
    setIsLoading(true);
    try {
      await onBatchUnstake(selectedUnstakeIds);
      setSelectedUnstakeIds([]);
      setIsUnstakeModalOpen(false);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleStakeSelection = (tokenId: number) => {
    if (selectedStakeIds.includes(tokenId)) {
      setSelectedStakeIds(selectedStakeIds.filter((id) => id !== tokenId));
    } else if (selectedStakeIds.length < 10) {
      setSelectedStakeIds([...selectedStakeIds, tokenId]);
    }
  };

  const toggleUnstakeSelection = (tokenId: number) => {
    if (selectedUnstakeIds.includes(tokenId)) {
      setSelectedUnstakeIds(selectedUnstakeIds.filter((id) => id !== tokenId));
    } else if (selectedUnstakeIds.length < 10) {
      setSelectedUnstakeIds([...selectedUnstakeIds, tokenId]);
    }
  };

  return (
    <div className={`flex gap-3 ${className} animate-fade-in`}>
      <Button
        variant="secondary"
        onClick={() => setIsStakeModalOpen(true)}
        disabled={unstaked.length === 0}
        className="font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
      >
        🚀 Batch Stake {unstaked.length > 0 && `(${unstaked.length})`}
      </Button>
      <Button
        variant="secondary"
        onClick={() => setIsUnstakeModalOpen(true)}
        disabled={staked.length === 0}
        className="font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
      >
        ↩️ Batch Unstake {staked.length > 0 && `(${staked.length})`}
      </Button>

      <Modal
        isOpen={isStakeModalOpen}
        onClose={() => setIsStakeModalOpen(false)}
        title="🚀 Batch Stake NFTs"
      >
        <div className="space-y-4 animate-fade-in">
          <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-lg">
            <p className="text-sm text-gray-300 font-medium">
              Select up to <span className="text-purple-400 font-bold">10 NFTs</span> to stake at once.
            </p>
          </div>
          <div className="grid grid-cols-5 gap-3 max-h-60 overflow-y-auto p-2">
            {unstaked.map((nft, idx) => (
              <button
                key={nft.tokenId}
                onClick={() => toggleStakeSelection(nft.tokenId)}
                style={{ animationDelay: `${idx * 20}ms` }}
                className={`p-3 rounded-lg border-2 transition-all duration-200 animate-fade-in font-bold text-sm flex items-center justify-center ${
                  selectedStakeIds.includes(nft.tokenId)
                    ? "border-purple-400 bg-purple-500/25 shadow-lg shadow-purple-500/20 scale-105 text-purple-200"
                    : "border-gray-700 bg-gray-800/50 hover:border-purple-400/50 hover:bg-gray-800 text-gray-400"
                }`}
              >
                #{nft.tokenId}
              </button>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-700/50">
            <span className="text-sm font-medium text-gray-300">
              Selected: <span className="text-purple-400 font-bold">{selectedStakeIds.length}</span>/10
            </span>
            <Button
              onClick={handleBatchStake}
              disabled={selectedStakeIds.length === 0 || isLoading}
              className="font-semibold"
            >
              {isLoading ? <Spinner size="sm" /> : "✓ Confirm Stake"}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isUnstakeModalOpen}
        onClose={() => setIsUnstakeModalOpen(false)}
        title="↩️ Batch Unstake NFTs"
      >
        <div className="space-y-4 animate-fade-in">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
            <p className="text-sm text-gray-300 font-medium">
              Select up to <span className="text-indigo-400 font-bold">10 NFTs</span> to unstake at once.
            </p>
          </div>
          <div className="grid grid-cols-5 gap-3 max-h-60 overflow-y-auto p-2">
            {staked.map((nft, idx) => (
              <button
                key={nft.tokenId}
                onClick={() => toggleUnstakeSelection(nft.tokenId)}
                style={{ animationDelay: `${idx * 20}ms` }}
                className={`p-3 rounded-lg border-2 transition-all duration-200 animate-fade-in font-bold text-sm flex items-center justify-center ${
                  selectedUnstakeIds.includes(nft.tokenId)
                    ? "border-indigo-400 bg-indigo-500/25 shadow-lg shadow-indigo-500/20 scale-105 text-indigo-200"
                    : "border-gray-700 bg-gray-800/50 hover:border-indigo-400/50 hover:bg-gray-800 text-gray-400"
                }`}
              >
                #{nft.tokenId}
              </button>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-700/50">
            <span className="text-sm font-medium text-gray-300">
              Selected: <span className="text-indigo-400 font-bold">{selectedUnstakeIds.length}</span>/10
            </span>
            <Button
              onClick={handleBatchUnstake}
              disabled={selectedUnstakeIds.length === 0 || isLoading}
              className="font-semibold"
            >
              {isLoading ? <Spinner size="sm" /> : "✓ Confirm Unstake"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
