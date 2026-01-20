'use client';

import { FeatureCard } from '@/components/FeaturesSection';

const features = [
  {
    title: 'Tiered Rewards',
    description: 'Earn more STF as you stake more NFTs.',
  },
  {
    title: 'Batch Staking',
    description: 'Stake or unstake multiple NFTs in one action.',
  },
  {
    title: 'Analytics Suite',
    description: 'Track reward history and protocol performance.',
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Features</h1>
          <p className="text-gray-400 mt-2">StakeFlow capabilities at a glance.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </div>
  );
}
