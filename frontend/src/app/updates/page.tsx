'use client';

import { UpdateCard } from '@/components/updates';

const updates = [
  {
    title: 'Staking UI refresh',
    date: 'Jan 19, 2026',
    description: 'Improved staking flows with clearer reward breakdowns.',
  },
  {
    title: 'New analytics endpoints',
    date: 'Jan 10, 2026',
    description: 'Added API support for protocol stats and activity history.',
  },
  {
    title: 'Community pages launched',
    date: 'Jan 05, 2026',
    description: 'Introduced community, support, and roadmap pages.',
  },
];

export default function UpdatesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Updates</h1>
          <p className="text-gray-400 mt-2">Product updates and announcements.</p>
        </div>
        <div className="space-y-4">
          {updates.map((update) => (
            <UpdateCard key={update.title} {...update} />
          ))}
        </div>
      </div>
    </div>
  );
}
