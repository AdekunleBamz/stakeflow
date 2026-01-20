import { NextRequest, NextResponse } from 'next/server';

interface StakingInfo {
  tokenId: number;
  owner: string;
  stakedAt: number;
  blockHeight: number;
  pendingRewards: number;
  totalEarned: number;
}

// Mock staked NFTs - in production would query the blockchain
const mockStakedNFTs: Record<string, StakingInfo[]> = {
  'SP3FGQ8Z28PT8XBZP57R9N4WZBC1MZJV2BZTP4D': [
    {
      tokenId: 1,
      owner: 'SP3FGQ8Z28PT8XBZP57R9N4WZBC1MZJV2BZTP4D',
      stakedAt: 1704067200,
      blockHeight: 145000,
      pendingRewards: 250,
      totalEarned: 2450,
    },
    {
      tokenId: 42,
      owner: 'SP3FGQ8Z28PT8XBZP57R9N4WZBC1MZJV2BZTP4D',
      stakedAt: 1704153600,
      blockHeight: 145500,
      pendingRewards: 175,
      totalEarned: 1875,
    },
  ],
};

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

    // In production, query the staking contract
    const stakedNFTs = mockStakedNFTs[address] || [];
    
    const totalPendingRewards = stakedNFTs.reduce((sum, nft) => sum + nft.pendingRewards, 0);
    const totalEarned = stakedNFTs.reduce((sum, nft) => sum + nft.totalEarned, 0);

    return NextResponse.json({
      success: true,
      data: {
        address,
        stakedNFTs,
        totalStaked: stakedNFTs.length,
        totalPendingRewards,
        totalEarned,
      },
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Error fetching staking info:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch staking info' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, tokenId, address } = body;

    if (!action || !tokenId || !address) {
      return NextResponse.json(
        { error: 'action, tokenId, and address are required' },
        { status: 400 }
      );
    }

    // In production, this would build and return the contract call parameters
    // For now, return mock response
    const actions = ['stake', 'unstake', 'claim'];
    if (!actions.includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be stake, unstake, or claim' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `${action} action prepared for token ${tokenId}`,
      contractCall: {
        contractAddress: 'SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT',
        contractName: 'stakeflow-staking-mainnet-v3',
        functionName: action === 'claim' ? 'claim-rewards' : action,
        functionArgs: action === 'claim' ? [] : [tokenId],
      },
    });
  } catch (error) {
    console.error('Error processing staking action:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to process action' },
      { status: 500 }
    );
  }
}
