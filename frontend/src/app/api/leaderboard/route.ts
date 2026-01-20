import { NextRequest, NextResponse } from 'next/server';

interface LeaderboardEntry {
  rank: number;
  address: string;
  stakedNFTs: number;
  totalEarned: number;
  currentStreak: number;
  tier: string;
}

// Mock leaderboard data
const leaderboardData: LeaderboardEntry[] = [
  { rank: 1, address: 'SP3FGQ8Z28PT8XBZP57R9N4WZBC1MZJV2BZTP4D', stakedNFTs: 156, totalEarned: 245000, currentStreak: 120, tier: 'Diamond' },
  { rank: 2, address: 'SP2J6Y4CJHY8HWPRT5FGJK9M2E3ABC123DEF456', stakedNFTs: 134, totalEarned: 198000, currentStreak: 95, tier: 'Diamond' },
  { rank: 3, address: 'SP1XY2Z3ABC123DEF456GHI789JKL012MNO345', stakedNFTs: 98, totalEarned: 167000, currentStreak: 87, tier: 'Diamond' },
  { rank: 4, address: 'SP4DEF6GHI789JKL012MNO345PQR678STU901', stakedNFTs: 87, totalEarned: 145000, currentStreak: 62, tier: 'Diamond' },
  { rank: 5, address: 'SP5JKL0MNO456PQR789STU012VWX345YZA678', stakedNFTs: 76, totalEarned: 132000, currentStreak: 54, tier: 'Diamond' },
  { rank: 6, address: 'SP6PQR1STU789VWX012YZA345BCD678EFG901', stakedNFTs: 65, totalEarned: 118000, currentStreak: 48, tier: 'Diamond' },
  { rank: 7, address: 'SP7VWX2YZA012BCD345EFG678HIJ901KLM234', stakedNFTs: 54, totalEarned: 95000, currentStreak: 41, tier: 'Diamond' },
  { rank: 8, address: 'SP8BCD3EFG345HIJ678KLM901NOP234QRS567', stakedNFTs: 48, totalEarned: 87000, currentStreak: 35, tier: 'Platinum' },
  { rank: 9, address: 'SP9HIJ4KLM678NOP901QRS234TUV567WXY890', stakedNFTs: 42, totalEarned: 76000, currentStreak: 28, tier: 'Platinum' },
  { rank: 10, address: 'SP0NOP5QRS901TUV234WXY567ZAB890CDE123', stakedNFTs: 38, totalEarned: 68000, currentStreak: 22, tier: 'Platinum' },
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const sortBy = searchParams.get('sortBy') || 'rank';
    const timeframe = searchParams.get('timeframe') || 'all';

    // Sort the data
    const sortedData = [...leaderboardData].sort((a, b) => {
      switch (sortBy) {
        case 'stakedNFTs':
          return b.stakedNFTs - a.stakedNFTs;
        case 'totalEarned':
          return b.totalEarned - a.totalEarned;
        case 'currentStreak':
          return b.currentStreak - a.currentStreak;
        default:
          return a.rank - b.rank;
      }
    });

    // Paginate
    const startIndex = (page - 1) * limit;
    const paginatedData = sortedData.slice(startIndex, startIndex + limit);

    // Calculate stats
    const stats = {
      totalStakers: 1247,
      totalNFTsStaked: 3891,
      totalRewardsDistributed: 12500000,
      averageStakeTime: 45,
    };

    return NextResponse.json({
      success: true,
      data: {
        entries: paginatedData,
        pagination: {
          page,
          limit,
          total: leaderboardData.length,
          totalPages: Math.ceil(leaderboardData.length / limit),
        },
        stats,
        timeframe,
      },
      timestamp: Date.now(),
    });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
