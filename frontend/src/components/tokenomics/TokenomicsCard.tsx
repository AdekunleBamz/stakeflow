'use client';

interface TokenomicsCardProps {
  label: string;
  value: string;
  description: string;
}

export function TokenomicsCard({ label, value, description }: TokenomicsCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="text-2xl font-semibold text-white mt-2">{value}</p>
      <p className="text-sm text-gray-400 mt-2">{description}</p>
    </div>
  );
}
