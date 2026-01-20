import { ReportCard, ReportFilters } from "@/components/reports";

const filters = ["All", "Risk", "Rewards", "Liquidity", "Operations", "Governance"];

const reports = [
  {
    title: "Validator risk digest",
    summary: "A tactical view of slashing exposure, uptime stability, and operator resiliency.",
    author: "Stakeflow Research",
    date: "Jan 18, 2026",
    status: "Weekly report",
  },
  {
    title: "Rewards routing playbook",
    summary: "How delegators rotate stake to maximize yield without sacrificing liquidity.",
    author: "Protocol Strategy",
    date: "Jan 12, 2026",
    status: "Field guide",
  },
  {
    title: "Liquidity stress signals",
    summary: "Tracking withdrawal queues, bridge utilization, and swap depth changes.",
    author: "Market Ops",
    date: "Jan 5, 2026",
    status: "Alert brief",
  },
  {
    title: "Governance participation trends",
    summary: "Who is showing up to vote and how validator alignment is shifting.",
    author: "Community Insights",
    date: "Dec 28, 2025",
    status: "Monthly review",
  },
];

export default function ReportsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Reports</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Stakeflow intelligence briefings</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Curated reports on validator performance, market conditions, and reward signals.
          </p>
        </header>

        <ReportFilters filters={filters} />

        <section className="grid gap-6 md:grid-cols-2">
          {reports.map((report) => (
            <ReportCard key={report.title} {...report} />
          ))}
        </section>
      </div>
    </div>
  );
}
