type LockedSummaryProps = {
  totalLocked: string;
  positions: number;
  avgLockTime: string;
  bonusEarned: string;
};

export function LockedSummary({ totalLocked, positions, avgLockTime, bonusEarned }: LockedSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Locked</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalLocked}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Positions</p>
        <p className="mt-2 text-2xl font-semibold text-purple-400">{positions}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Avg Lock</p>
        <p className="mt-2 text-2xl font-semibold text-white">{avgLockTime}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Bonus Earned</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{bonusEarned}</p>
      </div>
    </div>
  );
}
