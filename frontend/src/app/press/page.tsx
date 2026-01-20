'use client';

import { PressCard } from '@/components/press';

const pressMentions = [
  {
    outlet: 'Stacked News',
    title: 'StakeFlow expands NFT staking rewards program',
    date: 'Jan 18, 2026',
    href: '#',
  },
  {
    outlet: 'Crypto Weekly',
    title: 'How StakeFlow is redefining long-term staking incentives',
    date: 'Dec 29, 2025',
    href: '#',
  },
  {
    outlet: 'Chain Digest',
    title: 'StakeFlow launches analytics suite for stakers',
    date: 'Dec 10, 2025',
    href: '#',
  },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Press</h1>
          <p className="text-gray-400 mt-2">StakeFlow coverage and announcements.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pressMentions.map((mention) => (
            <PressCard key={mention.title} {...mention} />
          ))}
        </div>
      </div>
    </div>
  );
}
