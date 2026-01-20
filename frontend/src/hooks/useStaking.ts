'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface StakingStats {
  totalStaked: number;
  totalRewards: number;
  apy: number;
  stakedNFTs: number;
  pendingRewards: number;
}

export function useStakingStats(address?: string) {
  const [stats, setStats] = useState<StakingStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    if (!address) {
      setStats(null);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      // Simulated stats - replace with actual API call
      const mockStats: StakingStats = {
        totalStaked: Math.floor(Math.random() * 100000),
        totalRewards: Math.floor(Math.random() * 50000),
        apy: 12.5,
        stakedNFTs: Math.floor(Math.random() * 10),
        pendingRewards: Math.floor(Math.random() * 1000),
      };

      setStats(mockStats);
    } catch (err) {
      setError('Failed to fetch staking stats');
    } finally {
      setIsLoading(false);
    }
  }, [address]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, isLoading, error, refetch: fetchStats };
}

interface RewardsHistory {
  date: string;
  amount: number;
  type: 'claim' | 'earned';
  txId?: string;
}

export function useRewardsHistory(address?: string, limit = 10) {
  const [history, setHistory] = useState<RewardsHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(false);

  const fetchHistory = useCallback(async (offset = 0) => {
    if (!address) {
      setHistory([]);
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);

      // Simulated history - replace with actual API call
      const mockHistory: RewardsHistory[] = Array.from({ length: limit }, (_, i) => ({
        date: new Date(Date.now() - (offset + i) * 86400000).toISOString(),
        amount: Math.floor(Math.random() * 1000),
        type: Math.random() > 0.5 ? 'claim' : 'earned',
        txId: `0x${Math.random().toString(16).slice(2, 10)}`,
      }));

      if (offset === 0) {
        setHistory(mockHistory);
      } else {
        setHistory((prev) => [...prev, ...mockHistory]);
      }
      setHasMore(mockHistory.length === limit);
    } catch (err) {
      console.error('Failed to fetch rewards history:', err);
    } finally {
      setIsLoading(false);
    }
  }, [address, limit]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  const loadMore = useCallback(() => {
    fetchHistory(history.length);
  }, [fetchHistory, history.length]);

  return { history, isLoading, hasMore, loadMore };
}

export function useStakeNFT() {
  const [isStaking, setIsStaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const stake = useCallback(async (tokenIds: number[]) => {
    try {
      setIsStaking(true);
      setError(null);

      // Simulate staking transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return { success: true, txId: `0x${Math.random().toString(16).slice(2, 10)}` };
    } catch (err) {
      setError('Failed to stake NFTs');
      return { success: false, error: 'Failed to stake' };
    } finally {
      setIsStaking(false);
    }
  }, []);

  return { stake, isStaking, error };
}

export function useUnstakeNFT() {
  const [isUnstaking, setIsUnstaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const unstake = useCallback(async (tokenIds: number[]) => {
    try {
      setIsUnstaking(true);
      setError(null);

      // Simulate unstaking transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return { success: true, txId: `0x${Math.random().toString(16).slice(2, 10)}` };
    } catch (err) {
      setError('Failed to unstake NFTs');
      return { success: false, error: 'Failed to unstake' };
    } finally {
      setIsUnstaking(false);
    }
  }, []);

  return { unstake, isUnstaking, error };
}

export function useClaimRewards() {
  const [isClaiming, setIsClaiming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const claim = useCallback(async () => {
    try {
      setIsClaiming(true);
      setError(null);

      // Simulate claim transaction
      await new Promise((resolve) => setTimeout(resolve, 2000));

      return { success: true, txId: `0x${Math.random().toString(16).slice(2, 10)}` };
    } catch (err) {
      setError('Failed to claim rewards');
      return { success: false, error: 'Failed to claim' };
    } finally {
      setIsClaiming(false);
    }
  }, []);

  return { claim, isClaiming, error };
}

export function useAutoRefresh(callback: () => void, interval = 30000, enabled = true) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (!enabled) return;

    const tick = () => savedCallback.current();
    const id = setInterval(tick, interval);

    return () => clearInterval(id);
  }, [interval, enabled]);
}
