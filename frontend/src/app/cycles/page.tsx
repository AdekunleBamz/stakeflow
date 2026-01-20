import { CycleCard, CycleStats } from "@/components/cycles";

const cycles = [
  { cycleNumber: 24, startDate: "Jan 15, 2026", endDate: "Jan 29, 2026", rewardsPool: "125,000 STF", participants: 1850, status: "active" as const },
  { cycleNumber: 25, startDate: "Jan 29, 2026", endDate: "Feb 12, 2026", rewardsPool: "130,000 STF", participants: 0, status: "upcoming" as const },
  { cycleNumber: 23, startDate: "Jan 1, 2026", endDate: "Jan 15, 2026", rewardsPool: "118,500 STF", participants: 1720, status: "completed" as const },
  { cycleNumber: 22, startDate: "Dec 18, 2025", endDate: "Jan 1, 2026", rewardsPool: "115,000 STF", participants: 1680, status: "completed" as const },
];

export default function CyclesPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-rose-400">Cycles</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Reward cycles</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Track bi-weekly reward distribution cycles and your participation.
          </p>
        </header>

        <CycleStats
          currentCycle={24}
          daysRemaining={9}
          totalDistributed="2.8M STF"
          avgParticipants={1650}
        />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Cycle History</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {cycles.map((c) => (
              <CycleCard key={c.cycleNumber} {...c} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
