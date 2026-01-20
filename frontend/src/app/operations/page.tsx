import { OpsMetric, OpsPlaybookCard } from "@/components/operations";

const metrics = [
  {
    label: "Response time",
    value: "4 min",
    detail: "Average response for validator alerts and reward anomalies.",
  },
  {
    label: "Coverage",
    value: "24/7",
    detail: "Ops rotation with handoffs across regions.",
  },
  {
    label: "Automation",
    value: "78%",
    detail: "Incidents resolved via automated runbooks.",
  },
];

const playbooks = [
  {
    title: "Validator incident response",
    summary: "Automated failover, delegation shift, and downstream notification sequence.",
    owner: "Ops Desk",
    cadence: "On demand",
  },
  {
    title: "Rewards anomaly triage",
    summary: "Investigate reward gaps, route escalation, and patch payout schedule.",
    owner: "Protocol Ops",
    cadence: "Weekly",
  },
  {
    title: "Liquidity pressure plan",
    summary: "Monitor exit queues, rebalance liquidity pools, and adjust routing.",
    owner: "Market Ops",
    cadence: "Daily",
  },
  {
    title: "Governance execution",
    summary: "Coordinate votes, run simulations, and validate proposal impacts.",
    owner: "Governance",
    cadence: "Per cycle",
  },
];

export default function OperationsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Operations</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Runbooks and operations coverage</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Operational playbooks, metrics, and incident readiness for Stakeflow protocol.
          </p>
        </header>

        <section className="grid gap-4 md:grid-cols-3">
          {metrics.map((metric) => (
            <OpsMetric key={metric.label} {...metric} />
          ))}
        </section>

        <section className="grid gap-6 md:grid-cols-2">
          {playbooks.map((playbook) => (
            <OpsPlaybookCard key={playbook.title} {...playbook} />
          ))}
        </section>
      </div>
    </div>
  );
}
