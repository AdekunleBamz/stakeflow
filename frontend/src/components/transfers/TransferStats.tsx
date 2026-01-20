type TransferStatsProps = {
  totalTransfers: number;
  volume24h: string;
  pendingTransfers: number;
  avgConfirmation: string;
};

export function TransferStats({ totalTransfers, volume24h, pendingTransfers, avgConfirmation }: TransferStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Transfers</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalTransfers.toLocaleString()}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">24h Volume</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{volume24h}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Pending</p>
        <p className="mt-2 text-2xl font-semibold text-amber-400">{pendingTransfers}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Avg Confirm</p>
        <p className="mt-2 text-2xl font-semibold text-white">{avgConfirmation}</p>
      </div>
    </div>
  );
}
