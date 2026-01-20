import { EpochCard, EpochStats } from "@/components/epochs";

const epochs = [
  { epochNumber: 89, startBlock: 184800, endBlock: 186000, rewardsDistributed: "125,000 STF", status: "current" as const },
  { epochNumber: 90, startBlock: 186000, endBlock: 187200, rewardsDistributed: "—", status: "upcoming" as const },
  { epochNumber: 88, startBlock: 183600, endBlock: 184800, rewardsDistributed: "118,500 STF", status: "completed" as const },
  { epochNumber: 87, startBlock: 182400, endBlock: 183600, rewardsDistributed: "122,000 STF", status: "completed" as const },
];

export default function EpochsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">Epochs</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Staking epochs</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Track staking epochs and reward distribution cycles.
          </p>
        </header>

        <EpochStats
          currentEpoch={89}
          blocksRemaining={580}
          totalRewards="4.2M STF"
          avgEpochDuration="~14 days"
        />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Epoch History</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {epochs.map((e) => (
              <EpochCard key={e.epochNumber} {...e} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
