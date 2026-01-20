type MilestoneProgressProps = {
  totalMilestones: number;
  completed: number;
  inProgress: number;
  totalRewards: string;
};

export function MilestoneProgress({ totalMilestones, completed, inProgress, totalRewards }: MilestoneProgressProps) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Total</p>
        <p className="mt-2 text-2xl font-semibold text-white">{totalMilestones}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Completed</p>
        <p className="mt-2 text-2xl font-semibold text-emerald-400">{completed}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">In Progress</p>
        <p className="mt-2 text-2xl font-semibold text-purple-400">{inProgress}</p>
      </div>
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Earned</p>
        <p className="mt-2 text-2xl font-semibold text-amber-400">{totalRewards}</p>
      </div>
    </div>
  );
}
