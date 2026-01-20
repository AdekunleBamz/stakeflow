type MilestoneCardProps = {
  id: number;
  title: string;
  description: string;
  progress: number;
  reward: string;
  completed: boolean;
};

export function MilestoneCard({ id, title, description, progress, reward, completed }: MilestoneCardProps) {
  return (
    <div className={`rounded-xl border p-5 ${completed ? "border-emerald-500/30 bg-emerald-500/10" : "border-slate-800 bg-slate-900/60"}`}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-slate-400">Milestone #{id}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>
        {completed && (
          <span className="rounded-full bg-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
            ✓ Complete
          </span>
        )}
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-700">
          <div className={`h-full ${completed ? "bg-emerald-500" : "bg-purple-500"}`} style={{ width: `${progress}%` }} />
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-400">
        Reward: <span className="font-medium text-amber-400">{reward}</span>
      </p>
    </div>
  );
}
