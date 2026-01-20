"use client";

import { useState, useEffect, useCallback } from "react";
import { CONTRACTS, API_BASE } from "@/lib/constants";

interface StakingStats {
  totalStaked: number;
  totalRewardsClaimed: number;
  activeStakers: number;
}

export function useStakingStats() {
  const [stats, setStats] = useState<StakingStats>({
    totalStaked: 0,
    totalRewardsClaimed: 0,
    activeStakers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [contractAddress, contractName] = CONTRACTS.STAKING.split(".");
      
      // Fetch total staked from contract
      const response = await fetch(
        `${API_BASE}/v2/contracts/call-read/${contractAddress}/${contractName}/get-total-staked`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ sender: contractAddress, arguments: [] }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.okay && data.result) {
          const match = data.result.match(/u(\d+)/);
          if (match) {
            setStats(prev => ({ ...prev, totalStaked: parseInt(match[1]) }));
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch stats");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, refetch: fetchStats };
}
