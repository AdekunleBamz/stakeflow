'use client';

import { useMemo } from 'react';

interface PieSlice {
  label: string;
  value: number;
  color: string;
}

interface PieChartProps {
  data: PieSlice[];
  size?: number;
  showLegend?: boolean;
}

export function PieChart({ data, size = 200, showLegend = true }: PieChartProps) {
  const total = useMemo(() => data.reduce((sum, item) => sum + item.value, 0), [data]);

  const slices = useMemo(() => {
    let currentAngle = 0;
    return data.map((item) => {
      const percentage = item.value / total;
      const angle = percentage * 360;
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;

      const startRad = (startAngle - 90) * (Math.PI / 180);
      const endRad = (endAngle - 90) * (Math.PI / 180);
      const radius = 40;
      const cx = 50;
      const cy = 50;

      const x1 = cx + radius * Math.cos(startRad);
      const y1 = cy + radius * Math.sin(startRad);
      const x2 = cx + radius * Math.cos(endRad);
      const y2 = cy + radius * Math.sin(endRad);

      const largeArcFlag = angle > 180 ? 1 : 0;

      const pathData = [
        `M ${cx} ${cy}`,
        `L ${x1} ${y1}`,
        `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
        'Z',
      ].join(' ');

      return {
        ...item,
        pathData,
        percentage,
      };
    });
  }, [data, total]);

  return (
    <div className="flex flex-col md:flex-row items-center gap-6">
      <svg width={size} height={size} viewBox="0 0 100 100">
        {slices.map((slice, index) => (
          <path
            key={index}
            d={slice.pathData}
            fill={slice.color}
            className="hover:opacity-80 transition-opacity cursor-pointer"
            stroke="rgba(17, 24, 39, 0.5)"
            strokeWidth="0.5"
          />
        ))}
        {/* Center circle for donut effect */}
        <circle cx="50" cy="50" r="25" fill="rgb(17, 24, 39)" />
        <text
          x="50"
          y="48"
          textAnchor="middle"
          className="fill-white text-[8px] font-bold"
        >
          {total.toLocaleString()}
        </text>
        <text
          x="50"
          y="56"
          textAnchor="middle"
          className="fill-gray-400 text-[4px]"
        >
          Total
        </text>
      </svg>

      {showLegend && (
        <div className="space-y-2">
          {slices.map((slice, index) => (
            <div key={index} className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: slice.color }}
              />
              <span className="text-gray-400 text-sm">{slice.label}</span>
              <span className="text-white font-medium text-sm ml-auto">
                {(slice.percentage * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface StatRingProps {
  value: number;
  max: number;
  label: string;
  color?: string;
  size?: number;
}

export function StatRing({ value, max, label, color = '#8b5cf6', size = 120 }: StatRingProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="rgba(139, 92, 246, 0.1)"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke={color}
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          transform="rotate(-90 50 50)"
          className="transition-all duration-500"
        />
        {/* Center text */}
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-white text-lg font-bold"
        >
          {percentage.toFixed(0)}%
        </text>
      </svg>
      <span className="text-gray-400 text-sm mt-2">{label}</span>
    </div>
  );
}

export function ProgressBar({ 
  value, 
  max, 
  showLabel = true,
  color = 'purple' 
}: { 
  value: number; 
  max: number; 
  showLabel?: boolean;
  color?: 'purple' | 'green' | 'blue' | 'yellow';
}) {
  const percentage = Math.min((value / max) * 100, 100);
  
  const colorClasses = {
    purple: 'from-purple-500 to-indigo-500',
    green: 'from-green-500 to-emerald-500',
    blue: 'from-blue-500 to-cyan-500',
    yellow: 'from-yellow-500 to-orange-500',
  };

  return (
    <div className="space-y-1">
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-gray-400">{value.toLocaleString()} / {max.toLocaleString()}</span>
          <span className="text-white font-medium">{percentage.toFixed(1)}%</span>
        </div>
      )}
      <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full bg-gradient-to-r ${colorClasses[color]} rounded-full transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
