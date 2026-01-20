'use client';

import { useState, useMemo } from 'react';

interface NFT {
  tokenId: number;
  isStaked?: boolean;
}

interface NFTFilterProps {
  nfts: NFT[];
  onFilterChange: (filtered: NFT[]) => void;
}

export function NFTFilter({ nfts, onFilterChange }: NFTFilterProps) {
  const [filter, setFilter] = useState<'all' | 'staked' | 'unstaked'>('all');
  const [sortBy, setSortBy] = useState<'id-asc' | 'id-desc'>('id-asc');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredNFTs = useMemo(() => {
    let result = [...nfts];

    // Apply status filter
    if (filter === 'staked') {
      result = result.filter(nft => nft.isStaked);
    } else if (filter === 'unstaked') {
      result = result.filter(nft => !nft.isStaked);
    }

    // Apply search
    if (searchQuery.trim()) {
      const query = searchQuery.trim();
      result = result.filter(nft => 
        nft.tokenId.toString().includes(query)
      );
    }

    // Apply sort
    result.sort((a, b) => {
      if (sortBy === 'id-asc') return a.tokenId - b.tokenId;
      return b.tokenId - a.tokenId;
    });

    return result;
  }, [nfts, filter, sortBy, searchQuery]);

  // Trigger callback when filtered results change
  useMemo(() => {
    onFilterChange(filteredNFTs);
  }, [filteredNFTs, onFilterChange]);

  const counts = useMemo(() => ({
    all: nfts.length,
    staked: nfts.filter(n => n.isStaked).length,
    unstaked: nfts.filter(n => !n.isStaked).length,
  }), [nfts]);

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by token ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-2 pl-10 text-white placeholder-gray-500 focus:border-purple-500 focus:outline-none"
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'all'
                ? 'bg-purple-500 text-white'
                : 'bg-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            All ({counts.all})
          </button>
          <button
            onClick={() => setFilter('staked')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'staked'
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            Staked ({counts.staked})
          </button>
          <button
            onClick={() => setFilter('unstaked')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === 'unstaked'
                ? 'bg-orange-500 text-white'
                : 'bg-gray-700 text-gray-400 hover:text-white'
            }`}
          >
            Unstaked ({counts.unstaked})
          </button>
        </div>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as 'id-asc' | 'id-desc')}
          className="bg-gray-700 border border-gray-600 rounded-lg px-4 py-2 text-white focus:border-purple-500 focus:outline-none"
        >
          <option value="id-asc">Token ID ↑</option>
          <option value="id-desc">Token ID ↓</option>
        </select>
      </div>

      {/* Results count */}
      <div className="mt-3 text-sm text-gray-400">
        Showing {filteredNFTs.length} of {nfts.length} NFTs
      </div>
    </div>
  );
}

interface NFTBatchSelectProps {
  selectedIds: number[];
  totalCount: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onBatchStake?: () => void;
  onBatchUnstake?: () => void;
  onBatchClaim?: () => void;
}

export function NFTBatchSelect({
  selectedIds,
  totalCount,
  onSelectAll,
  onClearSelection,
  onBatchStake,
  onBatchUnstake,
  onBatchClaim,
}: NFTBatchSelectProps) {
  if (selectedIds.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl px-6 py-4 flex items-center gap-6 z-50">
      <div className="flex items-center gap-4">
        <span className="text-white font-medium">
          {selectedIds.length} selected
        </span>
        <button
          onClick={onSelectAll}
          className="text-purple-400 hover:text-purple-300 text-sm"
        >
          Select all ({totalCount})
        </button>
        <button
          onClick={onClearSelection}
          className="text-gray-400 hover:text-white text-sm"
        >
          Clear
        </button>
      </div>

      <div className="h-8 w-px bg-gray-700" />

      <div className="flex gap-3">
        {onBatchStake && (
          <button
            onClick={onBatchStake}
            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg text-sm font-medium transition-colors"
          >
            Stake Selected
          </button>
        )}
        {onBatchUnstake && (
          <button
            onClick={onBatchUnstake}
            className="px-4 py-2 bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 rounded-lg text-sm font-medium transition-colors"
          >
            Unstake Selected
          </button>
        )}
        {onBatchClaim && (
          <button
            onClick={onBatchClaim}
            className="px-4 py-2 bg-green-500/20 text-green-400 hover:bg-green-500/30 rounded-lg text-sm font-medium transition-colors"
          >
            Claim All Rewards
          </button>
        )}
      </div>
    </div>
  );
}
