"use client";

import { useState, useEffect, useCallback } from "react";
import { CONTRACTS, API_BASE, BLOCKS_PER_REWARD, REWARD_AMOUNT } from "@/lib/constants";

interface PendingRewards {
  totalPending: number;
  rewardsByNFT: Map<number, number>;
}

export function usePendingRewards(
  address: string | null,
  stakedNFTIds: number[],
  currentBlock: number
) {
  const [rewards, setRewards] = useState<PendingRewards>({
    totalPending: 0,
    rewardsByNFT: new Map(),
  });
  const [loading, setLoading] = useState(false);

  const calculateRewards = useCallback(async () => {
    if (!address || stakedNFTIds.length === 0 || currentBlock === 0) {
      setRewards({ totalPending: 0, rewardsByNFT: new Map() });
      return;
    }

    setLoading(true);

    try {
      const [contractAddress, contractName] = CONTRACTS.STAKING.split(".");
      const rewardsByNFT = new Map<number, number>();
      let totalPending = 0;

      for (const tokenId of stakedNFTIds) {
        // Fetch staking info for each NFT
        const response = await fetch(
          `${API_BASE}/v2/contracts/call-read/${contractAddress}/${contractName}/get-staking-info`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sender: contractAddress,
              arguments: [`0x0100000000000000000000000000000000${tokenId.toString(16).padStart(16, '0')}`],
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          // Parse and calculate rewards based on blocks staked
          // Simplified calculation: blocks since stake * reward rate
          if (data.okay && data.result) {
            const stakedBlockMatch = data.result.match(/staked-at[^\d]*u(\d+)/);
            if (stakedBlockMatch) {
              const stakedAt = parseInt(stakedBlockMatch[1]);
              const blocksSinceStake = currentBlock - stakedAt;
              const rewardPeriods = Math.floor(blocksSinceStake / BLOCKS_PER_REWARD);
              const reward = rewardPeriods * REWARD_AMOUNT;
              rewardsByNFT.set(tokenId, reward);
              totalPending += reward;
            }
          }
        }
      }

      setRewards({ totalPending, rewardsByNFT });
    } catch (err) {
      console.error("Error calculating rewards:", err);
    } finally {
      setLoading(false);
    }
  }, [address, stakedNFTIds, currentBlock]);

  useEffect(() => {
    calculateRewards();
  }, [calculateRewards]);

  return { rewards, loading, refetch: calculateRewards };
}
