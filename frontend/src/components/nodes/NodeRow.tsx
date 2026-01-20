type NodeRowProps = {
  name: string;
  region: string;
  latency: number;
  uptime: number;
  status: "online" | "offline" | "syncing";
  version: string;
};

const statusStyles = {
  online: { bg: "bg-emerald-500/20", text: "text-emerald-400", dot: "bg-emerald-500" },
  offline: { bg: "bg-red-500/20", text: "text-red-400", dot: "bg-red-500" },
  syncing: { bg: "bg-amber-500/20", text: "text-amber-400", dot: "bg-amber-500" },
};

export function NodeRow({ name, region, latency, uptime, status, version }: NodeRowProps) {
  const style = statusStyles[status];
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center gap-4">
        <div className={`h-3 w-3 rounded-full ${style.dot}`} />
        <div>
          <p className="font-medium text-white">{name}</p>
          <p className="mt-0.5 text-xs text-slate-400">{region}</p>
        </div>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <span className="text-slate-300">{latency}ms</span>
        <span className="text-slate-400">{uptime}% uptime</span>
        <span className="text-slate-500">v{version}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${style.bg} ${style.text}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
