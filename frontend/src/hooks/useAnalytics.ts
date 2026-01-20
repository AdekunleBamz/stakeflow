'use client';

import { useEffect, useState } from 'react';

interface AnalyticsData {
  totalStaked: number;
  totalRewards: number;
  activeStakers: number;
  averageApy: number;
  weeklyRewards: number[];
  stakerGrowth: number[];
  claimRate: number;
  stakedRatio: number;
  updatedAt: string;
}

export function useAnalytics() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch('/api/analytics');
        const result = await response.json();
        setData(result);
      } catch {
        setError('Failed to load analytics');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
}
