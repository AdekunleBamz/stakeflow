'use client';

import { useMemo } from 'react';

interface DataPoint {
  date: string;
  rewards: number;
}

interface RewardsChartProps {
  data: DataPoint[];
  height?: number;
}

export function RewardsChart({ data, height = 200 }: RewardsChartProps) {
  const { maxValue, points, labels } = useMemo(() => {
    if (data.length === 0) return { maxValue: 0, points: '', labels: [] };

    const max = Math.max(...data.map(d => d.rewards));
    const chartWidth = 100;
    const chartHeight = height;
    const padding = 20;

    const pointsArray = data.map((d, i) => {
      const x = padding + (i / (data.length - 1)) * (chartWidth - padding * 2);
      const y = chartHeight - padding - (d.rewards / max) * (chartHeight - padding * 2);
      return `${x},${y}`;
    });

    return {
      maxValue: max,
      points: pointsArray.join(' '),
      labels: data.map(d => d.date),
    };
  }, [data, height]);

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 bg-gray-800/30 rounded-xl">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <svg
        viewBox={`0 0 100 ${height}`}
        className="w-full"
        preserveAspectRatio="none"
      >
        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((ratio) => (
          <line
            key={ratio}
            x1="20"
            y1={height - 20 - ratio * (height - 40)}
            x2="80"
            y2={height - 20 - ratio * (height - 40)}
            stroke="rgba(139, 92, 246, 0.1)"
            strokeWidth="0.5"
          />
        ))}

        {/* Gradient fill */}
        <defs>
          <linearGradient id="rewardsGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(139, 92, 246, 0.3)" />
            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
          </linearGradient>
        </defs>

        {/* Area */}
        <polygon
          points={`20,${height - 20} ${points} 80,${height - 20}`}
          fill="url(#rewardsGradient)"
        />

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke="rgb(139, 92, 246)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {data.map((d, i) => {
          const x = 20 + (i / (data.length - 1)) * 60;
          const y = height - 20 - (d.rewards / maxValue) * (height - 40);
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r="2"
              fill="rgb(139, 92, 246)"
              className="hover:r-3 transition-all cursor-pointer"
            />
          );
        })}
      </svg>

      {/* X-axis labels */}
      <div className="flex justify-between px-4 mt-2">
        {labels.filter((_, i) => i % Math.ceil(labels.length / 5) === 0).map((label, i) => (
          <span key={i} className="text-xs text-gray-500">{label}</span>
        ))}
      </div>
    </div>
  );
}

export function RewardsBarChart({ data }: { data: DataPoint[] }) {
  const maxValue = Math.max(...data.map(d => d.rewards), 1);

  return (
    <div className="space-y-3">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-4">
          <span className="text-sm text-gray-400 w-16">{item.date}</span>
          <div className="flex-1 h-6 bg-gray-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full transition-all duration-500"
              style={{ width: `${(item.rewards / maxValue) * 100}%` }}
            />
          </div>
          <span className="text-sm text-white font-medium w-20 text-right">
            {item.rewards.toLocaleString()} STF
          </span>
        </div>
      ))}
    </div>
  );
}

export function MiniSparkline({ values, color = 'purple' }: { values: number[]; color?: string }) {
  if (values.length < 2) return null;

  const max = Math.max(...values);
  const min = Math.min(...values);
  const range = max - min || 1;

  const points = values.map((v, i) => {
    const x = (i / (values.length - 1)) * 100;
    const y = 100 - ((v - min) / range) * 100;
    return `${x},${y}`;
  }).join(' ');

  const colorClass = color === 'green' ? 'stroke-green-400' : 'stroke-purple-400';

  return (
    <svg viewBox="0 0 100 100" className="w-20 h-8" preserveAspectRatio="none">
      <polyline
        points={points}
        fill="none"
        className={colorClass}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
