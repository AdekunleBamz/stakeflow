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
      <Card className="flex items-center justify-center py-12">
        <Spinner size="lg" />
        <p className="text-gray-400 mt-4">Loading your NFTs...</p>
      </Card>
    );
  }

  return (
    <Card padding="none">
      <div className="p-6 border-b border-gray-800">
        <h2 className="text-2xl font-semibold">Staking Dashboard</h2>
      </div>

      <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />

      <div className="p-6">
        <TabPanel activeTab={activeTab} tabId="available">
          {nfts.length === 0 ? (
            <NoNFTsState />
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-400">
                  {selectedToStake.length > 0
                    ? `${selectedToStake.length} selected`
                    : "Select NFTs to stake"}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={selectAllAvailable}
                    disabled={nfts.length === 0}
                  >
                    Select All
                  </Button>
                  {selectedToStake.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedToStake([])}
                    >
                      Clear
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
                className="w-full mt-6"
              >
                Stake {selectedToStake.length > 0 ? `(${selectedToStake.length})` : "Selected"}
              </Button>
            </>
          )}
        </TabPanel>

        <TabPanel activeTab={activeTab} tabId="staked">
          {stakedNfts.length === 0 ? (
            <NoStakedNFTsState />
          ) : (
            <>
              <div className="flex justify-between items-center mb-4">
                <p className="text-gray-400">
                  {selectedToUnstake.length > 0
                    ? `${selectedToUnstake.length} selected`
                    : "Select NFTs to unstake"}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={selectAllStaked}
                    disabled={stakedNfts.length === 0}
                  >
                    Select All
                  </Button>
                  {selectedToUnstake.length > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedToUnstake([])}
                    >
                      Clear
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
                className="w-full mt-6"
              >
                Unstake {selectedToUnstake.length > 0 ? `(${selectedToUnstake.length})` : "Selected"}
              </Button>

              <p className="text-xs text-gray-500 text-center mt-2">
                Unstaking fee: 0.001 STX per NFT
              </p>
            </>
          )}
        </TabPanel>
      </div>
    </Card>
  );
}
