type BadgeDisplayProps = {
  id: string;
  name: string;
  icon: string;
  tier: "bronze" | "silver" | "gold" | "platinum" | "diamond";
  earned: boolean;
  earnedAt?: string;
  requirement: string;
};

const tierStyles: Record<BadgeDisplayProps["tier"], { bg: string; border: string; text: string }> = {
  bronze: { bg: "bg-orange-900/20", border: "border-orange-700", text: "text-orange-400" },
  silver: { bg: "bg-slate-400/20", border: "border-slate-500", text: "text-slate-300" },
  gold: { bg: "bg-amber-900/20", border: "border-amber-500", text: "text-amber-400" },
  platinum: { bg: "bg-cyan-900/20", border: "border-cyan-500", text: "text-cyan-400" },
  diamond: { bg: "bg-purple-900/20", border: "border-purple-500", text: "text-purple-400" },
};

export function BadgeDisplay({ name, icon, tier, earned, earnedAt, requirement }: BadgeDisplayProps) {
  const styles = tierStyles[tier];
  return (
    <div className={`rounded-xl border p-5 ${earned ? `${styles.border} ${styles.bg}` : "border-slate-800/50 bg-slate-900/30 opacity-60"}`}>
      <div className="flex items-center gap-4">
        <div className="text-4xl">{icon}</div>
        <div className="flex-1">
          <h3 className="font-semibold text-white">{name}</h3>
          <p className={`text-xs font-semibold uppercase ${styles.text}`}>{tier}</p>
        </div>
        {earned && <span className="text-emerald-400 text-xl">✓</span>}
      </div>
      <p className="mt-3 text-sm text-slate-400">{requirement}</p>
      {earned && earnedAt && (
        <p className="mt-2 text-xs text-slate-500">Earned: {earnedAt}</p>
      )}
    </div>
  );
}
