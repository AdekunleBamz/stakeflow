import { LockedPosition, LockedSummary } from "@/components/locked";

const positions = [
  { id: "001", amount: "10,000 STX", lockDate: "Dec 1, 2025", unlockDate: "Mar 1, 2026", daysRemaining: 40, bonusAPY: "5%" },
  { id: "002", amount: "5,000 STX", lockDate: "Jan 5, 2026", unlockDate: "Apr 5, 2026", daysRemaining: 75, bonusAPY: "5%" },
  { id: "003", amount: "25,000 STX", lockDate: "Jan 15, 2026", unlockDate: "Jul 15, 2026", daysRemaining: 176, bonusAPY: "8%" },
];

export default function LockedPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">Locked</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Locked staking</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            View your time-locked staking positions and bonus rewards.
          </p>
        </header>

        <LockedSummary
          totalLocked="40,000 STX"
          positions={3}
          avgLockTime="97 days"
          bonusEarned="1,850 STF"
        />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Active Positions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {positions.map((p) => (
              <LockedPosition key={p.id} {...p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
