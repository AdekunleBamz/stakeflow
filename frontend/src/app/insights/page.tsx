'use client';

import { MetricCard } from '@/components/ui/MetricCard';
import { StatusPill } from '@/components/ui/StatusPill';

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Insights</h1>
            <p className="text-gray-400 mt-2">Operational health and protocol metrics.</p>
          </div>
          <StatusPill label="Operational" status="success" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <MetricCard label="Avg. Claim Time" value="6h" change="-12%" trend="up" />
          <MetricCard label="Pending Claims" value="42" change="+6" trend="down" />
          <MetricCard label="Rewards Velocity" value="1.2K STF" change="+4%" trend="up" />
        </div>

        <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Protocol Health</h2>
            <div className="flex gap-2">
              <StatusPill label="Staking" status="success" />
              <StatusPill label="Rewards" status="info" />
              <StatusPill label="Mint" status="warning" />
            </div>
          </div>
          <p className="text-gray-400 text-sm">
            Staking and rewards systems are stable. Minting demand is high; keep an eye on supply.
          </p>
        </div>
      </div>
    </div>
  );
}
