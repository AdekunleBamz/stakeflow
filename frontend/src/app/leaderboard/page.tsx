'use client';

import { useState } from 'react';

interface LeaderboardEntry {
  rank: number;
  address: string;
  stakedNFTs: number;
  totalEarned: number;
  currentStreak: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, address: 'SP3FGQ8...BZTP4D', stakedNFTs: 156, totalEarned: 245000, currentStreak: 120 },
  { rank: 2, address: 'SP2J6Y4...HWPRT5', stakedNFTs: 134, totalEarned: 198000, currentStreak: 95 },
  { rank: 3, address: 'SP1XY2Z...ABC123', stakedNFTs: 98, totalEarned: 167000, currentStreak: 87 },
  { rank: 4, address: 'SP4DEF6...GHI789', stakedNFTs: 87, totalEarned: 145000, currentStreak: 62 },
  { rank: 5, address: 'SP5JKL0...MNO456', stakedNFTs: 76, totalEarned: 132000, currentStreak: 54 },
  { rank: 6, address: 'SP6PQR1...STU789', stakedNFTs: 65, totalEarned: 118000, currentStreak: 48 },
  { rank: 7, address: 'SP7VWX2...YZA012', stakedNFTs: 54, totalEarned: 95000, currentStreak: 41 },
  { rank: 8, address: 'SP8BCD3...EFG345', stakedNFTs: 48, totalEarned: 87000, currentStreak: 35 },
  { rank: 9, address: 'SP9HIJ4...KLM678', stakedNFTs: 42, totalEarned: 76000, currentStreak: 28 },
  { rank: 10, address: 'SP0NOP5...QRS901', stakedNFTs: 38, totalEarned: 68000, currentStreak: 22 },
];

type SortField = 'rank' | 'stakedNFTs' | 'totalEarned' | 'currentStreak';

function RankBadge({ rank }: { rank: number }) {
  const getColors = () => {
    switch (rank) {
      case 1:
        return 'from-yellow-500 to-yellow-300 text-yellow-900';
      case 2:
        return 'from-gray-400 to-gray-300 text-gray-900';
      case 3:
        return 'from-amber-700 to-amber-500 text-white';
      default:
        return 'from-gray-700 to-gray-600 text-white';
    }
  };

  return (
    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${getColors()} flex items-center justify-center font-bold`}>
      {rank}
    </div>
  );
}

function formatNumber(num: number): string {
  return num.toLocaleString();
}

export default function LeaderboardPage() {
  const [sortField, setSortField] = useState<SortField>('rank');
  const [timeframe, setTimeframe] = useState<'all' | 'month' | 'week'>('all');

  const sortedLeaderboard = [...mockLeaderboard].sort((a, b) => {
    switch (sortField) {
      case 'stakedNFTs':
        return b.stakedNFTs - a.stakedNFTs;
      case 'totalEarned':
        return b.totalEarned - a.totalEarned;
      case 'currentStreak':
        return b.currentStreak - a.currentStreak;
      default:
        return a.rank - b.rank;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Leaderboard</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See how you stack up against other stakers. Climb the ranks to earn exclusive rewards!
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-800/50 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm">Total Stakers</p>
            <p className="text-3xl font-bold text-white">1,247</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm">Total NFTs Staked</p>
            <p className="text-3xl font-bold text-purple-400">3,891</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm">Total STF Distributed</p>
            <p className="text-3xl font-bold text-green-400">12.5M</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-6 text-center">
            <p className="text-gray-400 text-sm">Avg. Stake Time</p>
            <p className="text-3xl font-bold text-yellow-400">45 days</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 justify-between items-center">
          <div className="flex gap-2">
            {(['all', 'month', 'week'] as const).map((tf) => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  timeframe === tf
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {tf === 'all' ? 'All Time' : tf === 'month' ? 'This Month' : 'This Week'}
              </button>
            ))}
          </div>
          <select
            value={sortField}
            onChange={(e) => setSortField(e.target.value as SortField)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-purple-500 focus:outline-none"
          >
            <option value="rank">Sort by Rank</option>
            <option value="stakedNFTs">Sort by Staked NFTs</option>
            <option value="totalEarned">Sort by Total Earned</option>
            <option value="currentStreak">Sort by Streak</option>
          </select>
        </div>

        {/* Top 3 Podium */}
        <div className="flex justify-center gap-4 mb-12">
          {sortedLeaderboard.slice(0, 3).map((entry, idx) => {
            const heights = ['h-32', 'h-40', 'h-28'];
            const order = [1, 0, 2]; // Display order: 2nd, 1st, 3rd
            const actualIdx = order[idx];
            const actualEntry = sortedLeaderboard[actualIdx];
            
            return (
              <div key={actualEntry.rank} className="flex flex-col items-center">
                <div className={`w-20 h-20 bg-gradient-to-br ${
                  actualIdx === 0 ? 'from-yellow-500 to-yellow-300' :
                  actualIdx === 1 ? 'from-gray-400 to-gray-300' :
                  'from-amber-700 to-amber-500'
                } rounded-full flex items-center justify-center mb-2`}>
                  <span className="text-2xl font-bold">{actualIdx + 1}</span>
                </div>
                <p className="text-white font-medium mb-1">{actualEntry.address}</p>
                <p className="text-purple-400 text-sm">{actualEntry.stakedNFTs} NFTs</p>
                <div className={`bg-gray-800/50 rounded-t-xl ${heights[actualIdx]} w-24 mt-2 flex items-end justify-center pb-2`}>
                  <span className="text-white font-bold">{formatNumber(actualEntry.totalEarned)}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Leaderboard Table */}
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Rank</th>
                <th className="text-left py-4 px-6 text-gray-400 font-medium">Address</th>
                <th className="text-right py-4 px-6 text-gray-400 font-medium">Staked NFTs</th>
                <th className="text-right py-4 px-6 text-gray-400 font-medium">Total Earned</th>
                <th className="text-right py-4 px-6 text-gray-400 font-medium">Streak</th>
              </tr>
            </thead>
            <tbody>
              {sortedLeaderboard.map((entry) => (
                <tr key={entry.rank} className="border-b border-gray-700/50 hover:bg-gray-700/20 transition-colors">
                  <td className="py-4 px-6">
                    <RankBadge rank={entry.rank} />
                  </td>
                  <td className="py-4 px-6">
                    <span className="text-white font-mono">{entry.address}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="text-purple-400 font-semibold">{entry.stakedNFTs}</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="text-green-400 font-semibold">{formatNumber(entry.totalEarned)} STF</span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <span className="text-yellow-400">{entry.currentStreak} days</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 mt-8">
          <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition-colors">
            Previous
          </button>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-10 h-10 rounded-lg transition-colors ${
                page === 1
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          ))}
          <button className="px-4 py-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition-colors">
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
