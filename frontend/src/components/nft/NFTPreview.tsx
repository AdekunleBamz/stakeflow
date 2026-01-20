'use client';

interface NFTPreviewProps {
  tokenId: number;
  size?: 'sm' | 'md' | 'lg';
  showBadge?: boolean;
  isStaked?: boolean;
  onClick?: () => void;
}

export function NFTPreview({
  tokenId,
  size = 'md',
  showBadge = false,
  isStaked = false,
  onClick,
}: NFTPreviewProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const fontSizes = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base',
  };

  return (
    <div
      onClick={onClick}
      className={`relative ${sizeClasses[size]} bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-xl flex items-center justify-center ${onClick ? 'cursor-pointer hover:ring-2 hover:ring-purple-500/50' : ''} transition-all`}
    >
      <span className={`font-bold text-white/40 ${fontSizes[size]}`}>#{tokenId}</span>
      {showBadge && isStaked && (
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </div>
  );
}

interface NFTStackProps {
  tokenIds: number[];
  maxDisplay?: number;
  size?: 'sm' | 'md';
}

export function NFTStack({ tokenIds, maxDisplay = 5, size = 'md' }: NFTStackProps) {
  const displayed = tokenIds.slice(0, maxDisplay);
  const remaining = tokenIds.length - maxDisplay;

  const offsetMultiplier = size === 'sm' ? 12 : 16;

  return (
    <div className="relative flex items-center">
      {displayed.map((tokenId, index) => (
        <div
          key={tokenId}
          className="relative"
          style={{
            marginLeft: index === 0 ? 0 : -offsetMultiplier,
            zIndex: displayed.length - index,
          }}
        >
          <NFTPreview tokenId={tokenId} size={size} />
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={`relative ${size === 'sm' ? 'w-16 h-16' : 'w-24 h-24'} bg-gray-800 rounded-xl flex items-center justify-center border-2 border-gray-700`}
          style={{ marginLeft: -offsetMultiplier, zIndex: 0 }}
        >
          <span className="text-gray-400 font-medium">+{remaining}</span>
        </div>
      )}
    </div>
  );
}

interface NFTMiniCardProps {
  tokenId: number;
  rewards?: number;
  isStaked?: boolean;
  onClick?: () => void;
}

export function NFTMiniCard({ tokenId, rewards, isStaked, onClick }: NFTMiniCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center gap-3 p-3 bg-gray-800/50 rounded-xl ${onClick ? 'cursor-pointer hover:bg-gray-800' : ''} transition-colors`}
    >
      <NFTPreview tokenId={tokenId} size="sm" showBadge isStaked={isStaked} />
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium truncate">NFT #{tokenId}</p>
        {rewards !== undefined && rewards > 0 && (
          <p className="text-green-400 text-sm">+{rewards.toLocaleString()} STF</p>
        )}
      </div>
      {isStaked && (
        <span className="text-green-400 text-xs bg-green-500/20 px-2 py-1 rounded-full">
          Staked
        </span>
      )}
    </div>
  );
}

interface NFTListProps {
  nfts: {
    tokenId: number;
    rewards?: number;
    isStaked?: boolean;
  }[];
  onSelect?: (tokenId: number) => void;
}

export function NFTList({ nfts, onSelect }: NFTListProps) {
  if (nfts.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        No NFTs to display
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {nfts.map((nft) => (
        <NFTMiniCard
          key={nft.tokenId}
          tokenId={nft.tokenId}
          rewards={nft.rewards}
          isStaked={nft.isStaked}
          onClick={onSelect ? () => onSelect(nft.tokenId) : undefined}
        />
      ))}
    </div>
  );
}
