'use client';

interface MetricCardProps {
  label: string;
  value: string | number;
  sublabel?: string;
  trend?: 'up' | 'down' | 'neutral';
  change?: string;
}

export function MetricCard({ label, value, sublabel, trend = 'neutral', change }: MetricCardProps) {
  const trendClasses = {
    up: 'text-green-400',
    down: 'text-red-400',
    neutral: 'text-gray-400',
  };

  return (
    <div className="p-5 rounded-2xl bg-gray-900/40 border border-gray-800">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
        {change && <span className={`text-xs ${trendClasses[trend]}`}>{change}</span>}
      </div>
      <div className="mt-2 text-2xl font-semibold text-white">{value}</div>
      {sublabel && <p className="text-sm text-gray-400 mt-1">{sublabel}</p>}
    </div>
  );
}
