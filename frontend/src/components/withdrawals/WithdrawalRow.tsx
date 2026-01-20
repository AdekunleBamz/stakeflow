type WithdrawalRowProps = {
  amount: string;
  validator: string;
  requestedAt: string;
  availableAt: string;
  status: "pending" | "ready" | "completed";
};

const statusStyles: Record<WithdrawalRowProps["status"], { bg: string; text: string; label: string }> = {
  pending: { bg: "bg-amber-500/20", text: "text-amber-400", label: "Pending" },
  ready: { bg: "bg-emerald-500/20", text: "text-emerald-400", label: "Ready" },
  completed: { bg: "bg-slate-500/20", text: "text-slate-400", label: "Completed" },
};

export function WithdrawalRow({ amount, validator, requestedAt, availableAt, status }: WithdrawalRowProps) {
  const style = statusStyles[status];
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="space-y-1">
        <p className="font-medium text-white">{amount}</p>
        <p className="text-sm text-slate-400">from {validator}</p>
      </div>
      <div className="text-right text-sm">
        <p className="text-slate-400">Requested {requestedAt}</p>
        <p className="text-slate-300">Available {availableAt}</p>
      </div>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${style.bg} ${style.text}`}>
        {style.label}
      </span>
    </div>
  );
}
