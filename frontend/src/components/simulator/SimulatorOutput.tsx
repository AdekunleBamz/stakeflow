type SimulatorOutputProps = {
  dailyRewards: string;
  monthlyRewards: string;
  yearlyRewards: string;
  effectiveAPY: string;
};

export function SimulatorOutput({ dailyRewards, monthlyRewards, yearlyRewards, effectiveAPY }: SimulatorOutputProps) {
  return (
    <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-5">
      <h3 className="text-lg font-semibold text-emerald-400">Projected Rewards</h3>
      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
        <div>
          <p className="text-xs text-slate-400">Daily</p>
          <p className="mt-1 text-xl font-semibold text-white">{dailyRewards}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Monthly</p>
          <p className="mt-1 text-xl font-semibold text-white">{monthlyRewards}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Yearly</p>
          <p className="mt-1 text-xl font-semibold text-white">{yearlyRewards}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">Effective APY</p>
          <p className="mt-1 text-xl font-semibold text-emerald-400">{effectiveAPY}</p>
        </div>
      </div>
    </div>
  );
}
