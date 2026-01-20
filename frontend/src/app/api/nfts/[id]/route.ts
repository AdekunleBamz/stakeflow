import { NextRequest, NextResponse } from 'next/server';

interface NFTMetadata {
  id: number;
  name: string;
  description: string;
  image: string;
  attributes: Array<{
    trait_type: string;
    value: string;
  }>;
  external_url: string;
  background_color: string;
}

// Generate metadata for NFT
function generateNFTMetadata(tokenId: number): NFTMetadata {
  const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
  const backgrounds = ['Cosmic Purple', 'Deep Ocean', 'Sunset Orange', 'Forest Green', 'Midnight Black'];
  const patterns = ['Flow Lines', 'Waves', 'Circles', 'Geometric', 'Abstract'];
  const effects = ['None', 'Glow', 'Shimmer', 'Pulse', 'Aurora'];

  // Deterministic selection based on token ID
  const rarityIndex = tokenId % rarities.length;
  const bgIndex = (tokenId * 3) % backgrounds.length;
  const patternIndex = (tokenId * 7) % patterns.length;
  const effectIndex = (tokenId * 11) % effects.length;

  return {
    id: tokenId,
    name: `StakeFlow Genesis #${tokenId}`,
    description: `StakeFlow Genesis NFT #${tokenId}. Stake to earn STF tokens. Part of the StakeFlow ecosystem on Stacks.`,
    image: `https://stakeflow.io/api/nfts/${tokenId}/image`,
    attributes: [
      { trait_type: 'Rarity', value: rarities[rarityIndex] },
      { trait_type: 'Background', value: backgrounds[bgIndex] },
      { trait_type: 'Pattern', value: patterns[patternIndex] },
      { trait_type: 'Effect', value: effects[effectIndex] },
      { trait_type: 'Collection', value: 'Genesis' },
    ],
    external_url: `https://stakeflow.io/nft/${tokenId}`,
    background_color: '1a1a2e',
  };
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const tokenId = parseInt(id, 10);

    if (isNaN(tokenId) || tokenId < 1) {
      return NextResponse.json(
        { error: 'Invalid token ID' },
        { status: 400 }
      );
    }

    const metadata = generateNFTMetadata(tokenId);

    return NextResponse.json(metadata);
  } catch (error) {
    console.error('Error generating NFT metadata:', error);
    return NextResponse.json(
      { error: 'Failed to generate metadata' },
      { status: 500 }
    );
  }
}
