"use client";

import { useState, useEffect, useCallback } from "react";
import { CONTRACTS, API_BASE } from "@/lib/constants";
import type { NFTAsset } from "@/lib/types";

export function useNFTs(address: string | null) {
  const [nfts, setNfts] = useState<NFTAsset[]>([]);
  const [stakedNfts, setStakedNfts] = useState<NFTAsset[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNFTs = useCallback(async () => {
    if (!address) {
      setNfts([]);
      setStakedNfts([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `${API_BASE}/extended/v1/tokens/nft/holdings?principal=${address}&asset_identifiers=${CONTRACTS.NFT}::stakeflow-nft`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch NFTs");
      }

      const data = await response.json();
      const fetchedNfts: NFTAsset[] = [];

      for (const holding of data.results || []) {
        const tokenId = parseInt(holding.value.repr.replace("u", ""));
        fetchedNfts.push({ id: tokenId, isStaked: false });
      }

      setNfts(fetchedNfts);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  const totalNFTs = nfts.length + stakedNfts.length;

  return { 
    nfts, 
    stakedNfts,
    totalNFTs,
    loading, 
    error, 
    refetch: fetchNFTs 
  };
}
