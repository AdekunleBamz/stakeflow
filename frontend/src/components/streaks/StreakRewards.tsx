type StreakRewardsProps = {
  dailyReward: number;
  weeklyBonus: number;
  monthlyBonus: number;
  claimable: number;
};

export function StreakRewards({ dailyReward, weeklyBonus, monthlyBonus, claimable }: StreakRewardsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Daily</p>
        <p className="mt-2 text-2xl font-semibold text-white">{dailyReward} FLOW</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Weekly Bonus</p>
        <p className="mt-2 text-2xl font-semibold text-blue-400">+{weeklyBonus} FLOW</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Monthly Bonus</p>
        <p className="mt-2 text-2xl font-semibold text-purple-400">+{monthlyBonus} FLOW</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Claimable</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{claimable} FLOW</p>
      </div>
    </div>
  );
}
