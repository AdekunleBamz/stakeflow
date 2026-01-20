type ClaimRowProps = {
  nftId: number;
  rewardAmount: string;
  lastClaimed: string;
  nextClaim: string;
  status: "claimable" | "pending" | "claimed";
};

const statusConfig: Record<ClaimRowProps["status"], { bg: string; text: string; label: string }> = {
  claimable: { bg: "bg-emerald-500/20", text: "text-emerald-400", label: "Claimable" },
  pending: { bg: "bg-amber-500/20", text: "text-amber-400", label: "Pending" },
  claimed: { bg: "bg-slate-500/20", text: "text-slate-400", label: "Claimed" },
};

export function ClaimRow({ nftId, rewardAmount, lastClaimed, nextClaim, status }: ClaimRowProps) {
  const cfg = statusConfig[status];
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-sm font-bold text-emerald-400">
          #{nftId}
        </div>
        <div>
          <p className="font-medium text-white">{rewardAmount}</p>
          <p className="text-sm text-slate-400">Last: {lastClaimed}</p>
        </div>
      </div>
      <div className="text-right text-sm">
        <p className="text-slate-300">Next: {nextClaim}</p>
      </div>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
        {cfg.label}
      </span>
    </div>
  );
}
