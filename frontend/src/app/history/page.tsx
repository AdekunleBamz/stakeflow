'use client';

import { useState } from 'react';

interface HistoryEntry {
  id: string;
  type: 'mint' | 'stake' | 'unstake' | 'claim' | 'transfer';
  timestamp: Date;
  txId: string;
  details: {
    tokenId?: number;
    amount?: number;
    from?: string;
    to?: string;
  };
  status: 'success' | 'pending' | 'failed';
}

const mockHistory: HistoryEntry[] = [
  {
    id: '1',
    type: 'claim',
    timestamp: new Date('2024-01-15T10:30:00'),
    txId: '0x1234...5678',
    details: { amount: 250 },
    status: 'success',
  },
  {
    id: '2',
    type: 'stake',
    timestamp: new Date('2024-01-14T15:45:00'),
    txId: '0x2345...6789',
    details: { tokenId: 142 },
    status: 'success',
  },
  {
    id: '3',
    type: 'mint',
    timestamp: new Date('2024-01-14T15:42:00'),
    txId: '0x3456...7890',
    details: { tokenId: 142 },
    status: 'success',
  },
  {
    id: '4',
    type: 'unstake',
    timestamp: new Date('2024-01-10T09:15:00'),
    txId: '0x4567...8901',
    details: { tokenId: 89 },
    status: 'success',
  },
  {
    id: '5',
    type: 'transfer',
    timestamp: new Date('2024-01-08T12:00:00'),
    txId: '0x5678...9012',
    details: { tokenId: 45, to: 'SP3FGQ8...BZTP4D' },
    status: 'success',
  },
  {
    id: '6',
    type: 'claim',
    timestamp: new Date('2024-01-05T18:30:00'),
    txId: '0x6789...0123',
    details: { amount: 1200 },
    status: 'success',
  },
  {
    id: '7',
    type: 'stake',
    timestamp: new Date('2024-01-02T14:20:00'),
    txId: '0x7890...1234',
    details: { tokenId: 89 },
    status: 'failed',
  },
];

type FilterType = 'all' | 'mint' | 'stake' | 'unstake' | 'claim' | 'transfer';

function getTypeIcon(type: HistoryEntry['type']) {
  const icons: Record<string, JSX.Element> = {
    mint: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    stake: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    unstake: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z" />
      </svg>
    ),
    claim: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    transfer: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
  };
  return icons[type];
}

function getTypeColor(type: HistoryEntry['type']) {
  const colors: Record<string, string> = {
    mint: 'bg-green-500/20 text-green-400',
    stake: 'bg-purple-500/20 text-purple-400',
    unstake: 'bg-orange-500/20 text-orange-400',
    claim: 'bg-yellow-500/20 text-yellow-400',
    transfer: 'bg-blue-500/20 text-blue-400',
  };
  return colors[type];
}

function getStatusBadge(status: HistoryEntry['status']) {
  const styles: Record<string, string> = {
    success: 'bg-green-500/20 text-green-400',
    pending: 'bg-yellow-500/20 text-yellow-400',
    failed: 'bg-red-500/20 text-red-400',
  };
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function HistoryRow({ entry }: { entry: HistoryEntry }) {
  const getDescription = () => {
    switch (entry.type) {
      case 'mint':
        return `Minted NFT #${entry.details.tokenId}`;
      case 'stake':
        return `Staked NFT #${entry.details.tokenId}`;
      case 'unstake':
        return `Unstaked NFT #${entry.details.tokenId}`;
      case 'claim':
        return `Claimed ${entry.details.amount?.toLocaleString()} STF`;
      case 'transfer':
        return `Transferred NFT #${entry.details.tokenId} to ${entry.details.to}`;
      default:
        return 'Unknown action';
    }
  };

  return (
    <div className="flex items-center justify-between py-4 px-6 hover:bg-gray-700/20 transition-colors">
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(entry.type)}`}>
          {getTypeIcon(entry.type)}
        </div>
        <div>
          <p className="text-white font-medium">{getDescription()}</p>
          <p className="text-gray-400 text-sm">{formatDate(entry.timestamp)}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        {getStatusBadge(entry.status)}
        <a
          href={`https://explorer.stacks.co/txid/${entry.txId}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 text-sm"
        >
          View Tx →
        </a>
      </div>
    </div>
  );
}

export default function HistoryPage() {
  const [filter, setFilter] = useState<FilterType>('all');
  const [searchTx, setSearchTx] = useState('');

  const filteredHistory = mockHistory.filter((entry) => {
    if (filter !== 'all' && entry.type !== filter) return false;
    if (searchTx && !entry.txId.toLowerCase().includes(searchTx.toLowerCase())) return false;
    return true;
  });

  const filters: { value: FilterType; label: string }[] = [
    { value: 'all', label: 'All' },
    { value: 'mint', label: 'Mints' },
    { value: 'stake', label: 'Stakes' },
    { value: 'unstake', label: 'Unstakes' },
    { value: 'claim', label: 'Claims' },
    { value: 'transfer', label: 'Transfers' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Transaction History</h1>
          <p className="text-gray-400">View all your StakeFlow transactions in one place</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  filter === f.value
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search by Tx ID..."
            value={searchTx}
            onChange={(e) => setSearchTx(e.target.value)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-purple-500 focus:outline-none w-full md:w-64"
          />
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Total Transactions</p>
            <p className="text-2xl font-bold text-white">{mockHistory.length}</p>
          </div>
          <div className="bg-green-500/10 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Mints</p>
            <p className="text-2xl font-bold text-green-400">{mockHistory.filter(e => e.type === 'mint').length}</p>
          </div>
          <div className="bg-purple-500/10 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Stakes</p>
            <p className="text-2xl font-bold text-purple-400">{mockHistory.filter(e => e.type === 'stake').length}</p>
          </div>
          <div className="bg-yellow-500/10 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Claims</p>
            <p className="text-2xl font-bold text-yellow-400">{mockHistory.filter(e => e.type === 'claim').length}</p>
          </div>
          <div className="bg-orange-500/10 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Unstakes</p>
            <p className="text-2xl font-bold text-orange-400">{mockHistory.filter(e => e.type === 'unstake').length}</p>
          </div>
        </div>

        {/* History List */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden">
          {filteredHistory.length > 0 ? (
            <div className="divide-y divide-gray-700">
              {filteredHistory.map((entry) => (
                <HistoryRow key={entry.id} entry={entry} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <svg className="w-16 h-16 text-gray-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <p className="text-gray-400">No transactions found</p>
            </div>
          )}
        </div>

        {/* Export Options */}
        <div className="flex justify-end gap-4 mt-6">
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
            Export CSV
          </button>
          <button className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
            Export JSON
          </button>
        </div>
      </div>
    </div>
  );
}
