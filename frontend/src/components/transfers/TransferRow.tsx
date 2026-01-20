type TransferRowProps = {
  from: string;
  to: string;
  amount: string;
  asset: string;
  timestamp: string;
  status: "confirmed" | "pending" | "failed";
};

const statusStyles: Record<TransferRowProps["status"], { bg: string; text: string }> = {
  confirmed: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  pending: { bg: "bg-amber-500/20", text: "text-amber-400" },
  failed: { bg: "bg-red-500/20", text: "text-red-400" },
};

export function TransferRow({ from, to, amount, asset, timestamp, status }: TransferRowProps) {
  const style = statusStyles[status];
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex-1">
        <div className="flex items-center gap-2 text-sm">
          <span className="font-mono text-slate-400">{from}</span>
          <span className="text-slate-500">→</span>
          <span className="font-mono text-white">{to}</span>
        </div>
        <p className="mt-1 text-xs text-slate-400">{timestamp}</p>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-medium text-white">{amount} {asset}</span>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${style.bg} ${style.text}`}>
          {status}
        </span>
      </div>
    </div>
  );
}
