import { StreakCalendar, StreakRewards } from "@/components/streaks";

export default function StreaksPage() {
  const daysThisMonth = Array.from({ length: 30 }, (_, i) => i < 18);

  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-400">Streaks</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Daily check-ins</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Check in daily to earn bonus rewards. Longer streaks unlock bigger bonuses.
          </p>
        </header>

        <StreakRewards
          dailyReward={10}
          weeklyBonus={50}
          monthlyBonus={200}
          claimable={180}
        />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Your Calendar</h2>
          <StreakCalendar
            streak={18}
            longestStreak={45}
            checkedInToday={true}
            daysThisMonth={daysThisMonth}
          />
        </section>
      </div>
    </div>
  );
}
