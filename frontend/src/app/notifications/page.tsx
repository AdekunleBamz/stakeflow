'use client';

import NotificationList from '@/components/NotificationList';

const notifications = [
  {
    id: '1',
    type: 'success',
    title: 'Rewards Claimed',
    message: 'You claimed 1,240 STF successfully.',
    time: '2m ago',
  },
  {
    id: '2',
    type: 'info',
    title: 'New Staking Tier',
    message: 'You reached Gold tier with 5 staked NFTs.',
    time: '1h ago',
  },
  {
    id: '3',
    type: 'warning',
    title: 'Unstake Window',
    message: 'NFT #231 is eligible to unstake without penalty.',
    time: '1d ago',
  },
];

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-gray-400 mt-2">Stay updated with your wallet and staking events.</p>
        </div>
        <NotificationList notifications={notifications} />
      </div>
    </div>
  );
}
