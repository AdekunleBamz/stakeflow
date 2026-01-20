import { FlexiblePosition, FlexibleStats } from "@/components/flexible";

const positions = [
  { id: "F01", amount: "8,500 STX", stakedSince: "Jan 10, 2026", currentAPY: "8.5%", earnedRewards: "72 STF" },
  { id: "F02", amount: "3,200 STX", stakedSince: "Jan 18, 2026", currentAPY: "8.5%", earnedRewards: "5 STF" },
];

export default function FlexiblePage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Flexible</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Flexible staking</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Stake with no lock period. Withdraw your funds anytime.
          </p>
        </header>

        <FlexibleStats
          totalFlexible="11,700 STX"
          positions={2}
          currentAPY="8.5%"
          totalEarned="77 STF"
        />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Your Flexible Positions</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {positions.map((p) => (
              <FlexiblePosition key={p.id} {...p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
