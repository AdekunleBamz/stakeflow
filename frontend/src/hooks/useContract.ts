'use client';

import { useState, useEffect, useCallback } from 'react';
import { StacksNetwork, StacksMainnet } from '@stacks/network';
import { callReadOnlyFunction, cvToJSON, principalCV } from '@stacks/transactions';

const network: StacksNetwork = new StacksMainnet();

const CONTRACTS = {
  NFT: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-nft-mainnet-v2',
  TOKEN: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-token-mainnet',
  STAKING: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-staking-mainnet-v3',
  REWARDS: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-rewards-mainnet-v3',
};

interface ContractStats {
  totalSupply: number;
  totalStaked: number;
  rewardPool: number;
  mintPrice: number;
  isLoading: boolean;
  error: string | null;
}

export function useContractStats(): ContractStats {
  const [stats, setStats] = useState<ContractStats>({
    totalSupply: 0,
    totalStaked: 0,
    rewardPool: 0,
    mintPrice: 0,
    isLoading: true,
    error: null,
  });

  const fetchStats = useCallback(async () => {
    try {
      const [contractAddress, contractName] = CONTRACTS.NFT.split('.');

      // Fetch total supply
      const supplyResult = await callReadOnlyFunction({
        network,
        contractAddress,
        contractName,
        functionName: 'get-last-token-id',
        functionArgs: [],
        senderAddress: contractAddress,
      });

      const supplyJson = cvToJSON(supplyResult);
      const totalSupply = supplyJson?.value?.value || 0;

      // Fetch mint price
      const priceResult = await callReadOnlyFunction({
        network,
        contractAddress,
        contractName,
        functionName: 'get-mint-price',
        functionArgs: [],
        senderAddress: contractAddress,
      });

      const priceJson = cvToJSON(priceResult);
      const mintPrice = priceJson?.value?.value || 0;

      setStats({
        totalSupply: Number(totalSupply),
        totalStaked: 0, // Would fetch from staking contract
        rewardPool: 0,  // Would fetch from rewards contract
        mintPrice: Number(mintPrice) / 1000000, // Convert to STX
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setStats((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch stats',
      }));
    }
  }, []);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, [fetchStats]);

  return stats;
}

interface UserContractData {
  ownedNFTs: number[];
  stakedNFTs: number[];
  pendingRewards: number;
  tokenBalance: number;
  isLoading: boolean;
  error: string | null;
  refresh: () => void;
}

export function useUserContractData(address?: string): UserContractData {
  const [data, setData] = useState<Omit<UserContractData, 'refresh'>>({
    ownedNFTs: [],
    stakedNFTs: [],
    pendingRewards: 0,
    tokenBalance: 0,
    isLoading: false,
    error: null,
  });

  const fetchData = useCallback(async () => {
    if (!address) {
      setData({
        ownedNFTs: [],
        stakedNFTs: [],
        pendingRewards: 0,
        tokenBalance: 0,
        isLoading: false,
        error: null,
      });
      return;
    }

    setData((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      const [tokenAddress, tokenName] = CONTRACTS.TOKEN.split('.');

      // Fetch token balance
      const balanceResult = await callReadOnlyFunction({
        network,
        contractAddress: tokenAddress,
        contractName: tokenName,
        functionName: 'get-balance',
        functionArgs: [principalCV(address)],
        senderAddress: tokenAddress,
      });

      const balanceJson = cvToJSON(balanceResult);
      const balance = balanceJson?.value?.value || 0;

      setData({
        ownedNFTs: [], // Would need indexer or iterate through tokens
        stakedNFTs: [], // Would fetch from staking contract
        pendingRewards: 0, // Would calculate from rewards contract
        tokenBalance: Number(balance) / 1000000, // Convert from micro
        isLoading: false,
        error: null,
      });
    } catch (error) {
      setData((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Failed to fetch data',
      }));
    }
  }, [address]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { ...data, refresh: fetchData };
}

// Hook for checking if user owns specific NFT
export function useNFTOwnership(tokenId: number, address?: string) {
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!address || !tokenId) {
      setIsOwner(null);
      return;
    }

    const checkOwnership = async () => {
      setIsLoading(true);
      try {
        const [contractAddress, contractName] = CONTRACTS.NFT.split('.');

        const result = await callReadOnlyFunction({
          network,
          contractAddress,
          contractName,
          functionName: 'get-owner',
          functionArgs: [{ type: 'uint', value: tokenId.toString() }],
          senderAddress: contractAddress,
        });

        const json = cvToJSON(result);
        const owner = json?.value?.value;
        setIsOwner(owner === address);
      } catch {
        setIsOwner(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkOwnership();
  }, [tokenId, address]);

  return { isOwner, isLoading };
}
