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
    <div className={`flex gap-3 ${className}`}>
      <Button
        variant="secondary"
        onClick={() => setIsStakeModalOpen(true)}
        disabled={unstaked.length === 0}
      >
        Batch Stake ({unstaked.length})
      </Button>
      <Button
        variant="secondary"
        onClick={() => setIsUnstakeModalOpen(true)}
        disabled={staked.length === 0}
      >
        Batch Unstake ({staked.length})
      </Button>

      <Modal
        isOpen={isStakeModalOpen}
        onClose={() => setIsStakeModalOpen(false)}
        title="Batch Stake NFTs"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-400">
            Select up to 10 NFTs to stake at once.
          </p>
          <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto">
            {unstaked.map((nft) => (
              <button
                key={nft.tokenId}
                onClick={() => toggleStakeSelection(nft.tokenId)}
                className={`p-2 rounded-lg border-2 transition-all ${
                  selectedStakeIds.includes(nft.tokenId)
                    ? "border-purple-500 bg-purple-500/20"
                    : "border-gray-700 bg-gray-800 hover:border-gray-600"
                }`}
              >
                <div className="text-sm font-bold text-white">
                  #{nft.tokenId}
                </div>
              </button>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
            <span className="text-sm text-gray-400">
              Selected: {selectedStakeIds.length}/10
            </span>
            <Button
              onClick={handleBatchStake}
              disabled={selectedStakeIds.length === 0 || isLoading}
            >
              {isLoading ? <Spinner size="sm" /> : "Stake Selected"}
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={isUnstakeModalOpen}
        onClose={() => setIsUnstakeModalOpen(false)}
        title="Batch Unstake NFTs"
      >
        <div className="space-y-4">
          <p className="text-sm text-gray-400">
            Select up to 10 NFTs to unstake at once.
          </p>
          <div className="grid grid-cols-5 gap-2 max-h-60 overflow-y-auto">
            {staked.map((nft) => (
              <button
                key={nft.tokenId}
                onClick={() => toggleUnstakeSelection(nft.tokenId)}
                className={`p-2 rounded-lg border-2 transition-all ${
                  selectedUnstakeIds.includes(nft.tokenId)
                    ? "border-purple-500 bg-purple-500/20"
                    : "border-gray-700 bg-gray-800 hover:border-gray-600"
                }`}
              >
                <div className="text-sm font-bold text-white">
                  #{nft.tokenId}
                </div>
              </button>
            ))}
          </div>
          <div className="flex justify-between items-center pt-4 border-t border-gray-700">
            <span className="text-sm text-gray-400">
              Selected: {selectedUnstakeIds.length}/10
            </span>
            <Button
              onClick={handleBatchUnstake}
              disabled={selectedUnstakeIds.length === 0 || isLoading}
            >
              {isLoading ? <Spinner size="sm" /> : "Unstake Selected"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
