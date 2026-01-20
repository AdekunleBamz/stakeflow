type RedeemBalanceProps = {
  pointsBalance: string;
  itemsRedeemed: number;
  totalSpent: string;
  pointsExpiring: string;
};

export function RedeemBalance({ pointsBalance, itemsRedeemed, totalSpent, pointsExpiring }: RedeemBalanceProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Points Balance</p>
        <p className="mt-2 text-2xl font-semibold text-amber-400">{pointsBalance}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Redeemed</p>
        <p className="mt-2 text-2xl font-semibold text-white">{itemsRedeemed}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Spent</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalSpent}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Expiring Soon</p>
        <p className="mt-2 text-2xl font-semibold text-red-400">{pointsExpiring}</p>
      </div>
    </div>
  );
}
