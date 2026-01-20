import { NetworkMetric, NetworkStatus } from "@/components/network";

const metrics = [
  { label: "TPS", value: "125", change: "+12% 24h", trend: "up" as const },
  { label: "Gas Price", value: "0.0012 STX", change: "-5% 24h", trend: "down" as const },
  { label: "Active Addresses", value: "45.2K", change: "+8% 7d", trend: "up" as const },
  { label: "Daily Txns", value: "182K", change: "+3% 24h", trend: "up" as const },
];

export default function NetworkPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-teal-400">Network</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Network overview</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Monitor Stacks network health, metrics, and real-time statistics.
          </p>
        </header>

        <NetworkStatus
          chainTip={185420}
          peerCount={128}
          syncStatus="synced"
          lastBlock="12 sec ago"
        />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Network Metrics</h2>
          <div className="grid gap-4 md:grid-cols-4">
            {metrics.map((m) => (
              <NetworkMetric key={m.label} {...m} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
