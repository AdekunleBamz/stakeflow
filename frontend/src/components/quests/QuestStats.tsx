type QuestStatsProps = {
  activeQuests: number;
  completedQuests: number;
  totalXP: number;
  streak: number;
};

export function QuestStats({ activeQuests, completedQuests, totalXP, streak }: QuestStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Active</p>
        <p className="mt-2 text-2xl font-semibold text-blue-400">{activeQuests}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Completed</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{completedQuests}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total XP</p>
        <p className="mt-2 text-2xl font-semibold text-purple-400">{totalXP.toLocaleString()}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Streak</p>
        <p className="mt-2 text-2xl font-semibold text-amber-400">{streak} days 🔥</p>
      </div>
    </div>
  );
}
