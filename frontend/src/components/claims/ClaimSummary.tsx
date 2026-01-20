type ClaimSummaryProps = {
  totalClaimable: string;
  totalClaimed: string;
  pendingRewards: string;
  nextClaimIn: string;
};

export function ClaimSummary({ totalClaimable, totalClaimed, pendingRewards, nextClaimIn }: ClaimSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Claimable Now</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{totalClaimable}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Claimed</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalClaimed}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Pending</p>
        <p className="mt-2 text-2xl font-semibold text-amber-400">{pendingRewards}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Next Claim</p>
        <p className="mt-2 text-2xl font-semibold text-white">{nextClaimIn}</p>
      </div>
    </div>
  );
}
