'use client';

import { CommunityCard } from '@/components/community';

const communityLinks = [
  {
    title: 'Join Discord',
    description: 'Chat with other stakers, ask questions, and get updates.',
    cta: 'Join Discord',
    href: 'https://discord.gg/stakeflow',
  },
  {
    title: 'Follow on X',
    description: 'Stay up to date with releases, events, and rewards news.',
    cta: 'Follow on X',
    href: 'https://twitter.com/stakeflow',
  },
  {
    title: 'Read the Docs',
    description: 'Learn how staking works and how to maximize rewards.',
    cta: 'Read Docs',
    href: 'https://docs.stakeflow.xyz',
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Community</h1>
          <p className="text-gray-400 mt-2">Connect with the StakeFlow community.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {communityLinks.map((link) => (
            <CommunityCard key={link.title} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
}
