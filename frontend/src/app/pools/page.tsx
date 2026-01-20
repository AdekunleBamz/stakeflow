import { PoolCard, PoolOverview } from "@/components/pools";

const pools = [
  { name: "Genesis Pool", tvl: "12.4M STX", apy: "9.2%", participants: 4280, minStake: "100 STX" },
  { name: "High Yield Pool", tvl: "8.7M STX", apy: "11.5%", participants: 2150, minStake: "1,000 STX" },
  { name: "Flexible Pool", tvl: "5.2M STX", apy: "6.8%", participants: 8420, minStake: "10 STX" },
  { name: "Whale Pool", tvl: "22.1M STX", apy: "8.4%", participants: 89, minStake: "100,000 STX" },
  { name: "Community Pool", tvl: "3.8M STX", apy: "7.5%", participants: 12500, minStake: "1 STX" },
];

export default function PoolsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Pools</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Staking pools</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Browse available staking pools with different risk profiles, APY rates, and minimum requirements.
          </p>
        </header>

        <PoolOverview
          totalPools={5}
          totalTvl="52.2M STX"
          avgApy="8.68%"
          totalStakers={27439}
        />

        <section className="grid gap-4 md:grid-cols-2">
          {pools.map((p) => (
            <PoolCard key={p.name} {...p} />
          ))}
        </section>
      </div>
    </div>
  );
}
