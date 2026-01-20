import { MilestoneCard, MilestoneProgress } from "@/components/milestones";

const milestones = [
  { id: 1, title: "First Stake", description: "Stake any amount of STX", progress: 100, reward: "100 STF", completed: true },
  { id: 2, title: "Diamond Hands", description: "Hold stake for 30 days", progress: 100, reward: "500 STF", completed: true },
  { id: 3, title: "NFT Collector", description: "Own 3 StakeFlow NFTs", progress: 66, reward: "1,000 STF", completed: false },
  { id: 4, title: "Community Champion", description: "Refer 10 new stakers", progress: 40, reward: "2,500 STF", completed: false },
];

export default function MilestonesPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">Milestones</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Achievement milestones</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Complete milestones to earn bonus rewards and exclusive perks.
          </p>
        </header>

        <MilestoneProgress
          totalMilestones={12}
          completed={5}
          inProgress={2}
          totalRewards="3,200 STF"
        />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Your Milestones</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {milestones.map((m) => (
              <MilestoneCard key={m.id} {...m} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
