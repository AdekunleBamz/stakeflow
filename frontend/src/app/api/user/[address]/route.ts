import { NextResponse } from 'next/server';

interface UserStats {
  address: string;
  ownedNFTs: number[];
  stakedNFTs: number[];
  pendingRewards: number;
  totalEarned: number;
  stakingStreak: number;
  tier: string;
  multiplier: number;
  joinedAt: string;
}

// Simulate fetching user data from blockchain
async function fetchUserData(address: string): Promise<UserStats | null> {
  // Validate address format (basic check)
  if (!address || !address.startsWith('SP') || address.length < 30) {
    return null;
  }

  // Generate deterministic data based on address hash
  const hash = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seed = hash * 2654435761;
  const rand = (n: number) => Math.abs((seed * n) % 1000) / 1000;

  const ownedCount = Math.floor(rand(1) * 20) + 1;
  const stakedCount = Math.floor(ownedCount * (0.5 + rand(2) * 0.5));

  const ownedNFTs = Array.from({ length: ownedCount }, (_, i) => 
    Math.floor(rand(i + 10) * 1000) + 1
  );
  const stakedNFTs = ownedNFTs.slice(0, stakedCount);

  const stakingStreak = Math.floor(rand(3) * 90);
  const totalEarned = stakedCount * 250 * stakingStreak;
  const pendingRewards = stakedCount * 250 * (Math.floor(rand(4) * 7) + 1);

  // Determine tier based on staked count
  let tier = 'Bronze';
  let multiplier = 1.0;
  if (stakedCount >= 50) { tier = 'Diamond'; multiplier = 3.0; }
  else if (stakedCount >= 25) { tier = 'Platinum'; multiplier = 2.0; }
  else if (stakedCount >= 10) { tier = 'Gold'; multiplier = 1.5; }
  else if (stakedCount >= 5) { tier = 'Silver'; multiplier = 1.25; }

  return {
    address,
    ownedNFTs,
    stakedNFTs,
    pendingRewards,
    totalEarned,
    stakingStreak,
    tier,
    multiplier,
    joinedAt: new Date(Date.now() - stakingStreak * 24 * 60 * 60 * 1000).toISOString(),
  };
}

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  const { address } = params;

  try {
    const userData = await fetchUserData(address);

    if (!userData) {
      return NextResponse.json(
        { error: 'User not found or invalid address' },
        { status: 404 }
      );
    }

    return NextResponse.json(userData);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user data' },
      { status: 500 }
    );
  }
}
