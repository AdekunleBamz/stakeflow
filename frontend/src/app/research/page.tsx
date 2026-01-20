import { ResearchCard, ResearchHighlights } from "@/components/research";

const highlights = [
  {
    label: "Coverage",
    value: "18 networks",
    detail: "Comparative staking performance across mainnet, testnet, and sidechain pools.",
  },
  {
    label: "Signals",
    value: "43 indicators",
    detail: "Validator health, reward volatility, and liquidity depth tracked daily.",
  },
  {
    label: "Cadence",
    value: "Weekly",
    detail: "Fresh reports with deep dives into validator behavior and reward dynamics.",
  },
];

const reports = [
  {
    title: "Validator health index Q3",
    summary:
      "A look at uptime stability, slashing events, and the protocol-level signals that predict risk before it surfaces.",
    category: "Network risk",
    date: "Sep 21, 2024",
    tags: ["Risk", "Uptime", "Slashing"],
  },
  {
    title: "Liquidity routes for rapid unstaking",
    summary:
      "Comparing swap paths, bridge throughput, and on-chain liquidity to model the fastest exit flows.",
    category: "Liquidity",
    date: "Sep 12, 2024",
    tags: ["Bridges", "DEX", "Unstake"],
  },
  {
    title: "Rewards resilience stress test",
    summary:
      "Scenario analysis on reward fluctuations, delegation shifts, and validator concentration.",
    category: "Rewards",
    date: "Aug 30, 2024",
    tags: ["Delegation", "Rewards", "Resilience"],
  },
  {
    title: "MEV capture study",
    summary:
      "Tracking how MEV-aware validators influence real yield and delegator share distributions.",
    category: "Yield",
    date: "Aug 18, 2024",
    tags: ["MEV", "Yield", "Governance"],
  },
  {
    title: "Cross-chain staking demand",
    summary:
      "Mapping demand signals from bridge flows and cross-chain governance participation.",
    category: "Demand",
    date: "Aug 4, 2024",
    tags: ["Cross-chain", "Governance", "Liquidity"],
  },
  {
    title: "Operator performance matrix",
    summary:
      "Ranking operators by reliability, decentralization contribution, and community signals.",
    category: "Operators",
    date: "Jul 22, 2024",
    tags: ["Operators", "Decentralization", "Signals"],
  },
];

export default function ResearchPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
        <header className="flex flex-col gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Research</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Deep dives into staking performance</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Stay ahead with weekly research briefs, validator insights, and multi-chain reward analysis.
          </p>
        </header>

        <ResearchHighlights highlights={highlights} />

        <section className="grid gap-6 md:grid-cols-2">
          {reports.map((report) => (
            <ResearchCard key={report.title} {...report} />
          ))}
        </section>
      </div>
    </div>
  );
}
