'use client';

import { TokenomicsCard } from '@/components/tokenomics';

const tokenomics = [
  {
    label: 'Total Supply',
    value: '1,000,000,000 STF',
    description: 'Fixed supply across staking and rewards.',
  },
  {
    label: 'Staking Rewards',
    value: '45%',
    description: 'Allocated to staking incentives.',
  },
  {
    label: 'Treasury',
    value: '20%',
    description: 'Reserved for community initiatives.',
  },
];

export default function TokenomicsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Tokenomics</h1>
          <p className="text-gray-400 mt-2">STF allocation and supply breakdown.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {tokenomics.map((item) => (
            <TokenomicsCard key={item.label} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
