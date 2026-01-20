"use client";

import { useState, useEffect, useCallback } from "react";
import { useWallet } from "../contexts/WalletContext";
import { fetchUserNFTs, fetchStakedNFTs, fetchSTFBalance } from "../lib/api";
import { NFTAsset } from "../lib/types";

interface UseWalletDataOptions {
  autoFetch?: boolean;
  pollInterval?: number;
}

interface WalletData {
  ownedNFTs: NFTAsset[];
  stakedNFTs: NFTAsset[];
  stfBalance: number;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useWalletData({
  autoFetch = true,
  pollInterval,
}: UseWalletDataOptions = {}): WalletData {
  const { stxAddress, isConnected } = useWallet();
  const [ownedNFTs, setOwnedNFTs] = useState<NFTAsset[]>([]);
  const [stakedNFTs, setStakedNFTs] = useState<NFTAsset[]>([]);
  const [stfBalance, setStfBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = useCallback(async () => {
    if (!stxAddress || !isConnected) {
      setOwnedNFTs([]);
      setStakedNFTs([]);
      setStfBalance(0);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [owned, staked, balance] = await Promise.all([
        fetchUserNFTs(stxAddress),
        fetchStakedNFTs(stxAddress),
        fetchSTFBalance(stxAddress),
      ]);

      setOwnedNFTs(owned);
      setStakedNFTs(staked);
      setStfBalance(balance);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch data"));
    } finally {
      setIsLoading(false);
    }
  }, [stxAddress, isConnected]);

  useEffect(() => {
    if (autoFetch && isConnected) {
      fetchData();
    }
  }, [autoFetch, isConnected, fetchData]);

  useEffect(() => {
    if (!pollInterval || !isConnected) return;

    const intervalId = setInterval(fetchData, pollInterval);

    return () => clearInterval(intervalId);
  }, [pollInterval, isConnected, fetchData]);

  return {
    ownedNFTs,
    stakedNFTs,
    stfBalance,
    isLoading,
    error,
    refetch: fetchData,
  };
}

export function useIsWalletOwner(address?: string): boolean {
  const { stxAddress } = useWallet();
  
  if (!stxAddress || !address) return false;
  
  return stxAddress.toLowerCase() === address.toLowerCase();
}

export function useWalletBalance(): {
  stxBalance: number;
  stfBalance: number;
  isLoading: boolean;
} {
  const { stxAddress, isConnected } = useWallet();
  const [stxBalance, setStxBalance] = useState(0);
  const [stfBalance, setStfBalance] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stxAddress || !isConnected) {
      setStxBalance(0);
      setStfBalance(0);
      return;
    }

    const fetchBalances = async () => {
      setIsLoading(true);
      try {
        const stf = await fetchSTFBalance(stxAddress);
        setStfBalance(stf);
        // STX balance would come from a different API call
        // For now, setting to 0 as placeholder
        setStxBalance(0);
      } catch (error) {
        console.error("Failed to fetch balances:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBalances();
  }, [stxAddress, isConnected]);

  return { stxBalance, stfBalance, isLoading };
}
