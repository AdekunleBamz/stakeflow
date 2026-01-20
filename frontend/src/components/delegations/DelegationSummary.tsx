type DelegationSummaryProps = {
  totalDelegated: string;
  totalRewards: string;
  activeDelegations: number;
  averageApy: string;
};

export function DelegationSummary({ totalDelegated, totalRewards, activeDelegations, averageApy }: DelegationSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Delegated</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalDelegated}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Rewards</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{totalRewards}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Active Delegations</p>
        <p className="mt-2 text-2xl font-semibold text-white">{activeDelegations}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Avg APY</p>
        <p className="mt-2 text-2xl font-semibold text-white">{averageApy}</p>
      </div>
    </div>
  );
}
