'use client';

import { ToolCard } from '@/components/tools';

const tools = [
  {
    name: 'Reward Calculator',
    description: 'Estimate rewards based on NFTs and tiers.',
    href: '/rewards',
  },
  {
    name: 'Batch Staker',
    description: 'Stake and unstake multiple NFTs quickly.',
    href: '/staking',
  },
  {
    name: 'Portfolio Tracker',
    description: 'Track balances and staking positions.',
    href: '/portfolio',
  },
];

export default function ToolsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Tools</h1>
          <p className="text-gray-400 mt-2">Utilities for stakers and operators.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tools.map((tool) => (
            <ToolCard key={tool.name} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
