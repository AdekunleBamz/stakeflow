import { TreasuryAsset, TreasuryOverview } from "@/components/treasury";

const assets = [
  { asset: "Stacks", symbol: "STX", balance: "2,450,000", usdValue: "$4.9M", allocation: 45 },
  { asset: "StakeFlow Token", symbol: "STF", balance: "12,000,000", usdValue: "$2.4M", allocation: 22 },
  { asset: "Bitcoin", symbol: "BTC", balance: "28.5", usdValue: "$1.7M", allocation: 16 },
  { asset: "USDC", symbol: "USDC", balance: "850,000", usdValue: "$850K", allocation: 8 },
  { asset: "Ethereum", symbol: "ETH", balance: "185", usdValue: "$480K", allocation: 9 },
];

export default function TreasuryPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">Treasury</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Protocol treasury</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            View the protocol's treasury holdings, revenue, and financial runway.
          </p>
        </header>

        <TreasuryOverview
          totalValue="$10.33M"
          monthlyRevenue="$125K"
          monthlyExpenses="$45K"
          runway="18 months"
        />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Treasury Assets</h2>
          {assets.map((a) => (
            <TreasuryAsset key={a.symbol} {...a} />
          ))}
        </section>
      </div>
    </div>
  );
}
