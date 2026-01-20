'use client';

import { AmbassadorCard } from '@/components/ambassadors';

const ambassadors = [
  {
    name: 'Lina Chen',
    region: 'APAC',
    focus: 'Community growth & partnerships',
  },
  {
    name: 'Owen Blake',
    region: 'EMEA',
    focus: 'Education & onboarding',
  },
  {
    name: 'Zara Okafor',
    region: 'Americas',
    focus: 'Events & ecosystem outreach',
  },
];

export default function AmbassadorsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto px-6 py-10 space-y-8">
        <div>
          <h1 className="text-3xl font-bold">Ambassadors</h1>
          <p className="text-gray-400 mt-2">Meet the StakeFlow community leaders.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ambassadors.map((ambassador) => (
            <AmbassadorCard key={ambassador.name} {...ambassador} />
          ))}
        </div>
      </div>
    </div>
  );
}
