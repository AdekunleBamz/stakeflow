import { BenchmarkCard, BenchmarkStat } from "@/components/benchmarks";

const stats = [
  {
    label: "Coverage",
    value: "27 validators",
    detail: "Measured across long-tail operators and top-tier pools.",
  },
  {
    label: "Cadence",
    value: "Daily",
    detail: "Benchmarks update every 24 hours with new telemetry.",
  },
  {
    label: "Scorecards",
    value: "6 categories",
    detail: "Reliability, decentralization, performance, and more.",
  },
];

const benchmarks = [
  {
    title: "Uptime reliability",
    summary: "Median uptime for top-tier validators across the last 30 days.",
    result: "99.93%",
    updated: "Jan 19, 2026",
  },
  {
    title: "Reward consistency",
    summary: "Variance in reward payouts for diversified validator sets.",
    result: "±1.8%",
    updated: "Jan 19, 2026",
  },
  {
    title: "Exit liquidity",
    summary: "Average time to exit positions using fastest routes.",
    result: "4.6 hours",
    updated: "Jan 19, 2026",
  },
  {
    title: "Governance participation",
    summary: "Validator participation in the latest governance cycle.",
    result: "88%",
    updated: "Jan 12, 2026",
  },
];

export default function BenchmarksPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Benchmarks</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Validator performance benchmarks</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Compare operator performance using standardized scorecards and daily refreshes.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {stats.map((stat) => (
            <BenchmarkStat key={stat.label} {...stat} />
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {benchmarks.map((benchmark) => (
            <BenchmarkCard key={benchmark.title} {...benchmark} />
          ))}
        </section>
      </div>
    </div>
  );
}
