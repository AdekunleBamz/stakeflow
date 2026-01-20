type NodeStatsProps = {
  totalNodes: number;
  onlineNodes: number;
  avgLatency: string;
  globalUptime: string;
};

export function NodeStats({ totalNodes, onlineNodes, avgLatency, globalUptime }: NodeStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Nodes</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalNodes}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Online</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{onlineNodes}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Avg Latency</p>
        <p className="mt-2 text-2xl font-semibold text-indigo-400">{avgLatency}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Global Uptime</p>
        <p className="mt-2 text-2xl font-semibold text-white">{globalUptime}</p>
      </div>
    </div>
  );
}
