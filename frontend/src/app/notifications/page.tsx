'use client';

import React, { useState } from 'react';
import { NotificationList } from '@/components/NotificationList';

interface Notification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  message: string;
  time: string;
  read?: boolean;
}

const initialNotifications: Notification[] = [
  {
    id: '1',
    type: 'success',
    title: 'Rewards Claimed',
    message: 'You claimed 1,240 STF successfully.',
    time: '2m ago',
    read: false,
  },
  {
    id: '2',
    type: 'info',
    title: 'New Staking Tier',
    message: 'You reached Gold tier with 5 staked NFTs.',
    time: '1h ago',
    read: false,
  },
  {
    id: '3',
    type: 'warning',
    title: 'Unstake Window',
    message: 'NFT #231 is eligible to unstake without penalty.',
    time: '1d ago',
    read: true,
  },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const handleMarkRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleClear = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-gray-400 mt-2">Stay updated with your wallet and staking events.</p>
        </div>
        <NotificationList
          notifications={notifications}
          onMarkRead={handleMarkRead}
          onMarkAllRead={handleMarkAllRead}
          onClear={handleClear}
        />
      </div>
    </div>
  );
}
