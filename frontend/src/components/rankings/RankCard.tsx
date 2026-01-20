type RankCardProps = {
  rank: number;
  address: string;
  totalStaked: number;
  nftsOwned: number;
  level: number;
  isCurrentUser?: boolean;
};

export function RankCard({ rank, address, totalStaked, nftsOwned, level, isCurrentUser }: RankCardProps) {
  const rankBadge =
    rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `#${rank}`;
  return (
    <div className={`flex items-center gap-4 rounded-xl border p-4 ${isCurrentUser ? "border-purple-500 bg-purple-900/20" : "border-slate-800 bg-slate-900/60"}`}>
      <div className="flex h-10 w-10 items-center justify-center text-xl font-bold">
        {rankBadge}
      </div>
      <div className="flex-1">
        <p className={`font-mono text-sm ${isCurrentUser ? "text-purple-300" : "text-white"}`}>
          {address.slice(0, 6)}...{address.slice(-4)}
        </p>
        <p className="text-xs text-slate-400">Level {level}</p>
      </div>
      <div className="text-right">
        <p className="text-sm font-semibold text-white">{totalStaked.toLocaleString()} STX</p>
        <p className="text-xs text-slate-400">{nftsOwned} NFTs</p>
      </div>
    </div>
  );
}
