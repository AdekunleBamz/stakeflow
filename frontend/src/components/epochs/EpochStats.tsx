type EpochStatsProps = {
  currentEpoch: number;
  blocksRemaining: number;
  totalRewards: string;
  avgEpochDuration: string;
};

export function EpochStats({ currentEpoch, blocksRemaining, totalRewards, avgEpochDuration }: EpochStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Current Epoch</p>
        <p className="mt-2 text-2xl font-semibold text-white">#{currentEpoch}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Blocks Remaining</p>
        <p className="mt-2 text-2xl font-semibold text-amber-400">{blocksRemaining.toLocaleString()}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Rewards</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{totalRewards}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Avg Duration</p>
        <p className="mt-2 text-2xl font-semibold text-white">{avgEpochDuration}</p>
      </div>
    </div>
  );
}
