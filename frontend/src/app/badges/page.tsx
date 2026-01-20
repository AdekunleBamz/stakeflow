import { BadgeDisplay, BadgeCollection } from "@/components/badges";

const badges = [
  { id: "1", name: "Early Adopter", icon: "🚀", tier: "gold" as const, earned: true, earnedAt: "Dec 15, 2025", requirement: "Join during launch phase" },
  { id: "2", name: "Staking Pro", icon: "💎", tier: "platinum" as const, earned: true, earnedAt: "Jan 10, 2026", requirement: "Stake for 6+ months" },
  { id: "3", name: "NFT Collector", icon: "🎨", tier: "silver" as const, earned: true, earnedAt: "Jan 20, 2026", requirement: "Own 5+ NFTs" },
  { id: "4", name: "Diamond Hands", icon: "🙌", tier: "diamond" as const, earned: false, requirement: "Hold through 3 market cycles" },
];

export default function BadgesPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">Badges</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Your badge collection</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Earn badges by reaching milestones and completing special challenges.
          </p>
        </header>

        <BadgeCollection totalBadges={20} earnedCount={8} rareCount={4} nextBadge="Diamond Hands" />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">All Badges</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {badges.map((b) => (
              <BadgeDisplay key={b.id} {...b} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
