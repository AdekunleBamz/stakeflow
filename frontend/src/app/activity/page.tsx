'use client';

import { ActivityFeed, ActivityFilters } from '@/components/activity';
import { LoadingSpinner } from '@/components/loading';
import { useActivity } from '@/hooks/useActivity';

type ActivityItem = {
  id: string;
  type: 'mint' | 'stake' | 'unstake' | 'claim' | 'transfer';
  title: string;
  description: string;
  timestamp: string;
  amount?: number;
  tokenIds?: number[];
};

const items: ActivityItem[] = [
  {
    id: '1',
    type: 'stake',
    title: 'NFT Staked',
    description: 'You staked NFT #231 and #244',
    timestamp: '2m ago',
    amount: 0,
    tokenIds: [231, 244],
  },
  {
    id: '2',
    type: 'claim',
    title: 'Rewards Claimed',
    description: 'Claimed staking rewards to your wallet',
    timestamp: '1h ago',
    amount: 1240,
  },
  {
    id: '3',
    type: 'mint',
    title: 'NFT Minted',
    description: 'Minted StakeFlow NFT #301',
    timestamp: '1d ago',
    amount: 50,
  },
];

export default function ActivityPage() {
  const { activity, isLoading, error } = useActivity('demo');

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Activity</h1>
          <p className="text-gray-400 mt-2">Recent activity across your wallet and staking history.</p>
        </div>
        <ActivityFilters />
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-400">{error}</div>
        ) : (
          <ActivityFeed items={activity.length ? activity : items} />
        )}
      </div>
    </div>
  );
}
