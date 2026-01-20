type ValidatorStatsProps = {
  totalValidators: number;
  activeValidators: number;
  totalStaked: string;
  averageUptime: string;
};

export function ValidatorStats({ totalValidators, activeValidators, totalStaked, averageUptime }: ValidatorStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Validators</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalValidators}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Active</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{activeValidators}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total Staked</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalStaked}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Avg Uptime</p>
        <p className="mt-2 text-2xl font-semibold text-white">{averageUptime}</p>
      </div>
    </div>
  );
}
