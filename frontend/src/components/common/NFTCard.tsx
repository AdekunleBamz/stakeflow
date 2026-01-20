'use client';

import Link from 'next/link';

interface NFTCardProps {
  tokenId: number;
  isStaked?: boolean;
  rewards?: number;
  stakedAt?: number;
  onStake?: (tokenId: number) => void;
  onUnstake?: (tokenId: number) => void;
  onClaim?: (tokenId: number) => void;
  imageUrl?: string;
}

export function NFTCard({
  tokenId,
  isStaked = false,
  rewards = 0,
  stakedAt,
  onStake,
  onUnstake,
  onClaim,
  imageUrl,
}: NFTCardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl overflow-hidden group hover:ring-2 hover:ring-purple-500/50 transition-all">
      {/* Image */}
      <div className="relative aspect-square bg-gradient-to-br from-purple-500/20 to-indigo-500/20">
        {imageUrl ? (
          <img src={imageUrl} alt={`NFT #${tokenId}`} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-6xl font-bold text-white/20">#{tokenId}</span>
          </div>
        )}
        
        {/* Status Badge */}
        {isStaked && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded-full">
            Staked
          </div>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Link
            href={`/nft/${tokenId}`}
            className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-lg hover:bg-white/30 transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-white">NFT #{tokenId}</h3>
          {rewards > 0 && (
            <span className="text-green-400 text-sm font-medium">+{rewards.toLocaleString()} STF</span>
          )}
        </div>

        {stakedAt && (
          <p className="text-gray-400 text-sm mb-3">
            Staked at block {stakedAt.toLocaleString()}
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {isStaked ? (
            <>
              {onClaim && rewards > 0 && (
                <button
                  onClick={() => onClaim(tokenId)}
                  className="flex-1 py-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500/30 transition-colors text-sm font-medium"
                >
                  Claim
                </button>
              )}
              {onUnstake && (
                <button
                  onClick={() => onUnstake(tokenId)}
                  className="flex-1 py-2 bg-orange-500/20 text-orange-400 rounded-lg hover:bg-orange-500/30 transition-colors text-sm font-medium"
                >
                  Unstake
                </button>
              )}
            </>
          ) : (
            onStake && (
              <button
                onClick={() => onStake(tokenId)}
                className="w-full py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm font-medium"
              >
                Stake
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}

interface NFTGridProps {
  nfts: {
    tokenId: number;
    isStaked?: boolean;
    rewards?: number;
    stakedAt?: number;
  }[];
  onStake?: (tokenId: number) => void;
  onUnstake?: (tokenId: number) => void;
  onClaim?: (tokenId: number) => void;
  emptyMessage?: string;
}

export function NFTGrid({
  nfts,
  onStake,
  onUnstake,
  onClaim,
  emptyMessage = 'No NFTs found',
}: NFTGridProps) {
  if (nfts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-20 h-20 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-10 h-10 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>
        <p className="text-gray-400">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {nfts.map((nft) => (
        <NFTCard
          key={nft.tokenId}
          tokenId={nft.tokenId}
          isStaked={nft.isStaked}
          rewards={nft.rewards}
          stakedAt={nft.stakedAt}
          onStake={onStake}
          onUnstake={onUnstake}
          onClaim={onClaim}
        />
      ))}
    </div>
  );
}
