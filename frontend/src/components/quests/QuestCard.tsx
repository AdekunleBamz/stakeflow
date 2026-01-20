type QuestCardProps = {
  id: number;
  title: string;
  description: string;
  reward: string;
  xp: number;
  progress: number;
  category: "daily" | "weekly" | "special";
};

const categoryColors: Record<QuestCardProps["category"], string> = {
  daily: "text-blue-400",
  weekly: "text-purple-400",
  special: "text-amber-400",
};

export function QuestCard({ id, title, description, reward, xp, progress, category }: QuestCardProps) {
  const completed = progress >= 100;
  return (
    <div className={`rounded-xl border p-5 ${completed ? "border-emerald-500/30 bg-emerald-500/10" : "border-slate-800 bg-slate-900/60"}`}>
      <div className="flex items-start justify-between">
        <div>
          <span className={`text-xs font-semibold uppercase ${categoryColors[category]}`}>{category}</span>
          <h3 className="mt-1 text-lg font-semibold text-white">{title}</h3>
          <p className="mt-1 text-sm text-slate-400">{description}</p>
        </div>
        {completed && <span className="text-2xl">✓</span>}
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-xs text-slate-400">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="mt-1 h-2 overflow-hidden rounded-full bg-slate-700">
          <div className={`h-full ${completed ? "bg-emerald-500" : "bg-blue-500"}`} style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm">
        <span className="text-amber-400">{reward}</span>
        <span className="text-slate-400">+{xp} XP</span>
      </div>
    </div>
  );
}
