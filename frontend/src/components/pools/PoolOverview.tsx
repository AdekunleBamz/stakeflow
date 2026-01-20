type PoolOverviewProps = {
  totalPools: number;
  totalTvl: string;
  avgApy: string;
  totalStakers: number;
};

export function PoolOverview({ totalPools, totalTvl, avgApy, totalStakers }: PoolOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Active Pools</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalPools}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total TVL</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{totalTvl}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Avg APY</p>
        <p className="mt-2 text-2xl font-semibold text-white">{avgApy}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Stakers</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalStakers.toLocaleString()}</p>
      </div>
    </div>
  );
}
