import { NextResponse } from 'next/server';

// Contract addresses
const CONTRACTS = {
  TOKEN: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-token-mainnet',
  NFT: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-nft-mainnet-v2',
  STAKING: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-staking-mainnet-v3',
  REWARDS: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-rewards-mainnet-v3',
};

// Platform statistics
interface PlatformStats {
  totalNFTsMinted: number;
  totalNFTsStaked: number;
  totalStakers: number;
  totalRewardsDistributed: number;
  currentBlockHeight: number;
  rewardRate: number;
}

export async function GET() {
  try {
    // In production, these would be fetched from the blockchain
    const stats: PlatformStats = {
      totalNFTsMinted: 1500,
      totalNFTsStaked: 1247,
      totalStakers: 523,
      totalRewardsDistributed: 12500000,
      currentBlockHeight: 150000,
      rewardRate: 25, // STF per block per NFT
    };

    return NextResponse.json({
      success: true,
      data: stats,
      contracts: CONTRACTS,
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch platform stats' },
      { status: 500 }
    );
  }
}
