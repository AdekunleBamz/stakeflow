import { AuditCard, AuditSummary } from "@/components/audits";

const summaries = [
  {
    label: "Coverage",
    value: "12 scopes",
    detail: "Core contracts, staking flows, and reward distribution evaluated.",
  },
  {
    label: "Status",
    value: "Up to date",
    detail: "All critical findings resolved with follow-up verification.",
  },
  {
    label: "Cadence",
    value: "Quarterly",
    detail: "Routine reviews with emergency assessments as needed.",
  },
];

const audits = [
  {
    title: "Rewards engine review",
    partner: "Halberd Security",
    date: "Jan 10, 2026",
    summary: "Verified reward accounting, payout rounding, and withdrawal safety checks.",
  },
  {
    title: "Validator onboarding audit",
    partner: "Northlake Labs",
    date: "Dec 14, 2025",
    summary: "Assessed onboarding flow, delegation authorization, and key management controls.",
  },
  {
    title: "Liquidity router assessment",
    partner: "Signal Forge",
    date: "Nov 2, 2025",
    summary: "Reviewed swap routing, slippage protection, and fallback execution logic.",
  },
  {
    title: "Governance proposal safety",
    partner: "Orbit SecOps",
    date: "Oct 1, 2025",
    summary: "Evaluated proposal validation, quorum calculations, and voting safeguards.",
  },
];

export default function AuditsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Audits</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Security audits and assessments</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Independent reviews and continuous verification for Stakeflow protocol updates.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {summaries.map((summary) => (
            <AuditSummary key={summary.label} {...summary} />
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {audits.map((audit) => (
            <AuditCard key={audit.title} {...audit} />
          ))}
        </section>
      </div>
    </div>
  );
}
