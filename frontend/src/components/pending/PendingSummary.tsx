type PendingSummaryProps = {
  totalPending: number;
  claimableValue: string;
  expiringSoon: number;
  actionRequired: number;
};

export function PendingSummary({ totalPending, claimableValue, expiringSoon, actionRequired }: PendingSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Pending</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalPending}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Claimable</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{claimableValue}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Expiring Soon</p>
        <p className="mt-2 text-2xl font-semibold text-amber-400">{expiringSoon}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Action Required</p>
        <p className="mt-2 text-2xl font-semibold text-red-400">{actionRequired}</p>
      </div>
    </div>
  );
}
