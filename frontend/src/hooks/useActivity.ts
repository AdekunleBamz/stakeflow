'use client';

import { useEffect, useState } from 'react';

export interface ActivityItem {
  id: string;
  type: 'mint' | 'stake' | 'unstake' | 'claim' | 'transfer';
  title: string;
  description: string;
  timestamp: string;
  amount?: number;
  tokenIds?: number[];
}

export function useActivity(address?: string) {
  const [activity, setActivity] = useState<ActivityItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchActivity = async () => {
      if (!address) {
        setActivity([]);
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`/api/activity/${address}`);
        const data = await response.json();
        setActivity(data.activity || []);
      } catch {
        setError('Failed to load activity');
      } finally {
        setIsLoading(false);
      }
    };

    fetchActivity();
  }, [address]);

  return { activity, isLoading, error };
}
