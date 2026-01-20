import { TransferRow, TransferStats } from "@/components/transfers";

const transfers = [
  { from: "SP3K8...X4FZ", to: "SP1QR...7HJK", amount: "5,000", asset: "STX", timestamp: "2 mins ago", status: "confirmed" as const },
  { from: "SP2MN...9PLM", to: "SP4WX...3ABC", amount: "1,250", asset: "STF", timestamp: "8 mins ago", status: "pending" as const },
  { from: "SP1QR...7HJK", to: "SP3K8...X4FZ", amount: "12,500", asset: "STX", timestamp: "15 mins ago", status: "confirmed" as const },
  { from: "SP4WX...3ABC", to: "SP2MN...9PLM", amount: "500", asset: "STF", timestamp: "1 hour ago", status: "failed" as const },
  { from: "SP3K8...X4FZ", to: "SP2MN...9PLM", amount: "8,000", asset: "STX", timestamp: "2 hours ago", status: "confirmed" as const },
];

export default function TransfersPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Transfers</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Token transfers</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            View recent STX and STF token transfers across the network.
          </p>
        </header>

        <TransferStats
          totalTransfers={48250}
          volume24h="2.4M STX"
          pendingTransfers={12}
          avgConfirmation="~15 sec"
        />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Recent Transfers</h2>
          {transfers.map((t, i) => (
            <TransferRow key={i} {...t} />
          ))}
        </section>
      </div>
    </div>
  );
}
