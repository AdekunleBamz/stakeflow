'use client';

import { RewardsChart, RewardsBarChart } from '@/components/charts';
import { StatRing } from '@/components/charts/PieChart';
import { AnalyticsOverview } from '@/components/analytics';
import { LoadingSpinner } from '@/components/loading';
import { useAnalytics } from '@/hooks/useAnalytics';

const chartData = [
  { date: 'Mon', rewards: 120 },
  { date: 'Tue', rewards: 180 },
  { date: 'Wed', rewards: 140 },
  { date: 'Thu', rewards: 220 },
  { date: 'Fri', rewards: 260 },
  { date: 'Sat', rewards: 210 },
  { date: 'Sun', rewards: 190 },
];

export default function AnalyticsPage() {
  const { data, isLoading, error } = useAnalytics();

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-gray-400 mt-2">Track protocol performance and reward distribution.</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-400">{error}</div>
        ) : (
          <AnalyticsOverview
            totalStaked={data?.totalStaked || 0}
            totalRewards={data?.totalRewards || 0}
            activeStakers={data?.activeStakers || 0}
            averageApy={data?.averageApy || 0}
          />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
            <h2 className="text-lg font-semibold mb-4">Weekly Rewards</h2>
            <RewardsChart data={chartData} />
          </div>
          <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-6">
            <div>
              <h2 className="text-lg font-semibold mb-4">Distribution</h2>
              <StatRing value={72} max={100} label="Staked" color="purple" />
              <div className="mt-4 text-sm text-gray-400">72% of minted NFTs are currently staked.</div>
            </div>
            <div>
              <h3 className="text-sm uppercase text-gray-500">Claim Rate</h3>
              <p className="text-2xl font-semibold mt-2">84%</p>
              <p className="text-sm text-gray-400 mt-1">Users claim rewards within 24h.</p>
            </div>
          </div>
        </div>

        <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
          <h2 className="text-lg font-semibold mb-4">Staker Growth</h2>
          <RewardsBarChart
            data={[
              { date: 'Week 1', rewards: 80 },
              { date: 'Week 2', rewards: 110 },
              { date: 'Week 3', rewards: 140 },
              { date: 'Week 4', rewards: 160 },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
