"use client";

import { useState, useEffect, useCallback } from "react";
import { API_BASE } from "@/lib/constants";

interface BlockInfo {
  height: number;
  hash: string;
  timestamp: number;
}

export function useBlockHeight() {
  const [blockInfo, setBlockInfo] = useState<BlockInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBlock = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/extended/v1/block?limit=1`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch block info");
      }

      const data = await response.json();
      const block = data.results?.[0];
      
      if (block) {
        setBlockInfo({
          height: block.height,
          hash: block.hash,
          timestamp: block.burn_block_time,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlock();
    
    // Refresh every 30 seconds
    const interval = setInterval(fetchBlock, 30000);
    return () => clearInterval(interval);
  }, [fetchBlock]);

  return { 
    blockHeight: blockInfo?.height ?? 0,
    blockHash: blockInfo?.hash ?? "",
    timestamp: blockInfo?.timestamp ?? 0,
    loading, 
    error,
    refetch: fetchBlock,
  };
}
