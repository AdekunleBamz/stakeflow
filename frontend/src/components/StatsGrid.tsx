"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "./ui";

interface StatItem {
  label: string;
  value: string | number;
  change?: {
    value: number;
    isPositive: boolean;
  };
  prefix?: string;
  suffix?: string;
}

interface StatsGridProps {
  stats: StatItem[];
  columns?: 2 | 3 | 4;
  className?: string;
}

export function StatsGrid({ stats, columns = 4, className = "" }: StatsGridProps) {
  const columnClasses = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-4",
  };

  return (
    <div className={`grid ${columnClasses[columns]} gap-4 ${className}`}>
      {stats.map((stat, index) => (
        <Card key={index} className="text-center">
          <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
          <p className="text-2xl font-bold gradient-text">
            {stat.prefix}
            {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
            {stat.suffix}
          </p>
          {stat.change && (
            <p
              className={`text-sm mt-1 ${
                stat.change.isPositive ? "text-green-400" : "text-red-400"
              }`}
            >
              {stat.change.isPositive ? "+" : ""}
              {stat.change.value}%
            </p>
          )}
        </Card>
      ))}
    </div>
  );
}

interface SingleStatProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

export function SingleStat({ label, value, icon, className = "" }: SingleStatProps) {
  return (
    <div className={`bg-gray-800/50 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-400 text-sm">{label}</p>
          <p className="text-xl font-bold text-white mt-1">
            {typeof value === "number" ? value.toLocaleString() : value}
          </p>
        </div>
        {icon && <div className="text-purple-400">{icon}</div>}
      </div>
    </div>
  );
}
