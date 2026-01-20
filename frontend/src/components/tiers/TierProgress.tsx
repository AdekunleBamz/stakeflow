import React from 'react';

type TierProgressProps = {
  currentTier: string;
  nextTier: string;
  progress: number;
  amountNeeded: string;
};

export function TierProgress({ currentTier, nextTier, progress, amountNeeded }: TierProgressProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-400">Current Tier</p>
          <p className="mt-1 text-2xl font-bold text-white">{currentTier}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-slate-400">Next Tier</p>
          <p className="mt-1 text-2xl font-bold text-purple-400">{nextTier}</p>
        </div>
      </div>
      <div className="mt-6">
        <div className="flex justify-between text-sm text-slate-400">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-700">
          <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500" style={{ width: `${progress}%` }} />
        </div>
        <p className="mt-2 text-sm text-slate-400">
          <span className="text-white">{amountNeeded}</span> more to upgrade
        </p>
      </div>
    </div>
  );
}
