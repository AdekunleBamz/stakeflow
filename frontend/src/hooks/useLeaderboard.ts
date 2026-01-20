'use client';

import { useEffect, useState } from 'react';

export interface LeaderboardEntry {
  rank: number;
  address: string;
  stakedNFTs: number;
  totalEarned: number;
  currentStreak: number;
  tier?: string;
}

interface LeaderboardStats {
  totalStakers: number;
  totalNFTsStaked: number;
  totalRewardsDistributed: number;
  averageStakeTime: number;
}

interface LeaderboardResponse {
  success: boolean;
  data?: {
    entries: LeaderboardEntry[];
    stats: LeaderboardStats;
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export function useLeaderboard(page = 1, limit = 10, sortBy = 'rank', timeframe = 'all') {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [stats, setStats] = useState<LeaderboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const params = new URLSearchParams({
          page: String(page),
          limit: String(limit),
          sortBy,
          timeframe,
        });
        const response = await fetch(`/api/leaderboard?${params.toString()}`);
        const data: LeaderboardResponse = await response.json();
        if (data.success && data.data) {
          setEntries(data.data.entries);
          setStats(data.data.stats);
        } else {
          setError('Failed to load leaderboard');
        }
      } catch {
        setError('Failed to load leaderboard');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [page, limit, sortBy, timeframe]);

  return { entries, stats, isLoading, error };
}
