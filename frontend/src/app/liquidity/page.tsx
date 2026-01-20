import { LiquidityPool, LiquidityStats } from "@/components/liquidity";

const pools = [
  { pair: "STX / STF", tvl: "$2.4M", apr: "18.5%", volume24h: "$125K", myShare: "$5,200" },
  { pair: "STX / USDC", tvl: "$1.8M", apr: "12.2%", volume24h: "$98K", myShare: "$0" },
  { pair: "STF / USDC", tvl: "$850K", apr: "24.8%", volume24h: "$45K", myShare: "$1,800" },
  { pair: "STX / BTC", tvl: "$3.2M", apr: "8.5%", volume24h: "$210K", myShare: "$0" },
];

export default function LiquidityPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Liquidity</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Liquidity pools</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Provide liquidity to earn trading fees and additional rewards.
          </p>
        </header>

        <LiquidityStats
          totalLiquidity="$8.25M"
          activePools={4}
          yourPositions="$7,000"
          feesEarned="$342"
        />

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Available Pools</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {pools.map((p) => (
              <LiquidityPool key={p.pair} {...p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
