import { InsightCard, InsightTimeline } from "@/components/insights";

const snapshot = [
  {
    title: "Reward momentum",
    summary: "Average reward rates stabilized after the summer volatility cycle.",
    metric: "+4.2% QoQ",
    timeframe: "Quarterly",
  },
  {
    title: "Validator reliability",
    summary: "Median uptime climbed as operators adopted automated failover.",
    metric: "99.8%",
    timeframe: "Monthly",
  },
  {
    title: "Delegator sentiment",
    summary: "More wallets split stake across three or more validators for resilience.",
    metric: "+18%",
    timeframe: "Weekly",
  },
];

const timeline = [
  {
    title: "Liquidity depth expanded",
    detail: "Bridge inflows accelerated and DEX liquidity grew on key pairs.",
    date: "Sep 2024",
  },
  {
    title: "Operator diversification",
    detail: "New operators entered the top 20, reducing concentration risk.",
    date: "Aug 2024",
  },
  {
    title: "Governance turnout",
    detail: "Validator participation hit new highs during the governance cycle.",
    date: "Jul 2024",
  },
];

export default function InsightsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Insights</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Market signals for stakers</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Curated trends, timelines, and signals to help you plan your next staking move.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          {snapshot.map((item) => (
            <InsightCard key={item.title} {...item} />
          ))}
        </section>

        <section className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="text-2xl font-semibold">Timeline</h2>
          <p className="mt-2 text-sm text-slate-300">Milestones shaping delegator behavior.</p>
          <div className="mt-6">
            <InsightTimeline items={timeline} />
          </div>
        </section>
      </div>
    </div>
  );
}
