type EarningSummaryProps = {
  totalEarnings: string;
  thisMonth: string;
  stakingRewards: string;
  otherRewards: string;
};

export function EarningSummary({ totalEarnings, thisMonth, stakingRewards, otherRewards }: EarningSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">All Time</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalEarnings}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">This Month</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{thisMonth}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Staking</p>
        <p className="mt-2 text-2xl font-semibold text-white">{stakingRewards}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Other</p>
        <p className="mt-2 text-2xl font-semibold text-white">{otherRewards}</p>
      </div>
    </div>
  );
}
