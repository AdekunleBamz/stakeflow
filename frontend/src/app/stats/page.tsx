"use client";

import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { StatsGrid } from "@/components/StatsGrid";
import { fetchTotalMinted, fetchCurrentBlock } from "@/lib/api";
import { useStakingStats } from "@/hooks/useStakingStats";

export default function StatsPage() {
  const [totalMinted, setTotalMinted] = useState(0);
  const [currentBlock, setCurrentBlock] = useState(0);
  const { stats, loading } = useStakingStats();

  useEffect(() => {
    const loadStats = async () => {
      const [minted, block] = await Promise.all([
        fetchTotalMinted(),
        fetchCurrentBlock(),
      ]);
      setTotalMinted(minted);
      setCurrentBlock(block);
    };
    loadStats();
  }, []);

  const statsData = [
    { label: "Total NFTs Minted", value: totalMinted },
    { label: "Total NFTs Staked", value: stats.totalStaked },
    { label: "Active Stakers", value: stats.activeStakers },
    { label: "Current Block", value: currentBlock },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8">
        Platform <span className="gradient-text">Statistics</span>
      </h1>

      <StatsGrid stats={statsData} className="mb-8" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Supply Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Max Supply</span>
                <span className="font-medium">10,000,000</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Minted</span>
                <span className="font-medium">{totalMinted.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Remaining</span>
                <span className="font-medium">
                  {(10_000_000 - totalMinted).toLocaleString()}
                </span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                <div
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
                  style={{ width: `${(totalMinted / 10_000_000) * 100}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Staking Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">Staking Rate</span>
                <span className="font-medium">
                  {totalMinted > 0
                    ? ((stats.totalStaked / totalMinted) * 100).toFixed(1)
                    : 0}
                  %
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Reward per 10 blocks</span>
                <span className="font-medium">1 STF</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Daily per NFT</span>
                <span className="font-medium text-green-400">~14.4 STF</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
