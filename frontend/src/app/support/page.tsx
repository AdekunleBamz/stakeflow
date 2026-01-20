'use client';

import { SupportCard } from '@/components/support';

const supportLinks = [
  {
    title: 'Help Center',
    description: 'Find answers to common questions and troubleshooting steps.',
    cta: 'Open Help Center',
    href: '/faq',
  },
  {
    title: 'Contact Support',
    description: 'Reach our team for staking, rewards, or wallet issues.',
    cta: 'Email Support',
    href: 'mailto:support@stakeflow.xyz',
  },
  {
    title: 'Status Updates',
    description: 'Track platform uptime and incident updates.',
    cta: 'View Status',
    href: '/status',
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Support</h1>
          <p className="text-gray-400 mt-2">Get help with staking, rewards, and NFTs.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {supportLinks.map((link) => (
            <SupportCard key={link.title} {...link} />
          ))}
        </div>
      </div>
    </div>
  );
}
