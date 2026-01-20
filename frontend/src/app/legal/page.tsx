'use client';

import { LegalCard } from '@/components/legal';

const legalDocs = [
  {
    title: 'Privacy Policy',
    description: 'How we handle data and user privacy.',
    href: '/privacy',
  },
  {
    title: 'Terms of Service',
    description: 'Rules and terms for using StakeFlow.',
    href: '/terms',
  },
  {
    title: 'Security Practices',
    description: 'Overview of audits and security measures.',
    href: '/security',
  },
];

export default function LegalPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Legal</h1>
          <p className="text-gray-400 mt-2">Policies and compliance resources.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {legalDocs.map((doc) => (
            <LegalCard key={doc.title} {...doc} />
          ))}
        </div>
      </div>
    </div>
  );
}
