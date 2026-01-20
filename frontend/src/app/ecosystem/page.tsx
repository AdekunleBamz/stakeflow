'use client';

import { EcosystemCard } from '@/components/ecosystem';

const ecosystemItems = [
  {
    title: 'Wallet Providers',
    description: 'Leather, Xverse, and compatible Stacks wallets.',
    category: 'Wallets',
  },
  {
    title: 'Marketplaces',
    description: 'Integrations with top NFT marketplaces.',
    category: 'Trading',
  },
  {
    title: 'Analytics',
    description: 'Dashboards and reports for staking metrics.',
    category: 'Data',
  },
];

export default function EcosystemPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Ecosystem</h1>
          <p className="text-gray-400 mt-2">Tools and partners powering StakeFlow.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ecosystemItems.map((item) => (
            <EcosystemCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
}
