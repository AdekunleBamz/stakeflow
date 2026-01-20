'use client';

interface AwardCardProps {
  title: string;
  year: string;
  description: string;
}

export function AwardCard({ title, year, description }: AwardCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <span className="text-xs text-gray-500">{year}</span>
      </div>
      <p className="text-sm text-gray-400 mt-3">{description}</p>
    </div>
  );
}
