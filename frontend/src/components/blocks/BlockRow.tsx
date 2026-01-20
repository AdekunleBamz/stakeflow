type BlockRowProps = {
  height: number;
  hash: string;
  transactions: number;
  miner: string;
  timestamp: string;
  size: string;
};

export function BlockRow({ height, hash, transactions, miner, timestamp, size }: BlockRowProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div className="flex items-center gap-4">
        <div className="flex h-10 w-16 items-center justify-center rounded-lg bg-indigo-500/20 text-sm font-bold text-indigo-400">
          #{height}
        </div>
        <div>
          <p className="font-mono text-sm text-white">{hash}</p>
          <p className="mt-0.5 text-xs text-slate-400">Mined by {miner}</p>
        </div>
      </div>
      <div className="flex items-center gap-6 text-sm">
        <span className="text-slate-300">{transactions} txns</span>
        <span className="text-slate-400">{size}</span>
        <span className="text-slate-500">{timestamp}</span>
      </div>
    </div>
  );
}
