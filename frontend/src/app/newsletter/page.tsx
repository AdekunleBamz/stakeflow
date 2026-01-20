'use client';

import { NewsletterCard } from '@/components/newsletter';

export default function NewsletterPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Newsletter</h1>
          <p className="text-gray-400 mt-2">Get updates on staking rewards and new features.</p>
        </div>
        <NewsletterCard
          title="StakeFlow Updates"
          description="Monthly product news, rewards insights, and community highlights."
          buttonLabel="Subscribe"
        />
      </div>
    </div>
  );
}
