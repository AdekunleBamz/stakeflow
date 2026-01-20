'use client';

import { useState } from 'react';

interface ActivityFiltersProps {
  onChange?: (filters: { type: string; range: string }) => void;
}

export function ActivityFilters({ onChange }: ActivityFiltersProps) {
  const [type, setType] = useState('all');
  const [range, setRange] = useState('7d');

  const update = (nextType: string, nextRange: string) => {
    onChange?.({ type: nextType, range: nextRange });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <select
        value={type}
        onChange={(e) => {
          const value = e.target.value;
          setType(value);
          update(value, range);
        }}
        className="px-3 py-2 bg-gray-900/40 border border-gray-800 rounded-lg text-sm"
      >
        <option value="all">All activity</option>
        <option value="stake">Stake</option>
        <option value="unstake">Unstake</option>
        <option value="claim">Claim</option>
        <option value="mint">Mint</option>
        <option value="transfer">Transfer</option>
      </select>

      <select
        value={range}
        onChange={(e) => {
          const value = e.target.value;
          setRange(value);
          update(type, value);
        }}
        className="px-3 py-2 bg-gray-900/40 border border-gray-800 rounded-lg text-sm"
      >
        <option value="7d">Last 7 days</option>
        <option value="30d">Last 30 days</option>
        <option value="90d">Last 90 days</option>
        <option value="all">All time</option>
      </select>
    </div>
  );
}
