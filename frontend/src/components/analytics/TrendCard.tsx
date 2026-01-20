'use client';

interface TrendCardProps {
  title: string;
  value: string;
  trend: 'up' | 'down' | 'neutral';
  change: string;
  description?: string;
}

export function TrendCard({ title, value, trend, change, description }: TrendCardProps) {
  const trendColor = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400',
  };

  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wide text-gray-500">{title}</p>
        <span className={`text-xs font-medium ${trendColor[trend]}`}>{change}</span>
      </div>
      <p className="text-3xl font-semibold text-white mt-3">{value}</p>
      {description && <p className="text-sm text-gray-400 mt-2">{description}</p>}
    </div>
  );
}
