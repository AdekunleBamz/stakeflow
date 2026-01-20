'use client';

interface TopStaker {
  rank: number;
  address: string;
  displayName?: string;
  stakedNFTs: number;
  totalRewards: number;
}

interface TopStakersProps {
  stakers: TopStaker[];
}

export function TopStakers({ stakers }: TopStakersProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stakers.map((staker) => (
        <div
          key={staker.address}
          className="p-5 rounded-2xl bg-gray-900/50 border border-gray-800 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl" />
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-widest text-gray-500">Top #{staker.rank}</span>
            <span className="text-2xl">{staker.rank === 1 ? '🥇' : staker.rank === 2 ? '🥈' : '🥉'}</span>
          </div>
          <h3 className="mt-3 text-white font-semibold truncate">
            {staker.displayName || staker.address}
          </h3>
          <p className="text-xs text-gray-500 truncate">{staker.address}</p>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-gray-400">Staked</span>
            <span className="text-white font-medium">{staker.stakedNFTs} NFTs</span>
          </div>
          <div className="mt-2 flex items-center justify-between text-sm">
            <span className="text-gray-400">Rewards</span>
            <span className="text-green-400 font-medium">{staker.totalRewards.toLocaleString()} STF</span>
          </div>
        </div>
      ))}
    </div>
  );
}
