"use client";

import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useWallet } from "./WalletContext";
import { useBlockHeight } from "../hooks/useBlockHeight";
import { fetchUserNFTs, fetchStakedNFTs, fetchSTFBalance } from "../lib/api";
import { NFTAsset, StakingInfo } from "../lib/types";
import { REWARD_AMOUNT, BLOCKS_PER_REWARD } from "../lib/constants";

interface NFTContextType {
  // Owned NFTs
  ownedNFTs: NFTAsset[];
  stakedNFTs: NFTAsset[];
  allNFTs: NFTAsset[];
  
  // Stats
  totalOwned: number;
  totalStaked: number;
  totalRewardsAvailable: number;
  
  // Loading states
  isLoading: boolean;
  isRefreshing: boolean;
  
  // Actions
  refreshNFTs: () => Promise<void>;
  getNFTById: (tokenId: number) => NFTAsset | undefined;
  getStakingInfo: (tokenId: number) => StakingInfo | undefined;
  calculateRewards: (tokenId: number) => number;
}

const NFTContext = createContext<NFTContextType | null>(null);

interface NFTProviderProps {
  children: React.ReactNode;
}

export function NFTProvider({ children }: NFTProviderProps) {
  const { stxAddress, isConnected } = useWallet();
  const { blockHeight } = useBlockHeight();
  
  const [ownedNFTs, setOwnedNFTs] = useState<NFTAsset[]>([]);
  const [stakedNFTs, setStakedNFTs] = useState<NFTAsset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Calculate derived values
  const allNFTs = [...ownedNFTs, ...stakedNFTs];
  const totalOwned = ownedNFTs.length;
  const totalStaked = stakedNFTs.length;

  const calculateRewards = useCallback(
    (tokenId: number) => {
      const nft = stakedNFTs.find((n) => n.tokenId === tokenId);
      if (!nft || !nft.stakedAtBlock || !blockHeight) return 0;

      const blocksStaked = blockHeight - nft.stakedAtBlock;
      const rewardCycles = Math.floor(blocksStaked / BLOCKS_PER_REWARD);
      return rewardCycles * REWARD_AMOUNT;
    },
    [stakedNFTs, blockHeight]
  );

  const totalRewardsAvailable = stakedNFTs.reduce((total, nft) => {
    return total + calculateRewards(nft.tokenId);
  }, 0);

  const refreshNFTs = useCallback(async () => {
    if (!stxAddress || !isConnected) {
      setOwnedNFTs([]);
      setStakedNFTs([]);
      return;
    }

    setIsRefreshing(true);
    try {
      const [owned, staked] = await Promise.all([
        fetchUserNFTs(stxAddress),
        fetchStakedNFTs(stxAddress),
      ]);
      setOwnedNFTs(owned);
      setStakedNFTs(staked);
    } catch (error) {
      console.error("Failed to refresh NFTs:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, [stxAddress, isConnected]);

  const getNFTById = useCallback(
    (tokenId: number) => {
      return allNFTs.find((nft) => nft.tokenId === tokenId);
    },
    [allNFTs]
  );

  const getStakingInfo = useCallback(
    (tokenId: number): StakingInfo | undefined => {
      const nft = stakedNFTs.find((n) => n.tokenId === tokenId);
      if (!nft || !nft.stakedAtBlock) return undefined;

      return {
        tokenId,
        stakedAt: nft.stakedAtBlock,
        owner: stxAddress || "",
        pendingRewards: calculateRewards(tokenId),
      };
    },
    [stakedNFTs, stxAddress, calculateRewards]
  );

  // Initial load
  useEffect(() => {
    if (isConnected && stxAddress) {
      setIsLoading(true);
      refreshNFTs().finally(() => setIsLoading(false));
    }
  }, [isConnected, stxAddress, refreshNFTs]);

  const value: NFTContextType = {
    ownedNFTs,
    stakedNFTs,
    allNFTs,
    totalOwned,
    totalStaked,
    totalRewardsAvailable,
    isLoading,
    isRefreshing,
    refreshNFTs,
    getNFTById,
    getStakingInfo,
    calculateRewards,
  };

  return <NFTContext.Provider value={value}>{children}</NFTContext.Provider>;
}

export function useNFTContext(): NFTContextType {
  const context = useContext(NFTContext);
  if (!context) {
    throw new Error("useNFTContext must be used within an NFTProvider");
  }
  return context;
}
