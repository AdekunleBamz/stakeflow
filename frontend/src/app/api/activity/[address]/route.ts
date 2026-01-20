import { NextResponse } from 'next/server';

const MOCK_ACTIVITY = [
  {
    id: '1',
    type: 'stake',
    title: 'NFT Staked',
    description: 'Staked NFT #231 and #244',
    timestamp: '2m ago',
    amount: 0,
    tokenIds: [231, 244],
  },
  {
    id: '2',
    type: 'claim',
    title: 'Rewards Claimed',
    description: 'Claimed staking rewards',
    timestamp: '1h ago',
    amount: 1240,
  },
  {
    id: '3',
    type: 'mint',
    title: 'NFT Minted',
    description: 'Minted StakeFlow NFT #301',
    timestamp: '1d ago',
    amount: 50,
  },
];

export async function GET() {
  return NextResponse.json({ activity: MOCK_ACTIVITY });
}
