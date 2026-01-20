'use client';

import { useState, useMemo } from 'react';

interface NFT {
  tokenId: number;
  isStaked: boolean;
  stakedAt?: string;
  rewards?: number;
}

interface NFTSorterProps {
  nfts: NFT[];
  onSort: (sortedNfts: NFT[]) => void;
}

export function NFTSorter({ nfts, onSort }: NFTSorterProps) {
  const [sortBy, setSortBy] = useState<'id' | 'rewards' | 'date'>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSort = (newSortBy: 'id' | 'rewards' | 'date') => {
    const newOrder = sortBy === newSortBy && sortOrder === 'asc' ? 'desc' : 'asc';
    setSortBy(newSortBy);
    setSortOrder(newOrder);

    const sorted = [...nfts].sort((a, b) => {
      let comparison = 0;
      switch (newSortBy) {
        case 'id':
          comparison = a.tokenId - b.tokenId;
          break;
        case 'rewards':
          comparison = (a.rewards || 0) - (b.rewards || 0);
          break;
        case 'date':
          const dateA = a.stakedAt ? new Date(a.stakedAt).getTime() : 0;
          const dateB = b.stakedAt ? new Date(b.stakedAt).getTime() : 0;
          comparison = dateA - dateB;
          break;
      }
      return newOrder === 'asc' ? comparison : -comparison;
    });

    onSort(sorted);
  };

  const SortButton = ({ value, label }: { value: 'id' | 'rewards' | 'date'; label: string }) => (
    <button
      onClick={() => handleSort(value)}
      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
        sortBy === value
          ? 'bg-purple-600 text-white'
          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
      }`}
    >
      {label}
      {sortBy === value && (
        <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
      )}
    </button>
  );

  return (
    <div className="flex items-center gap-2">
      <span className="text-gray-500 text-sm">Sort by:</span>
      <SortButton value="id" label="ID" />
      <SortButton value="rewards" label="Rewards" />
      <SortButton value="date" label="Staked Date" />
    </div>
  );
}

interface NFTSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export function NFTSearch({ onSearch, placeholder = 'Search by ID...' }: NFTSearchProps) {
  const [query, setQuery] = useState('');

  const handleChange = (value: string) => {
    setQuery(value);
    onSearch(value);
  };

  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <input
        type="text"
        value={query}
        onChange={(e) => handleChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500"
      />
      {query && (
        <button
          onClick={() => handleChange('')}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}

interface NFTManagerProps {
  nfts: NFT[];
  onSelectionChange?: (selectedIds: number[]) => void;
  renderNFT: (nft: NFT, isSelected: boolean, onToggle: () => void) => React.ReactNode;
}

export function NFTManager({ nfts, onSelectionChange, renderNFT }: NFTManagerProps) {
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set());
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedNfts, setDisplayedNfts] = useState(nfts);

  const filteredNfts = useMemo(() => {
    if (!searchQuery) return displayedNfts;
    const query = searchQuery.toLowerCase();
    return displayedNfts.filter((nft) =>
      nft.tokenId.toString().includes(query)
    );
  }, [displayedNfts, searchQuery]);

  const handleToggle = (tokenId: number) => {
    const newSelected = new Set(selectedIds);
    if (newSelected.has(tokenId)) {
      newSelected.delete(tokenId);
    } else {
      newSelected.add(tokenId);
    }
    setSelectedIds(newSelected);
    onSelectionChange?.(Array.from(newSelected));
  };

  const selectAll = () => {
    const allIds = new Set(filteredNfts.map((nft) => nft.tokenId));
    setSelectedIds(allIds);
    onSelectionChange?.(Array.from(allIds));
  };

  const clearSelection = () => {
    setSelectedIds(new Set());
    onSelectionChange?.([]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <NFTSearch onSearch={setSearchQuery} />
        </div>
        <NFTSorter nfts={nfts} onSort={setDisplayedNfts} />
      </div>

      <div className="flex items-center justify-between">
        <p className="text-gray-400 text-sm">
          {filteredNfts.length} NFT{filteredNfts.length !== 1 ? 's' : ''} found
          {selectedIds.size > 0 && (
            <span className="text-purple-400 ml-2">
              ({selectedIds.size} selected)
            </span>
          )}
        </p>
        <div className="flex gap-2">
          <button
            onClick={selectAll}
            className="text-sm text-purple-400 hover:text-purple-300"
          >
            Select All
          </button>
          <button
            onClick={clearSelection}
            className="text-sm text-gray-500 hover:text-gray-400"
            disabled={selectedIds.size === 0}
          >
            Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {filteredNfts.map((nft) => (
          <div key={nft.tokenId}>
            {renderNFT(
              nft,
              selectedIds.has(nft.tokenId),
              () => handleToggle(nft.tokenId)
            )}
          </div>
        ))}
      </div>

      {filteredNfts.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No NFTs found matching your search
        </div>
      )}
    </div>
  );
}
