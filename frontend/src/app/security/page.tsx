'use client';

import { SecurityBadge } from '@/components/security';

const audits = [
  {
    title: 'Staking Contracts Audit',
    description: 'Independent audit completed by LedgerLink.',
    status: 'verified' as const,
  },
  {
    title: 'Rewards Distribution Review',
    description: 'Ongoing review of reward calculations and treasury flows.',
    status: 'in-review' as const,
  },
  {
    title: 'Governance Module Audit',
    description: 'Scheduled for Q4 2026 prior to governance launch.',
    status: 'planned' as const,
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Security</h1>
          <p className="text-gray-400 mt-2">Audit reports and security practices.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {audits.map((audit) => (
            <SecurityBadge key={audit.title} {...audit} />
          ))}
        </div>
      </div>
    </div>
  );
}
