import { QuestCard, QuestStats } from "@/components/quests";

const quests = [
  { id: 1, title: "Daily Check-in", description: "Visit the platform today", reward: "10 pts", xp: 25, progress: 100, category: "daily" as const },
  { id: 2, title: "Make a Stake", description: "Stake any amount of STX", reward: "50 pts", xp: 100, progress: 0, category: "daily" as const },
  { id: 3, title: "Refer a Friend", description: "Invite someone to join StakeFlow", reward: "500 pts", xp: 250, progress: 60, category: "weekly" as const },
  { id: 4, title: "NFT Collector", description: "Own 3 StakeFlow NFTs", reward: "1,000 pts", xp: 500, progress: 33, category: "special" as const },
];

export default function QuestsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-blue-400">Quests</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Daily quests</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Complete quests to earn points, XP, and exclusive rewards.
          </p>
        </header>

        <QuestStats
          activeQuests={3}
          completedQuests={42}
          totalXP={4850}
          streak={7}
        />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Available Quests</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {quests.map((q) => (
              <QuestCard key={q.id} {...q} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
