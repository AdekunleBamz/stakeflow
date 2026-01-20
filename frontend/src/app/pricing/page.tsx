'use client';

import { PricingCard } from '@/components/pricing';

const plans = [
  {
    title: 'Starter',
    price: 'Free',
    description: 'Basic staking access and analytics.',
    features: ['NFT staking', 'Rewards dashboard', 'Community support'],
  },
  {
    title: 'Pro',
    price: '0.5% Fees',
    description: 'Advanced analytics and batch operations.',
    features: ['Batch staking', 'Priority support', 'Advanced analytics'],
  },
  {
    title: 'Enterprise',
    price: 'Custom',
    description: 'Custom integrations for large NFT collections.',
    features: ['Dedicated support', 'Custom integrations', 'Reporting suite'],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Pricing</h1>
          <p className="text-gray-400 mt-2">Plans for collectors, teams, and partners.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <PricingCard key={plan.title} {...plan} />
          ))}
        </div>
      </div>
    </div>
  );
}
