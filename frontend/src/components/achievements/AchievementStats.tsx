type AchievementStatsProps = {
  totalAchievements: number;
  unlocked: number;
  rareUnlocked: number;
  completionPercent: number;
};

export function AchievementStats({ totalAchievements, unlocked, rareUnlocked, completionPercent }: AchievementStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalAchievements}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Unlocked</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{unlocked}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Rare+</p>
        <p className="mt-2 text-2xl font-semibold text-purple-400">{rareUnlocked}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Completion</p>
        <p className="mt-2 text-2xl font-semibold text-white">{completionPercent}%</p>
      </div>
    </div>
  );
}
