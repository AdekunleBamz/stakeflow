type NetworkStatusProps = {
  chainTip: number;
  peerCount: number;
  syncStatus: "synced" | "syncing" | "stalled";
  lastBlock: string;
};

const statusStyles: Record<NetworkStatusProps["syncStatus"], { bg: string; text: string }> = {
  synced: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  syncing: { bg: "bg-amber-500/20", text: "text-amber-400" },
  stalled: { bg: "bg-red-500/20", text: "text-red-400" },
};

export function NetworkStatus({ chainTip, peerCount, syncStatus, lastBlock }: NetworkStatusProps) {
  const style = statusStyles[syncStatus];
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Network Status</h3>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${style.bg} ${style.text}`}>
          {syncStatus}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-slate-400">Chain Tip</p>
          <p className="font-mono text-white">#{chainTip.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-slate-400">Peers</p>
          <p className="font-medium text-white">{peerCount}</p>
        </div>
        <div>
          <p className="text-slate-400">Last Block</p>
          <p className="text-white">{lastBlock}</p>
        </div>
      </div>
    </div>
  );
}
