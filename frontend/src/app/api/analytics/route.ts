import { NextResponse } from 'next/server';

export async function GET() {
  const data = {
    totalStaked: 1240,
    totalRewards: 482340,
    activeStakers: 318,
    averageApy: 12.8,
    weeklyRewards: [120, 180, 140, 220, 260, 210, 190],
    stakerGrowth: [80, 110, 140, 160],
    claimRate: 0.84,
    stakedRatio: 0.72,
    updatedAt: new Date().toISOString(),
  };

  return NextResponse.json(data);
}
