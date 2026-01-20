type BridgeStatsProps = {
  totalBridged: string;
  pendingTransfers: number;
  supportedChains: number;
  avgTime: string;
};

export function BridgeStats({ totalBridged, pendingTransfers, supportedChains, avgTime }: BridgeStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Bridged</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalBridged}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Pending</p>
        <p className="mt-2 text-2xl font-semibold text-amber-400">{pendingTransfers}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Chains</p>
        <p className="mt-2 text-2xl font-semibold text-cyan-400">{supportedChains}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Avg Time</p>
        <p className="mt-2 text-2xl font-semibold text-white">{avgTime}</p>
      </div>
    </div>
  );
}
