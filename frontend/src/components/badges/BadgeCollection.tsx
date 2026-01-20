type BadgeCollectionProps = {
  totalBadges: number;
  earnedCount: number;
  rareCount: number;
  nextBadge: string | null;
};

export function BadgeCollection({ totalBadges, earnedCount, rareCount, nextBadge }: BadgeCollectionProps) {
  const percent = Math.round((earnedCount / totalBadges) * 100);
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Collected</p>
          <p className="mt-1 text-2xl font-semibold text-white">{earnedCount}/{totalBadges}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Progress</p>
          <p className="mt-1 text-2xl font-semibold text-purple-400">{percent}%</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Rare+</p>
          <p className="mt-1 text-2xl font-semibold text-amber-400">{rareCount}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Next Badge</p>
          <p className="mt-1 text-lg font-semibold text-emerald-400">{nextBadge || "—"}</p>
        </div>
      </div>
      <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-800">
        <div className="h-full bg-gradient-to-r from-purple-500 to-amber-500" style={{ width: `${percent}%` }} />
      </div>
    </div>
  );
}
