import { BlockRow, BlockStats } from "@/components/blocks";

const blocks = [
  { height: 145892, hash: "0x7f3a...c4b2", transactions: 42, miner: "SP3K8...X4FZ", timestamp: "Just now", size: "1.2 MB" },
  { height: 145891, hash: "0x8e2b...d5a1", transactions: 38, miner: "SP2MN...9PLM", timestamp: "12 sec ago", size: "1.1 MB" },
  { height: 145890, hash: "0x9d1c...e6f0", transactions: 55, miner: "SP1QR...7HJK", timestamp: "24 sec ago", size: "1.4 MB" },
  { height: 145889, hash: "0xa0e4...f7d9", transactions: 29, miner: "SP4WX...3ABC", timestamp: "36 sec ago", size: "0.9 MB" },
  { height: 145888, hash: "0xb1f5...08c8", transactions: 47, miner: "SP3K8...X4FZ", timestamp: "48 sec ago", size: "1.3 MB" },
];

export default function BlocksPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-400">Blocks</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Blockchain explorer</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Browse recent blocks on the Stacks blockchain.
          </p>
        </header>

        <BlockStats
          currentHeight={145892}
          avgBlockTime="~12 sec"
          totalTransactions="48.2M"
          chainSize="125 GB"
        />

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Latest Blocks</h2>
          {blocks.map((b) => (
            <BlockRow key={b.height} {...b} />
          ))}
        </section>
      </div>
    </div>
  );
}
