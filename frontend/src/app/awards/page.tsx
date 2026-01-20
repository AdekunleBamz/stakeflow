'use client';

import { AwardCard } from '@/components/awards';

const awards = [
  {
    title: 'Best Staking UX',
    year: '2025',
    description: 'Recognized for best-in-class staking experience.',
  },
  {
    title: 'Community Choice',
    year: '2025',
    description: 'Top project voted by community stakers.',
  },
  {
    title: 'Analytics Innovation',
    year: '2024',
    description: 'Awarded for on-chain analytics visibility.',
  },
];

export default function AwardsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Awards</h1>
          <p className="text-gray-400 mt-2">Highlights from StakeFlow recognitions.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {awards.map((award) => (
            <AwardCard key={award.title} {...award} />
          ))}
        </div>
      </div>
    </div>
  );
}
