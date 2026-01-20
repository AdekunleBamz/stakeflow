type ContractStatsProps = {
  totalContracts: number;
  activeContracts: number;
  totalTransactions: string;
  lastDeployment: string;
};

export function ContractStats({ totalContracts, activeContracts, totalTransactions, lastDeployment }: ContractStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Contracts</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalContracts}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Active</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{activeContracts}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Txs</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalTransactions}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Last Deploy</p>
        <p className="mt-2 text-2xl font-semibold text-white">{lastDeployment}</p>
      </div>
    </div>
  );
}
