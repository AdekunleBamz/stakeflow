type EarningRowProps = {
  source: string;
  amount: string;
  type: "stake" | "referral" | "bonus" | "airdrop";
  date: string;
};

const typeStyles: Record<EarningRowProps["type"], { bg: string; text: string }> = {
  stake: { bg: "bg-emerald-500/20", text: "text-emerald-400" },
  referral: { bg: "bg-blue-500/20", text: "text-blue-400" },
  bonus: { bg: "bg-purple-500/20", text: "text-purple-400" },
  airdrop: { bg: "bg-amber-500/20", text: "text-amber-400" },
};

export function EarningRow({ source, amount, type, date }: EarningRowProps) {
  const style = typeStyles[type];
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center gap-3">
        <span className={`rounded-full px-3 py-1 text-xs font-semibold capitalize ${style.bg} ${style.text}`}>
          {type}
        </span>
        <span className="font-medium text-white">{source}</span>
      </div>
      <div className="text-right">
        <p className="font-semibold text-emerald-400">+{amount}</p>
        <p className="text-sm text-slate-400">{date}</p>
      </div>
    </div>
  );
}
