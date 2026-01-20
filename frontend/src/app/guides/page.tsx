'use client';

import { GuideCard } from '@/components/guides';

const guides = [
  {
    title: 'Staking for Beginners',
    description: 'Get started with NFT staking and reward basics.',
    href: '/docs',
  },
  {
    title: 'Maximize Rewards',
    description: 'Learn how tiers and streaks affect your earnings.',
    href: '/rewards',
  },
  {
    title: 'Batch Operations',
    description: 'Stake and unstake multiple NFTs efficiently.',
    href: '/staking',
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Guides</h1>
          <p className="text-gray-400 mt-2">Step-by-step guides for stakers.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {guides.map((guide) => (
            <GuideCard key={guide.title} {...guide} />
          ))}
        </div>
      </div>
    </div>
  );
}
