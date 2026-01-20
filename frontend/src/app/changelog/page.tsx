'use client';

import { ChangelogItem } from '@/components/changelog';

const releases = [
  {
    version: 'v2.4.0',
    date: 'Jan 20, 2026',
    changes: [
      'Added analytics overview dashboard',
      'Improved staking reward breakdown',
      'New activity and notifications pages',
    ],
  },
  {
    version: 'v2.3.0',
    date: 'Dec 12, 2025',
    changes: [
      'NFT batch selection flow',
      'Updated leaderboard UI',
      'Performance improvements',
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Changelog</h1>
          <p className="text-gray-400 mt-2">Latest updates and release notes.</p>
        </div>
        <div className="space-y-4">
          {releases.map((release) => (
            <ChangelogItem key={release.version} {...release} />
          ))}
        </div>
      </div>
    </div>
  );
}
