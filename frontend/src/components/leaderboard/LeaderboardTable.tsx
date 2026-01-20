'use client';

import { useMemo, useState } from 'react';

interface LeaderboardEntry {
  rank: number;
  address: string;
  displayName?: string;
  stakedNFTs: number;
  totalRewards: number;
  stakingDays: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  highlightAddress?: string;
}

export function LeaderboardTable({ entries, highlightAddress }: LeaderboardTableProps) {
  const [sortBy, setSortBy] = useState<'rank' | 'staked' | 'rewards' | 'days'>('rank');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedEntries = useMemo(() => {
    const sorted = [...entries].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'rank':
          comparison = a.rank - b.rank;
          break;
        case 'staked':
          comparison = a.stakedNFTs - b.stakedNFTs;
          break;
        case 'rewards':
          comparison = a.totalRewards - b.totalRewards;
          break;
        case 'days':
          comparison = a.stakingDays - b.stakingDays;
          break;
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    return sorted;
  }, [entries, sortBy, sortOrder]);

  const handleSort = (key: 'rank' | 'staked' | 'rewards' | 'days') => {
    if (sortBy === key) {
      setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(key);
      setSortOrder('asc');
    }
  };

  const headerButton = (label: string, key: 'rank' | 'staked' | 'rewards' | 'days') => (
    <button
      onClick={() => handleSort(key)}
      className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white"
    >
      {label}
      {sortBy === key && (
        <span className="text-purple-400">{sortOrder === 'asc' ? '↑' : '↓'}</span>
      )}
    </button>
  );

  return (
    <div className="overflow-hidden rounded-2xl border border-gray-800 bg-gray-900/40">
      <div className="grid grid-cols-12 gap-4 px-6 py-4 text-xs uppercase tracking-wide text-gray-500 border-b border-gray-800">
        <div className="col-span-2">{headerButton('Rank', 'rank')}</div>
        <div className="col-span-4">Wallet</div>
        <div className="col-span-2">{headerButton('Staked', 'staked')}</div>
        <div className="col-span-2">{headerButton('Rewards', 'rewards')}</div>
        <div className="col-span-2">{headerButton('Days', 'days')}</div>
      </div>
      <div className="divide-y divide-gray-800">
        {sortedEntries.map((entry) => {
          const isHighlighted = highlightAddress && entry.address === highlightAddress;
          return (
            <div
              key={entry.address}
              className={`grid grid-cols-12 gap-4 px-6 py-4 text-sm ${
                isHighlighted ? 'bg-purple-500/10' : 'hover:bg-gray-800/50'
              } transition-colors`}
            >
              <div className="col-span-2 font-semibold text-white">#{entry.rank}</div>
              <div className="col-span-4">
                <p className="text-white font-medium truncate">
                  {entry.displayName || entry.address}
                </p>
                <p className="text-xs text-gray-500 truncate">{entry.address}</p>
              </div>
              <div className="col-span-2 text-white">{entry.stakedNFTs}</div>
              <div className="col-span-2 text-green-400">{entry.totalRewards.toLocaleString()} STF</div>
              <div className="col-span-2 text-gray-300">{entry.stakingDays}d</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
