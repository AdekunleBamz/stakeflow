type StreakCalendarProps = {
  streak: number;
  longestStreak: number;
  checkedInToday: boolean;
  daysThisMonth: boolean[];
};

export function StreakCalendar({ streak, longestStreak, checkedInToday, daysThisMonth }: StreakCalendarProps) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-white">Current Streak</h3>
          <p className="text-3xl font-bold text-amber-400">{streak} days</p>
        </div>
        <div className="text-right">
          <p className="text-xs text-slate-400">Longest</p>
          <p className="text-lg font-semibold text-white">{longestStreak} days</p>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-7 gap-1">
        {daysThisMonth.map((checked, i) => (
          <div
            key={i}
            className={`h-6 w-6 rounded ${checked ? "bg-amber-500" : "bg-slate-800"}`}
          />
        ))}
      </div>
      <p className={`mt-4 text-sm ${checkedInToday ? "text-emerald-400" : "text-yellow-400"}`}>
        {checkedInToday ? "✅ Checked in today" : "⏳ Check in to keep your streak!"}
      </p>
    </div>
  );
}
