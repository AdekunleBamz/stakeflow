type ReferralRowProps = {
  wallet: string;
  joinedAt: string;
  staked: string;
  reward: string;
};

export function ReferralRow({ wallet, joinedAt, staked, reward }: ReferralRowProps) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <div>
        <p className="font-mono text-sm text-white">{wallet}</p>
        <p className="text-xs text-slate-400">Joined {joinedAt}</p>
      </div>
      <div className="text-right">
        <p className="text-sm text-slate-300">Staked {staked}</p>
        <p className="text-sm font-semibold text-emerald-400">+{reward}</p>
      </div>
    </div>
  );
}
