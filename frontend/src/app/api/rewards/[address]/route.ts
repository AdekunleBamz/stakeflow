import { NextResponse } from 'next/server';

interface RewardCalculation {
  tokenId: number;
  stakedAtBlock: number;
  currentBlock: number;
  blocksStaked: number;
  baseReward: number;
  multiplier: number;
  totalReward: number;
}

interface RewardsResponse {
  address: string;
  totalPending: number;
  breakdown: RewardCalculation[];
  estimatedDaily: number;
  estimatedMonthly: number;
}

// Constants
const REWARD_PER_BLOCK = 10; // 10 STF per block per NFT (in micro units)
const BLOCKS_PER_DAY = 144; // ~144 Stacks blocks per day

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  const { address } = params;

  if (!address || !address.startsWith('SP')) {
    return NextResponse.json(
      { error: 'Invalid address' },
      { status: 400 }
    );
  }

  // Generate deterministic mock data based on address
  const hash = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const seed = hash * 2654435761;
  const rand = (n: number) => Math.abs((seed * n) % 1000) / 1000;

  const stakedCount = Math.floor(rand(1) * 10) + 1;
  const currentBlock = 150000;
  
  // Determine tier multiplier
  let multiplier = 1.0;
  if (stakedCount >= 50) multiplier = 3.0;
  else if (stakedCount >= 25) multiplier = 2.0;
  else if (stakedCount >= 10) multiplier = 1.5;
  else if (stakedCount >= 5) multiplier = 1.25;

  const breakdown: RewardCalculation[] = [];
  let totalPending = 0;

  for (let i = 0; i < stakedCount; i++) {
    const tokenId = Math.floor(rand(i + 10) * 1000) + 1;
    const stakedAtBlock = currentBlock - Math.floor(rand(i + 20) * 10000);
    const blocksStaked = currentBlock - stakedAtBlock;
    const baseReward = blocksStaked * REWARD_PER_BLOCK;
    const totalReward = Math.floor(baseReward * multiplier);

    breakdown.push({
      tokenId,
      stakedAtBlock,
      currentBlock,
      blocksStaked,
      baseReward,
      multiplier,
      totalReward,
    });

    totalPending += totalReward;
  }

  const estimatedDaily = stakedCount * BLOCKS_PER_DAY * REWARD_PER_BLOCK * multiplier;
  const estimatedMonthly = estimatedDaily * 30;

  const response: RewardsResponse = {
    address,
    totalPending,
    breakdown,
    estimatedDaily,
    estimatedMonthly,
  };

  return NextResponse.json(response);
}
