'use client';

interface AmbassadorCardProps {
  name: string;
  region: string;
  focus: string;
}

export function AmbassadorCard({ name, region, focus }: AmbassadorCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
      <h3 className="text-lg font-semibold text-white">{name}</h3>
      <p className="text-sm text-gray-400 mt-2">Region: {region}</p>
      <p className="text-sm text-gray-500 mt-2">Focus: {focus}</p>
    </div>
  );
}
