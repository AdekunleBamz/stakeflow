'use client';

import { useState, type ChangeEvent } from 'react';
import { LeaderboardTable } from '@/components/leaderboard/LeaderboardTable';
import { TopStakers } from '@/components/leaderboard/TopStakers';
import { MetricCard } from '@/components/ui/MetricCard';

interface LeaderboardEntry {
  rank: number;
  address: string;
  displayName?: string;
  stakedNFTs: number;
  totalRewards: number;
  stakingDays: number;
  currentStreak: number;
}

const mockLeaderboard: LeaderboardEntry[] = [
  { rank: 1, address: 'SP3FGQ8...BZTP4D', displayName: 'Aurora', stakedNFTs: 156, totalRewards: 245000, stakingDays: 120, currentStreak: 120 },
  { rank: 2, address: 'SP2J6Y4...HWPRT5', displayName: 'Zephyr', stakedNFTs: 134, totalRewards: 198000, stakingDays: 95, currentStreak: 95 },
  { rank: 3, address: 'SP1XY2Z...ABC123', displayName: 'Nova', stakedNFTs: 98, totalRewards: 167000, stakingDays: 87, currentStreak: 87 },
  { rank: 4, address: 'SP4DEF6...GHI789', stakedNFTs: 87, totalRewards: 145000, stakingDays: 62, currentStreak: 62 },
  { rank: 5, address: 'SP5JKL0...MNO456', stakedNFTs: 76, totalRewards: 132000, stakingDays: 54, currentStreak: 54 },
  { rank: 6, address: 'SP6PQR1...STU789', stakedNFTs: 65, totalRewards: 118000, stakingDays: 48, currentStreak: 48 },
  { rank: 7, address: 'SP7VWX2...YZA012', stakedNFTs: 54, totalRewards: 95000, stakingDays: 41, currentStreak: 41 },
  { rank: 8, address: 'SP8BCD3...EFG345', stakedNFTs: 48, totalRewards: 87000, stakingDays: 35, currentStreak: 35 },
  { rank: 9, address: 'SP9HIJ4...KLM678', stakedNFTs: 42, totalRewards: 76000, stakingDays: 28, currentStreak: 28 },
  { rank: 10, address: 'SP0NOP5...QRS901', stakedNFTs: 38, totalRewards: 68000, stakingDays: 22, currentStreak: 22 },
];

type SortField = 'rank' | 'stakedNFTs' | 'totalRewards' | 'currentStreak';

export default function LeaderboardPage() {
  const [sortField, setSortField] = useState<SortField>('rank');
  const [timeframe, setTimeframe] = useState<'all' | 'month' | 'week'>('all');

  const sortedLeaderboard = [...mockLeaderboard].sort((a, b) => {
    switch (sortField) {
      case 'stakedNFTs':
        return b.stakedNFTs - a.stakedNFTs;
      case 'totalRewards':
        return b.totalRewards - a.totalRewards;
      case 'currentStreak':
        return b.currentStreak - a.currentStreak;
      default:
        return a.rank - b.rank;
    }
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Leaderboard</h1>
          <p className="text-gray-400 max-w-2xl mx-auto">
            See how you stack up against other stakers. Climb the ranks to earn exclusive rewards!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Total Stakers" value="1,247" />
          <MetricCard label="NFTs Staked" value="3,891" />
          <MetricCard label="STF Distributed" value="12.5M" trend="up" change="+4%" />
          <MetricCard label="Avg. Stake Time" value="45 days" />
        </div>

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
            onChange={(e: ChangeEvent<HTMLSelectElement>) => setSortField(e.target.value as SortField)}
            className="bg-gray-800 text-white rounded-lg px-4 py-2 border border-gray-700 focus:border-purple-500 focus:outline-none"
          >
            <option value="rank">Sort by Rank</option>
            <option value="stakedNFTs">Sort by Staked NFTs</option>
            <option value="totalRewards">Sort by Total Earned</option>
            <option value="currentStreak">Sort by Streak</option>
          </select>
        </div>

        <div className="mb-12">
          <TopStakers stakers={sortedLeaderboard.slice(0, 3)} />
        </div>

        <LeaderboardTable entries={sortedLeaderboard} />

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
