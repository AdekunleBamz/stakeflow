type RankingFiltersProps = {
  period: "daily" | "weekly" | "monthly" | "alltime";
  category: "staked" | "nfts" | "rewards" | "referrals";
  onPeriodChange: (p: RankingFiltersProps["period"]) => void;
  onCategoryChange: (c: RankingFiltersProps["category"]) => void;
};

export function RankingFilters({ period, category, onPeriodChange, onCategoryChange }: RankingFiltersProps) {
  const periods: RankingFiltersProps["period"][] = ["daily", "weekly", "monthly", "alltime"];
  const categories: RankingFiltersProps["category"][] = ["staked", "nfts", "rewards", "referrals"];

  return (
    <div className="flex flex-wrap gap-4">
      <div className="flex gap-2">
        {periods.map((p) => (
          <button
            key={p}
            onClick={() => onPeriodChange(p)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${period === p ? "bg-purple-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
          >
            {p.charAt(0).toUpperCase() + p.slice(1)}
          </button>
        ))}
      </div>
      <div className="flex gap-2">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => onCategoryChange(c)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${category === c ? "bg-emerald-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"}`}
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
