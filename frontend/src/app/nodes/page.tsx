import { NodeRow, NodeStats } from "@/components/nodes";

const nodes = [
  { name: "stacks-node-us-east", region: "US East (Virginia)", latency: 12, uptime: 99.98, status: "online" as const, version: "2.5.0" },
  { name: "stacks-node-eu-west", region: "EU West (Ireland)", latency: 45, uptime: 99.95, status: "online" as const, version: "2.5.0" },
  { name: "stacks-node-asia", region: "Asia Pacific (Tokyo)", latency: 89, uptime: 99.89, status: "syncing" as const, version: "2.4.9" },
  { name: "stacks-node-us-west", region: "US West (Oregon)", latency: 28, uptime: 99.92, status: "online" as const, version: "2.5.0" },
  { name: "stacks-node-backup", region: "US Central (Texas)", latency: 0, uptime: 95.50, status: "offline" as const, version: "2.4.8" },
];

export default function NodesPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Nodes</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Network nodes</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Monitor the health and performance of StakeFlow infrastructure nodes.
          </p>
        </header>

        <NodeStats
          totalNodes={12}
          onlineNodes={10}
          avgLatency="34ms"
          globalUptime="99.87%"
        />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Node Status</h2>
          {nodes.map((n) => (
            <NodeRow key={n.name} {...n} />
          ))}
        </section>
      </div>
    </div>
  );
}
