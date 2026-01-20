'use client';

import { EventCard } from '@/components/events';

const events = [
  {
    title: 'StakeFlow Community AMA',
    date: 'Feb 02, 2026',
    location: 'Discord',
  },
  {
    title: 'Stacks Ecosystem Summit',
    date: 'Mar 12, 2026',
    location: 'Lisbon, PT',
  },
  {
    title: 'NFT Staking Workshop',
    date: 'Apr 05, 2026',
    location: 'Online',
  },
];

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Events</h1>
          <p className="text-gray-400 mt-2">Upcoming community and ecosystem events.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {events.map((event) => (
            <EventCard key={event.title} {...event} />
          ))}
        </div>
      </div>
    </div>
  );
}
