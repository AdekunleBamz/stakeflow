'use client';

import { PartnerCard } from '@/components/partners';

const partners = [
  {
    name: 'Stacks Hub',
    description: 'Ecosystem partner providing community growth and integrations.',
    category: 'Community',
  },
  {
    name: 'MintFlow',
    description: 'Marketplace partner enabling cross-platform NFT staking.',
    category: 'Marketplace',
  },
  {
    name: 'LedgerLink',
    description: 'Security partner for auditing staking smart contracts.',
    category: 'Security',
  },
];

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Partners</h1>
          <p className="text-gray-400 mt-2">StakeFlow partners powering the ecosystem.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {partners.map((partner) => (
            <PartnerCard key={partner.name} {...partner} />
          ))}
        </div>
      </div>
    </div>
  );
}
