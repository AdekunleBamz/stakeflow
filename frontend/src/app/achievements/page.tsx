import { AchievementBadge, AchievementStats } from "@/components/achievements";

const achievements = [
  { id: "1", name: "First Steps", description: "Connect your wallet for the first time", icon: "👋", rarity: "common" as const, unlocked: true, unlockedAt: "Jan 1, 2026" },
  { id: "2", name: "Staker", description: "Make your first stake", icon: "🥩", rarity: "common" as const, unlocked: true, unlockedAt: "Jan 2, 2026" },
  { id: "3", name: "Collector", description: "Own an NFT", icon: "🖼️", rarity: "rare" as const, unlocked: true, unlockedAt: "Jan 5, 2026" },
  { id: "4", name: "Whale", description: "Stake over 100,000 STX", icon: "🐋", rarity: "legendary" as const, unlocked: false },
];

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">Achievements</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Your achievements</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Collect badges by completing milestones and special challenges.
          </p>
        </header>

        <AchievementStats
          totalAchievements={24}
          unlocked={12}
          rareUnlocked={5}
          completionPercent={50}
        />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">All Achievements</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((a) => (
              <AchievementBadge key={a.id} {...a} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
