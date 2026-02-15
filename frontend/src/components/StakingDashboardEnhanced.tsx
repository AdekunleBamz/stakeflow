"use client";

import React, { useState } from "react";
import { Card, Button, Tabs, TabPanel } from "./ui";
import { NFTGrid } from "./NFTGrid";
import { useWallet } from "@/contexts/WalletContext";
import { useNFTs } from "@/hooks/useNFTs";
import { useContractCall } from "@/hooks/useContractCall";
import { NoNFTsState, NoStakedNFTsState } from "./EmptyState";
import { Spinner } from "./ui/Spinner";

export function StakingDashboardEnhanced() {
  const { address } = useWallet();
  const { nfts, stakedNfts, loading, refetch } = useNFTs(address);
  const { stake, unstake, status } = useContractCall();
  
  const [activeTab, setActiveTab] = useState("available");
  const [selectedToStake, setSelectedToStake] = useState<number[]>([]);
  const [selectedToUnstake, setSelectedToUnstake] = useState<number[]>([]);

  const tabs = [
    { id: "available", label: "Available", count: nfts.length },
    { id: "staked", label: "Staked", count: stakedNfts.length },
  ];

  const toggleStakeSelection = (id: number) => {
    setSelectedToStake((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const toggleUnstakeSelection = (id: number) => {
    setSelectedToUnstake((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  };

  const handleStake = async () => {
    if (selectedToStake.length === 0) return;
    try {
      await stake(selectedToStake);
      setSelectedToStake([]);
      setTimeout(refetch, 5000);
    } catch (error) {
      console.error("Stake error:", error);
    }
  };

  const handleUnstake = async () => {
    if (selectedToUnstake.length === 0) return;
    try {
      await unstake(selectedToUnstake);
      setSelectedToUnstake([]);
      setTimeout(refetch, 5000);
    } catch (error) {
      console.error("Unstake error:", error);
    }
  };

  const selectAllAvailable = () => {
    setSelectedToStake(nfts.map((n) => n.id));
  };

  const selectAllStaked = () => {
    setSelectedToUnstake(stakedNfts.map((n) => n.id));
  };

  if (loading) {
    return (
      <Card className="flex flex-col items-center justify-center py-16 animate-fade-in">
        <Spinner size="lg" />
        <p className="text-gray-400 mt-4 font-medium animate-pulse">Loading your NFTs...</p>
      </Card>
    );
  }

  return (
    <Card padding="none" className="animate-fade-in overflow-hidden border border-gray-700/30">
      <div className="p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-transparent">
        <h2 className="text-3xl font-bold gradient-text mb-1">🎨 Staking Dashboard</h2>
        <p className="text-gray-500 text-sm">Manage your staking positions</p>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="p-6">
        <TabPanel activeTab={activeTab} tabId="available">
          {nfts.length === 0 ? (
            <NoNFTsState />
          ) : (
            <>
              <div className="flex justify-between items-center mb-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
                <div>
                  <p className="text-sm text-gray-400 font-medium">
                    {selectedToStake.length > 0
                      ? `💪 ${selectedToStake.length} selected for staking`
                      : "👉 Select NFTs to stake"}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Total available: {nfts.length} NFTs</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={selectAllAvailable}
                    disabled={nfts.length === 0}
                    className="font-semibold transition-all hover:shadow-lg"
                  >
                    ✓ Select All
                  </Button>
                  {selectedToStake.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedToStake([])}
                      className="font-semibold transition-all hover:shadow-lg"
                    >
                      ✕ Clear
                    </Button>
                  )}
                </div>
              </div>

              <NFTGrid
                nfts={nfts}
                selectedIds={selectedToStake}
                onToggleSelect={toggleStakeSelection}
              />

              <Button
                onClick={handleStake}
                disabled={selectedToStake.length === 0 || status === "pending"}
                loading={status === "pending"}
                className="w-full mt-6 font-semibold text-base transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20"
              >
                🚀 Stake {selectedToStake.length > 0 ? `(${selectedToStake.length})` : "Selected"}
              </Button>
            </>
          )}
        </TabPanel>

        <TabPanel activeTab={activeTab} tabId="staked">
          {stakedNfts.length === 0 ? (
            <NoStakedNFTsState />
          ) : (
            <>
              <div className="flex justify-between items-center mb-6 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
                <div>
                  <p className="text-sm text-gray-400 font-medium">
                    {selectedToUnstake.length > 0
                      ? `💻 ${selectedToUnstake.length} selected for unstaking`
                      : "👉 Select NFTs to unstake"}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">Currently staking: {stakedNfts.length} NFTs</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={selectAllStaked}
                    disabled={stakedNfts.length === 0}
                    className="font-semibold transition-all hover:shadow-lg"
                  >
                    ✓ Select All
                  </Button>
                  {selectedToUnstake.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedToUnstake([])}
                      className="font-semibold transition-all hover:shadow-lg"
                    >
                      ✕ Clear
                    </Button>
                  )}
                </div>
              </div>

              <NFTGrid
                nfts={stakedNfts}
                selectedIds={selectedToUnstake}
                onToggleSelect={toggleUnstakeSelection}
                showRewards
              />

              <Button
                onClick={handleUnstake}
                disabled={selectedToUnstake.length === 0 || status === "pending"}
                loading={status === "pending"}
                variant="secondary"
                className="w-full mt-6 font-semibold text-base transition-all duration-300 hover:shadow-lg hover:shadow-indigo-500/20"
              >
                ↩️ Unstake {selectedToUnstake.length > 0 ? `(${selectedToUnstake.length})` : "Selected"}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-3 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700/30">
                💰 Unstaking fee: <span className="text-yellow-400 font-semibold">0.001 STX</span> per NFT
              </p>
            </>
          )}
        </TabPanel>
      </div>
    </Card>
  );
}
