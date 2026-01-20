type LiquidityStatsProps = {
  totalLiquidity: string;
  activePools: number;
  yourPositions: string;
  feesEarned: string;
};

export function LiquidityStats({ totalLiquidity, activePools, yourPositions, feesEarned }: LiquidityStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Liquidity</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalLiquidity}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Active Pools</p>
        <p className="mt-2 text-2xl font-semibold text-cyan-400">{activePools}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Your Positions</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{yourPositions}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Fees Earned</p>
        <p className="mt-2 text-2xl font-semibold text-purple-400">{feesEarned}</p>
      </div>
    </div>
  );
}
