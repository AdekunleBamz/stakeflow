type TreasuryOverviewProps = {
  totalValue: string;
  monthlyRevenue: string;
  monthlyExpenses: string;
  runway: string;
};

export function TreasuryOverview({ totalValue, monthlyRevenue, monthlyExpenses, runway }: TreasuryOverviewProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Value</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalValue}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Monthly Revenue</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{monthlyRevenue}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Monthly Expenses</p>
        <p className="mt-2 text-2xl font-semibold text-red-400">{monthlyExpenses}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Runway</p>
        <p className="mt-2 text-2xl font-semibold text-purple-400">{runway}</p>
      </div>
    </div>
  );
}
