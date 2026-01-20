type BridgeTransferProps = {
  txHash: string;
  sourceChain: string;
  destChain: string;
  amount: string;
  asset: string;
  status: "pending" | "confirming" | "completed" | "failed";
  timestamp: string;
};

const statusStyles: Record<BridgeTransferProps["status"], { bg: string; text: string }> = {
  pending: { bg: "bg-amber-500/20", text: "text-amber-400" },
  confirming: { bg: "bg-blue-500/20", text: "text-blue-400" },
  completed: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  failed: { bg: "bg-red-500/20", text: "text-red-400" },
};

export function BridgeTransfer({ txHash, sourceChain, destChain, amount, asset, status, timestamp }: BridgeTransferProps) {
  const style = statusStyles[status];
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-white">{sourceChain}</span>
          <span className="text-slate-500">→</span>
          <span className="font-medium text-white">{destChain}</span>
        </div>
        <p className="mt-1 font-mono text-xs text-slate-400">{txHash}</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="font-medium text-white">{amount} {asset}</p>
          <p className="text-xs text-slate-400">{timestamp}</p>
        </div>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${style.bg} ${style.text}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
