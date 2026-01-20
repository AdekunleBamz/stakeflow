'use client';

import { JobCard } from '@/components/careers';

const roles = [
  {
    title: 'Frontend Engineer',
    location: 'Remote',
    type: 'Full-time',
    description: 'Build delightful staking experiences in Next.js and TypeScript.',
  },
  {
    title: 'Smart Contract Engineer',
    location: 'Remote',
    type: 'Full-time',
    description: 'Design and audit Clarity smart contracts for staking and rewards.',
  },
  {
    title: 'Community Manager',
    location: 'Remote',
    type: 'Part-time',
    description: 'Engage with stakers and grow the StakeFlow community.',
  },
];

export default function CareersPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Careers</h1>
          <p className="text-gray-400 mt-2">Join the StakeFlow team and build the future of NFT staking.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((role) => (
            <JobCard key={role.title} {...role} />
          ))}
        </div>
      </div>
    </div>
  );
}
