import { NextRequest, NextResponse } from 'next/server';

interface RewardsData {
  address: string;
  pendingRewards: number;
  claimedRewards: number;
  totalEarned: number;
  currentTier: string;
  multiplier: number;
  lastClaimBlock: number;
  nextMilestone: {
    name: string;
    requiredNFTs: number;
    currentNFTs: number;
  };
}

// Reward tiers
const tiers = [
  { name: 'Bronze', minStaked: 1, multiplier: 1.0 },
  { name: 'Silver', minStaked: 5, multiplier: 1.25 },
  { name: 'Gold', minStaked: 10, multiplier: 1.5 },
  { name: 'Platinum', minStaked: 25, multiplier: 2.0 },
  { name: 'Diamond', minStaked: 50, multiplier: 3.0 },
];

function getTier(stakedCount: number) {
  for (let i = tiers.length - 1; i >= 0; i--) {
    if (stakedCount >= tiers[i].minStaked) {
      return tiers[i];
    }
  }
  return { name: 'None', minStaked: 0, multiplier: 0 };
}

function getNextMilestone(stakedCount: number) {
  for (const tier of tiers) {
    if (stakedCount < tier.minStaked) {
      return {
        name: tier.name,
        requiredNFTs: tier.minStaked,
        currentNFTs: stakedCount,
      };
    }
  }
  return {
    name: 'Max Tier',
    requiredNFTs: tiers[tiers.length - 1].minStaked,
    currentNFTs: stakedCount,
  };
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const address = searchParams.get('address');

    if (!address) {
      return NextResponse.json(
        { error: 'Address parameter is required' },
        { status: 400 }
      );
    }

    // Mock data - in production would query the blockchain
    const stakedCount = 8; // Would come from staking contract
    const tier = getTier(stakedCount);

    const rewardsData: RewardsData = {
      address,
      pendingRewards: 1250,
      claimedRewards: 14170,
      totalEarned: 15420,
      currentTier: tier.name,
      multiplier: tier.multiplier,
      lastClaimBlock: 149500,
      nextMilestone: getNextMilestone(stakedCount),
    };

    return NextResponse.json({
      success: true,
      data: rewardsData,
      tiers,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Error fetching rewards:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch rewards data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { address } = body;

    if (!address) {
      return NextResponse.json(
        { error: 'Address is required' },
        { status: 400 }
      );
    }

    // In production, this would build and return the claim contract call
    return NextResponse.json({
      success: true,
      message: 'Claim action prepared',
      contractCall: {
        contractAddress: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT',
        contractName: 'stakeflow-rewards-mainnet-v3',
        functionName: 'claim-rewards',
        functionArgs: [],
      },
    });
  } catch (error) {
    console.error('Error processing claim:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process claim' },
      { status: 500 }
    );
  }
}
