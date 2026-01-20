'use client';

import { StatTile } from '@/components/metrics';

const stats = [
  { label: 'Total Value Locked', value: '14.2M STF', description: 'Across all staked NFTs' },
  { label: 'Average APY', value: '12.8%', description: 'Last 30 days' },
  { label: 'Active Stakers', value: '318', description: 'Unique wallets' },
  { label: 'Rewards Claimed', value: '482K STF', description: 'This month' },
];

export default function MetricsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Metrics</h1>
          <p className="text-gray-400 mt-2">Core metrics and protocol performance.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {stats.map((stat) => (
            <StatTile key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
}
