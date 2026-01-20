import { BridgeTransfer, BridgeStats } from "@/components/bridge";

const transfers = [
  { txHash: "0x8f4a...e7b1", sourceChain: "Ethereum", destChain: "Stacks", amount: "2.5", asset: "ETH", status: "completed" as const, timestamp: "10 mins ago" },
  { txHash: "0x7c3b...d6f2", sourceChain: "Stacks", destChain: "Bitcoin", amount: "0.15", asset: "BTC", status: "confirming" as const, timestamp: "25 mins ago" },
  { txHash: "0x6d2c...c5e3", sourceChain: "Polygon", destChain: "Stacks", amount: "5,000", asset: "USDC", status: "pending" as const, timestamp: "1 hour ago" },
  { txHash: "0x5e1d...b4d2", sourceChain: "Stacks", destChain: "Ethereum", amount: "10,000", asset: "STX", status: "completed" as const, timestamp: "2 hours ago" },
];

export default function BridgePage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-400">Bridge</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Cross-chain bridge</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Transfer assets securely between Stacks and other blockchains.
          </p>
        </header>

        <BridgeStats
          totalBridged="$12.4M"
          pendingTransfers={3}
          supportedChains={5}
          avgTime="~15 min"
        />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Recent Transfers</h2>
          {transfers.map((t, i) => (
            <BridgeTransfer key={i} {...t} />
          ))}
        </section>
      </div>
    </div>
  );
}
