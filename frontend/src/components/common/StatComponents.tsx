'use client';

import { ReactNode } from 'react';

interface StatCardProps {
  label: string;
  value: string | number;
  subtext?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  variant?: 'default' | 'purple' | 'green' | 'yellow' | 'blue';
}

export function StatCard({ label, value, subtext, icon, trend, variant = 'default' }: StatCardProps) {
  const variantClasses = {
    default: 'bg-gray-800/50',
    purple: 'bg-purple-500/10 border border-purple-500/30',
    green: 'bg-green-500/10 border border-green-500/30',
    yellow: 'bg-yellow-500/10 border border-yellow-500/30',
    blue: 'bg-blue-500/10 border border-blue-500/30',
  };

  const valueColors = {
    default: 'text-white',
    purple: 'text-purple-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    blue: 'text-blue-400',
  };

  return (
    <div className={`rounded-xl p-6 ${variantClasses[variant]}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{label}</p>
          <p className={`text-2xl md:text-3xl font-bold ${valueColors[variant]}`}>{value}</p>
          {subtext && <p className="text-gray-500 text-sm mt-1">{subtext}</p>}
          {trend && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${trend.isPositive ? 'text-green-400' : 'text-red-400'}`}>
              {trend.isPositive ? (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              )}
              <span>{Math.abs(trend.value)}%</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center text-gray-400">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}

interface StatGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
}

export function StatGrid({ children, columns = 4 }: StatGridProps) {
  const columnClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-2 md:grid-cols-4',
  };

  return (
    <div className={`grid ${columnClasses[columns]} gap-4`}>
      {children}
    </div>
  );
}

interface MiniStatProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
}

export function MiniStat({ label, value, icon }: MiniStatProps) {
  return (
    <div className="flex items-center gap-3">
      {icon && (
        <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400">
          {icon}
        </div>
      )}
      <div>
        <p className="text-gray-400 text-xs">{label}</p>
        <p className="text-white font-semibold">{value}</p>
      </div>
    </div>
  );
}

interface ComparisonStatProps {
  label: string;
  current: number;
  previous: number;
  format?: (value: number) => string;
}

export function ComparisonStat({ label, current, previous, format = (v) => v.toString() }: ComparisonStatProps) {
  const change = previous > 0 ? ((current - previous) / previous) * 100 : 0;
  const isPositive = change >= 0;

  return (
    <div className="bg-gray-800/50 rounded-xl p-4">
      <p className="text-gray-400 text-sm mb-2">{label}</p>
      <div className="flex items-end justify-between">
        <p className="text-2xl font-bold text-white">{format(current)}</p>
        <div className={`flex items-center gap-1 text-sm ${isPositive ? 'text-green-400' : 'text-red-400'}`}>
          <span>{isPositive ? '+' : ''}{change.toFixed(1)}%</span>
        </div>
      </div>
      <p className="text-gray-500 text-xs mt-1">Previous: {format(previous)}</p>
    </div>
  );
}

interface CircularProgressProps {
  value: number;
  max: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  label?: string;
}

export function CircularProgress({ value, max, size = 'md', showLabel = true, label }: CircularProgressProps) {
  const percentage = Math.min((value / max) * 100, 100);
  const radius = size === 'sm' ? 30 : size === 'md' ? 45 : 60;
  const strokeWidth = size === 'sm' ? 4 : size === 'md' ? 6 : 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  const dimensions = {
    sm: 80,
    md: 120,
    lg: 160,
  };

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={dimensions[size]} height={dimensions[size]} className="-rotate-90">
        <circle
          cx={dimensions[size] / 2}
          cy={dimensions[size] / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-gray-700"
        />
        <circle
          cx={dimensions[size] / 2}
          cy={dimensions[size] / 2}
          r={radius}
          stroke="url(#gradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-500"
        />
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-white font-bold text-lg">{Math.round(percentage)}%</span>
          {label && <span className="text-gray-400 text-xs">{label}</span>}
        </div>
      )}
    </div>
  );
}
