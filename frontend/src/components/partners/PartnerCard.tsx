'use client';

interface PartnerCardProps {
  name: string;
  description: string;
  category: string;
}

export function PartnerCard({ name, description, category }: PartnerCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
      <p className="text-xs uppercase tracking-wide text-gray-500">{category}</p>
      <h3 className="text-lg font-semibold text-white mt-2">{name}</h3>
      <p className="text-sm text-gray-400 mt-2">{description}</p>
    </div>
  );
}
