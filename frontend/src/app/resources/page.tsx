'use client';

import { ResourceCard } from '@/components/resources';

const resources = [
  {
    title: 'Staking Guide',
    description: 'Learn how to stake NFTs and maximize rewards.',
    href: '/docs',
    type: 'Guide',
  },
  {
    title: 'Reward Tiers',
    description: 'Understand multipliers and tier thresholds.',
    href: '/rewards',
    type: 'Docs',
  },
  {
    title: 'API Reference',
    description: 'Explore StakeFlow APIs for analytics and activity.',
    href: '/docs',
    type: 'API',
  },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Resources</h1>
          <p className="text-gray-400 mt-2">Guides, docs, and tools for StakeFlow.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {resources.map((resource) => (
            <ResourceCard key={resource.title} {...resource} />
          ))}
        </div>
      </div>
    </div>
  );
}
