type BlockStatsProps = {
  currentHeight: number;
  avgBlockTime: string;
  totalTransactions: string;
  chainSize: string;
};

export function BlockStats({ currentHeight, avgBlockTime, totalTransactions, chainSize }: BlockStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Current Height</p>
        <p className="mt-2 text-2xl font-semibold text-white">{currentHeight.toLocaleString()}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Avg Block Time</p>
        <p className="mt-2 text-2xl font-semibold text-indigo-400">{avgBlockTime}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Transactions</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{totalTransactions}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Chain Size</p>
        <p className="mt-2 text-2xl font-semibold text-white">{chainSize}</p>
      </div>
    </div>
  );
}
