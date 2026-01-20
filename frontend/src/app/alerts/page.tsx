import { AlertRow, AlertStats } from "@/components/alerts";

const alerts = [
  { title: "Reward claimed successfully", message: "You claimed 245 STF from NFT #1042.", type: "success" as const, timestamp: "2 hours ago", read: false },
  { title: "Validator downtime detected", message: "Stakeflow Prime experienced 12 minutes of downtime.", type: "warning" as const, timestamp: "5 hours ago", read: false },
  { title: "Unstaking complete", message: "Your 15,000 STX unstaking request is ready to claim.", type: "info" as const, timestamp: "1 day ago", read: true },
  { title: "Failed transaction", message: "Staking transaction failed due to insufficient funds.", type: "error" as const, timestamp: "2 days ago", read: true },
  { title: "New pool available", message: "High Yield Pool is now accepting delegations.", type: "info" as const, timestamp: "3 days ago", read: true },
];

export default function AlertsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Alerts</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Notifications</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Stay informed about your staking activity, validator updates, and important events.
          </p>
        </header>

        <AlertStats total={42} unread={2} warnings={5} errors={1} />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Recent Alerts</h2>
          {alerts.map((a, i) => (
            <AlertRow key={i} {...a} />
          ))}
        </section>
      </div>
    </div>
  );
}
