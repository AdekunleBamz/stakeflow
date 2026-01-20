'use client';

import Link from 'next/link';

interface NFTDetailProps {
  tokenId: number;
  owner: string;
  isStaked: boolean;
  stakedAt?: number;
  rewards: number;
  metadata: {
    name: string;
    description: string;
    attributes: { trait_type: string; value: string | number }[];
  };
  onStake?: () => void;
  onUnstake?: () => void;
  onClaim?: () => void;
}

export function NFTDetail({
  tokenId,
  owner,
  isStaked,
  stakedAt,
  rewards,
  metadata,
  onStake,
  onUnstake,
  onClaim,
}: NFTDetailProps) {
  const shortenAddress = (addr: string) => `${addr.slice(0, 8)}...${addr.slice(-6)}`;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Image Section */}
      <div className="space-y-4">
        <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl overflow-hidden flex items-center justify-center">
          <span className="text-8xl font-bold text-white/20">#{tokenId}</span>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Token ID</p>
            <p className="text-xl font-bold text-white">#{tokenId}</p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Status</p>
            <p className={`text-xl font-bold ${isStaked ? 'text-green-400' : 'text-gray-400'}`}>
              {isStaked ? 'Staked' : 'Unstaked'}
            </p>
          </div>
          <div className="bg-gray-800/50 rounded-xl p-4 text-center">
            <p className="text-gray-400 text-sm">Rewards</p>
            <p className="text-xl font-bold text-purple-400">{rewards.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Details Section */}
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">{metadata.name}</h1>
          <p className="text-gray-400">{metadata.description}</p>
        </div>

        {/* Owner */}
        <div className="bg-gray-800/50 rounded-xl p-4">
          <p className="text-gray-400 text-sm mb-1">Owner</p>
          <Link
            href={`/profile/${owner}`}
            className="text-purple-400 hover:text-purple-300 font-mono"
          >
            {shortenAddress(owner)}
          </Link>
        </div>

        {/* Staking Info */}
        {isStaked && stakedAt && (
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4">
            <div className="flex items-center gap-2 text-green-400 mb-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="font-medium">Currently Staked</span>
            </div>
            <p className="text-gray-400 text-sm">Staked at block {stakedAt.toLocaleString()}</p>
            <p className="text-white mt-2">
              Pending Rewards: <span className="text-green-400 font-bold">{rewards.toLocaleString()} STF</span>
            </p>
          </div>
        )}

        {/* Attributes */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Attributes</h3>
          <div className="grid grid-cols-2 gap-3">
            {metadata.attributes.map((attr, index) => (
              <div key={index} className="bg-gray-800/50 rounded-xl p-3">
                <p className="text-gray-400 text-xs uppercase tracking-wider">{attr.trait_type}</p>
                <p className="text-white font-medium mt-1">{attr.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          {isStaked ? (
            <>
              {onClaim && rewards > 0 && (
                <button
                  onClick={onClaim}
                  className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
                >
                  Claim {rewards.toLocaleString()} STF
                </button>
              )}
              {onUnstake && (
                <button
                  onClick={onUnstake}
                  className="flex-1 py-3 bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 font-semibold rounded-lg transition-colors"
                >
                  Unstake
                </button>
              )}
            </>
          ) : (
            onStake && (
              <button
                onClick={onStake}
                className="w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold rounded-lg transition-all"
              >
                Stake NFT
              </button>
            )
          )}
        </div>

        {/* Links */}
        <div className="flex gap-4 pt-4 border-t border-gray-800">
          <a
            href={`https://explorer.stacks.co/token/SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-nft-mainnet-v2::stakeflow-nft/${tokenId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-400 hover:text-purple-300 text-sm flex items-center gap-1"
          >
            View on Explorer
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
          <button className="text-gray-400 hover:text-white text-sm flex items-center gap-1">
            Share
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

// NFTAttributes component
interface NFTAttributesProps {
  attributes: { trait_type: string; value: string | number }[];
}

export function NFTAttributes({ attributes }: NFTAttributesProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {attributes.map((attr, index) => (
        <div key={index} className="bg-gray-800/50 rounded-xl p-3">
          <p className="text-gray-400 text-xs uppercase tracking-wider">{attr.trait_type}</p>
          <p className="text-white font-medium mt-1">{attr.value}</p>
        </div>
      ))}
    </div>
  );
}

// NFTStats component
interface NFTStatsProps {
  tokenId: number;
  isStaked: boolean;
  rewards: number;
}

export function NFTStats({ tokenId, isStaked, rewards }: NFTStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-gray-800/50 rounded-xl p-4 text-center">
        <p className="text-gray-400 text-sm">Token ID</p>
        <p className="text-xl font-bold text-white">#{tokenId}</p>
      </div>
      <div className="bg-gray-800/50 rounded-xl p-4 text-center">
        <p className="text-gray-400 text-sm">Status</p>
        <p className={`text-xl font-bold ${isStaked ? 'text-green-400' : 'text-gray-400'}`}>
          {isStaked ? 'Staked' : 'Unstaked'}
        </p>
      </div>
      <div className="bg-gray-800/50 rounded-xl p-4 text-center">
        <p className="text-gray-400 text-sm">Rewards</p>
        <p className="text-xl font-bold text-purple-400">{rewards.toLocaleString()}</p>
      </div>
    </div>
  );
}
