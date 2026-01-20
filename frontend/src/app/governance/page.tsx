'use client';

import { ProposalCard } from '@/components/governance';

const proposals = [
  {
    title: 'Increase Rewards Multiplier',
    description: 'Adjust the Platinum and Diamond tiers to reward long-term stakers.',
    status: 'active' as const,
    votes: '1.2M STF',
    endsIn: '3d 4h',
  },
  {
    title: 'Community Treasury Allocation',
    description: 'Allocate 5% of rewards to the community treasury for grants.',
    status: 'draft' as const,
    votes: '—',
    endsIn: 'TBD',
  },
  {
    title: 'New NFT Utility Features',
    description: 'Enable NFT trait boosts inside staking calculators.',
    status: 'passed' as const,
    votes: '2.8M STF',
    endsIn: 'Ended',
  },
];

export default function GovernancePage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Governance</h1>
          <p className="text-gray-400 mt-2">Participate in protocol decisions and vote on proposals.</p>
        </div>
        <div className="space-y-4">
          {proposals.map((proposal) => (
            <ProposalCard key={proposal.title} {...proposal} />
          ))}
        </div>
      </div>
    </div>
  );
}
