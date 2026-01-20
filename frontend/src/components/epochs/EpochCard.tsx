type EpochCardProps = {
  epochNumber: number;
  startBlock: number;
  endBlock: number;
  rewardsDistributed: string;
  status: "current" | "completed" | "upcoming";
};

const statusStyles: Record<EpochCardProps["status"], { bg: string; text: string }> = {
  current: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  completed: { bg: "bg-slate-500/20", text: "text-slate-400" },
  upcoming: { bg: "bg-blue-500/20", text: "text-blue-400" },
};

export function EpochCard({ epochNumber, startBlock, endBlock, rewardsDistributed, status }: EpochCardProps) {
  const style = statusStyles[status];
  const progress = status === "current" ? 65 : status === "completed" ? 100 : 0;

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Epoch #{epochNumber}</h3>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${style.bg} ${style.text}`}>
          {status}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-slate-400">Start Block</p>
          <p className="font-mono text-white">#{startBlock.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-slate-400">End Block</p>
          <p className="font-mono text-white">#{endBlock.toLocaleString()}</p>
        </div>
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-700">
          <div className="h-full bg-emerald-500" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-400">
        Rewards: <span className="text-emerald-400">{rewardsDistributed}</span>
      </p>
    </div>
  );
}
