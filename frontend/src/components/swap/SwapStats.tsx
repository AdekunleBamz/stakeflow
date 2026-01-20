type SwapStatsProps = {
  totalSwaps: string;
  volume24h: string;
  avgSlippage: string;
  supportedPairs: number;
};

export function SwapStats({ totalSwaps, volume24h, avgSlippage, supportedPairs }: SwapStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Swaps</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalSwaps}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">24h Volume</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{volume24h}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Avg Slippage</p>
        <p className="mt-2 text-2xl font-semibold text-amber-400">{avgSlippage}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Pairs</p>
        <p className="mt-2 text-2xl font-semibold text-white">{supportedPairs}</p>
      </div>
    </div>
  );
}
