'use client';

import { RoadmapTimeline } from '@/components/roadmap';

const roadmapItems = [
  {
    quarter: 'Q1 2026',
    title: 'Staking v2 Rollout',
    description: 'Upgrade staking contracts with tiered reward boosts and new UI flows.',
    status: 'in-progress' as const,
  },
  {
    quarter: 'Q2 2026',
    title: 'Analytics & Insights',
    description: 'Ship advanced analytics dashboards and on-chain reporting API.',
    status: 'planned' as const,
  },
  {
    quarter: 'Q3 2026',
    title: 'Marketplace Integrations',
    description: 'Enable staking across partner marketplaces and secondary listings.',
    status: 'planned' as const,
  },
  {
    quarter: 'Q4 2026',
    title: 'Governance Launch',
    description: 'Introduce STF governance, proposals, and community voting.',
    status: 'planned' as const,
  },
];

export default function RoadmapPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Roadmap</h1>
          <p className="text-gray-400 mt-2">What’s coming next for StakeFlow.</p>
        </div>
        <RoadmapTimeline items={roadmapItems} />
      </div>
    </div>
  );
}
