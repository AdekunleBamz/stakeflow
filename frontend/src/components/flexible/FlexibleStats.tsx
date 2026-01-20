type FlexibleStatsProps = {
  totalFlexible: string;
  positions: number;
  currentAPY: string;
  totalEarned: string;
};

export function FlexibleStats({ totalFlexible, positions, currentAPY, totalEarned }: FlexibleStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Flexible</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalFlexible}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Positions</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{positions}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Current APY</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{currentAPY}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Earned</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalEarned}</p>
      </div>
    </div>
  );
}
