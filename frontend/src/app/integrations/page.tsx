'use client';

import { IntegrationCard } from '@/components/integrations';

const integrations = [
  {
    name: 'Stacks Wallet Connect',
    description: 'Connect with Leather, Xverse, and other supported wallets.',
    status: 'active' as const,
  },
  {
    name: 'Marketplace Sync',
    description: 'Sync NFT positions with supported marketplaces.',
    status: 'beta' as const,
  },
  {
    name: 'Analytics Webhooks',
    description: 'Push staking events to external dashboards.',
    status: 'planned' as const,
  },
];

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Integrations</h1>
          <p className="text-gray-400 mt-2">Tools and partners connected to StakeFlow.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {integrations.map((integration) => (
            <IntegrationCard key={integration.name} {...integration} />
          ))}
        </div>
      </div>
    </div>
  );
}
