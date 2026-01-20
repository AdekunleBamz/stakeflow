'use client';

import { TrendCard } from './TrendCard';

interface AnalyticsOverviewProps {
  totalStaked: number;
  totalRewards: number;
  activeStakers: number;
  averageApy: number;
}

export function AnalyticsOverview({ totalStaked, totalRewards, activeStakers, averageApy }: AnalyticsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <TrendCard
        title="Total Staked"
        value={`${totalStaked} NFTs`}
        trend="up"
        change="+6%"
        description="Last 7 days"
      />
      <TrendCard
        title="Rewards Distributed"
        value={`${totalRewards.toLocaleString()} STF`}
        trend="up"
        change="+3%"
        description="Weekly total"
      />
      <TrendCard
        title="Active Stakers"
        value={activeStakers.toString()}
        trend="neutral"
        change="0%"
        description="30 day average"
      />
      <TrendCard
        title="Average APY"
        value={`${averageApy}%`}
        trend="up"
        change="+0.4%"
        description="Protocol average"
      />
    </div>
  );
}
