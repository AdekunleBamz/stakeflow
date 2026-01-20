type WithdrawalStatsProps = {
  pendingAmount: string;
  readyAmount: string;
  completedThisMonth: string;
  averageWaitTime: string;
};

export function WithdrawalStats({ pendingAmount, readyAmount, completedThisMonth, averageWaitTime }: WithdrawalStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Pending</p>
        <p className="mt-2 text-2xl font-semibold text-amber-400">{pendingAmount}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Ready to Claim</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{readyAmount}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Completed (30d)</p>
        <p className="mt-2 text-2xl font-semibold text-white">{completedThisMonth}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Avg Wait</p>
        <p className="mt-2 text-2xl font-semibold text-white">{averageWaitTime}</p>
      </div>
    </div>
  );
}
