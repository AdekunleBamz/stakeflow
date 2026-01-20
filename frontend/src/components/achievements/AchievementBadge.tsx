type AchievementBadgeProps = {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  unlockedAt?: string;
  unlocked: boolean;
};

const rarityColors: Record<AchievementBadgeProps["rarity"], { border: string; text: string }> = {
  common: { border: "border-slate-500", text: "text-slate-400" },
  rare: { border: "border-blue-500", text: "text-blue-400" },
  epic: { border: "border-purple-500", text: "text-purple-400" },
  legendary: { border: "border-amber-500", text: "text-amber-400" },
};

export function AchievementBadge({ name, description, icon, rarity, unlockedAt, unlocked }: AchievementBadgeProps) {
  const colors = rarityColors[rarity];
  return (
    <div className={`rounded-xl border p-5 ${unlocked ? `${colors.border} bg-slate-900/60` : "border-slate-800/50 bg-slate-900/30 opacity-50"}`}>
      <div className="flex items-center gap-4">
        <div className="text-4xl">{icon}</div>
        <div>
          <h3 className="font-semibold text-white">{name}</h3>
          <p className={`text-xs font-semibold uppercase ${colors.text}`}>{rarity}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-slate-400">{description}</p>
      {unlocked && unlockedAt && (
        <p className="mt-2 text-xs text-slate-500">Unlocked: {unlockedAt}</p>
      )}
    </div>
  );
}
