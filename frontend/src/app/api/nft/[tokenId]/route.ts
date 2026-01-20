import { NextResponse } from 'next/server';

// API route to fetch NFT metadata
export async function GET(
  request: Request,
  { params }: { params: { tokenId: string } }
) {
  const tokenId = parseInt(params.tokenId, 10);

  if (isNaN(tokenId) || tokenId < 1) {
    return NextResponse.json(
      { error: 'Invalid token ID' },
      { status: 400 }
    );
  }

  // Generate deterministic metadata based on token ID
  const metadata = generateNFTMetadata(tokenId);

  return NextResponse.json(metadata);
}

function generateNFTMetadata(tokenId: number) {
  // Pseudo-random based on tokenId for consistency
  const seed = tokenId * 2654435761;
  const rand = (n: number) => ((seed * n) % 1000) / 1000;

  const backgrounds = ['Cosmic Purple', 'Deep Space', 'Nebula Pink', 'Aurora Green', 'Sunset Orange'];
  const patterns = ['Geometric', 'Organic', 'Circuit', 'Wave', 'Crystalline'];
  const glows = ['Radiant', 'Subtle', 'Pulsing', 'None'];
  const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];

  const bgIndex = Math.floor(rand(1) * backgrounds.length);
  const patternIndex = Math.floor(rand(2) * patterns.length);
  const glowIndex = Math.floor(rand(3) * glows.length);
  
  // Rarity distribution: 50% Common, 25% Uncommon, 15% Rare, 8% Epic, 2% Legendary
  let rarityIndex = 0;
  const rarityRoll = rand(4);
  if (rarityRoll > 0.98) rarityIndex = 4;
  else if (rarityRoll > 0.90) rarityIndex = 3;
  else if (rarityRoll > 0.75) rarityIndex = 2;
  else if (rarityRoll > 0.50) rarityIndex = 1;

  return {
    name: `StakeFlow #${tokenId}`,
    description: `A unique generative NFT from the StakeFlow collection. Token ID: ${tokenId}`,
    image: `https://stakeflow.io/api/nft/${tokenId}/image`,
    external_url: `https://stakeflow.io/nft/${tokenId}`,
    attributes: [
      {
        trait_type: 'Background',
        value: backgrounds[bgIndex],
      },
      {
        trait_type: 'Pattern',
        value: patterns[patternIndex],
      },
      {
        trait_type: 'Glow',
        value: glows[glowIndex],
      },
      {
        trait_type: 'Rarity',
        value: rarities[rarityIndex],
      },
      {
        trait_type: 'Generation',
        value: 'Genesis',
      },
      {
        display_type: 'number',
        trait_type: 'Token ID',
        value: tokenId,
      },
    ],
    properties: {
      category: 'image',
      creators: [
        {
          address: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT',
          share: 100,
        },
      ],
    },
  };
}
