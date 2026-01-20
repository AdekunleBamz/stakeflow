import { BoostCard, BoostStats } from "@/components/boosts";

const boosts = [
  { name: "Early Staker Boost", description: "Bonus for staking in the first month", multiplier: "1.5x", duration: "30 days", active: true, expiresAt: "Feb 15, 2026" },
  { name: "NFT Holder Boost", description: "Bonus for holding a StakeFlow NFT", multiplier: "1.25x", duration: "Ongoing", active: true },
  { name: "Referral Boost", description: "Bonus for referring 5+ users", multiplier: "1.1x", duration: "7 days", active: false },
  { name: "Loyalty Boost", description: "Bonus for 90+ days staking", multiplier: "1.2x", duration: "Permanent", active: false },
];

export default function BoostsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Boosts</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Reward boosts</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Activate boosts to multiply your staking rewards and earn more.
          </p>
        </header>

        <BoostStats
          activeBoosts={2}
          totalMultiplier="1.875x"
          bonusRewards="+875 STF"
          availableBoosts={2}
        />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">All Boosts</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {boosts.map((b) => (
              <BoostCard key={b.name} {...b} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
