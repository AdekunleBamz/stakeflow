"use client";

import { useState, useEffect } from "react";
import { useWallet } from "@/contexts/WalletContext";
import { openContractCall } from "@stacks/connect";
import { uintCV, principalCV, listCV } from "@stacks/transactions";
import { CONTRACTS } from "@/lib/constants";
import { fetchUserNFTs, NFTAsset } from "@/lib/api";

export default function StakingDashboard() {
  const { network, address } = useWallet();
  const [nfts, setNfts] = useState<NFTAsset[]>([]);
  const [stakedNfts, setStakedNfts] = useState<NFTAsset[]>([]);
  const [selectedToStake, setSelectedToStake] = useState<number[]>([]);
  const [selectedToUnstake, setSelectedToUnstake] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (address) {
      loadNFTs();
    }
  }, [address]);

  const loadNFTs = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const userNfts = await fetchUserNFTs(address);
      setNfts(userNfts);
      // TODO: Load staked NFTs from staking contract
    } catch (error) {
      console.error("Error loading NFTs:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStake = async () => {
    if (!address || selectedToStake.length === 0) return;

    try {
      const [contractAddress, contractName] = CONTRACTS.STAKING.split(".");
      const nftIds = selectedToStake.map((id) => uintCV(id));

      await openContractCall({
        network,
        contractAddress,
        contractName,
        functionName: "stake-many",
        functionArgs: [listCV(nftIds)],
        postConditionMode: 0x01,
        onFinish: (data) => {
          console.log("Stake transaction:", data);
          alert(`Staking submitted! TX: ${data.txId}`);
          setSelectedToStake([]);
          setTimeout(loadNFTs, 5000);
        },
      });
    } catch (error) {
      console.error("Stake error:", error);
    }
  };

  const handleUnstake = async () => {
    if (!address || selectedToUnstake.length === 0) return;

    try {
      const [contractAddress, contractName] = CONTRACTS.UNSTAKE.split(".");
      const nftIds = selectedToUnstake.map((id) => uintCV(id));

      await openContractCall({
        network,
        contractAddress,
        contractName,
        functionName: "unstake-many",
        functionArgs: [listCV(nftIds)],
        postConditionMode: 0x01,
        onFinish: (data) => {
          console.log("Unstake transaction:", data);
          alert(`Unstaking submitted! TX: ${data.txId}`);
          setSelectedToUnstake([]);
          setTimeout(loadNFTs, 5000);
        },
      });
    } catch (error) {
      console.error("Unstake error:", error);
    }
  };

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

  if (loading) {
    return (
      <div className="card animate-fade-in">
        <h2 className="text-2xl font-semibold mb-4">Your NFTs</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
          <p className="text-gray-400">Loading NFTs...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="card animate-fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-1 gradient-text">Staking Dashboard</h2>
          <p className="text-gray-500 text-sm">Manage your NFT staking positions</p>
        </div>
      </div>

      {/* Unstaked NFTs */}
      <div className="mb-8 p-5 bg-gradient-to-br from-purple-500/10 to-indigo-500/10 rounded-lg border border-purple-500/20">
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
          <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
          Available to Stake 
          <span className="ml-2 px-2 py-1 bg-purple-500/30 rounded text-sm font-mono text-purple-300">{nfts.length}</span>
        </h3>
        {nfts.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No NFTs to stake. Mint some first!</p>
        ) : (
          <>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-4">
              {nfts.map((nft, idx) => (
                <button
                  key={nft.id}
                  onClick={() => toggleStakeSelection(nft.id)}
                  style={{ animationDelay: `${idx * 30}ms` }}
                  className={`aspect-square rounded-lg border-2 flex items-center justify-center text-sm font-bold transition-all duration-200 animate-fade-in ${
                    selectedToStake.includes(nft.id)
                      ? "border-purple-400 bg-purple-500/30 shadow-lg shadow-purple-500/20 scale-105"
                      : "border-gray-700 bg-gray-800/50 hover:border-purple-500/50 hover:bg-gray-800 hover:shadow-lg hover:shadow-purple-500/10"
                  }`}
                >
                  #{nft.id}
                </button>
              ))}
            </div>
            <button
              onClick={handleStake}
              disabled={selectedToStake.length === 0}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
            >
              🚀 Stake {selectedToStake.length > 0 ? `(${selectedToStake.length})` : "Selected"}
            </button>
          </>
        )}
      </div>

      {/* Staked NFTs */}
      <div className="p-5 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg border border-green-500/20">
        <h3 className="text-lg font-semibold mb-4 text-white flex items-center gap-2">
          <span className="w-3 h-3 bg-green-500 rounded-full animate-glow"></span>
          Currently Staked 
          <span className="ml-2 px-2 py-1 bg-green-500/30 rounded text-sm font-mono text-green-300">{stakedNfts.length}</span>
        </h3>
        {stakedNfts.length === 0 ? (
          <p className="text-gray-500 text-center py-4">No NFTs currently staked.</p>
        ) : (
          <>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-4">
              {stakedNfts.map((nft, idx) => (
                <button
                  key={nft.id}
                  onClick={() => toggleUnstakeSelection(nft.id)}
                  style={{ animationDelay: `${idx * 30}ms` }}
                  className={`aspect-square rounded-lg border-2 flex items-center justify-center text-sm font-bold transition-all duration-200 animate-fade-in ${
                    selectedToUnstake.includes(nft.id)
                      ? "border-indigo-400 bg-indigo-500/30 shadow-lg shadow-indigo-500/20 scale-105"
                      : "border-green-700/60 bg-green-900/30 hover:border-green-500/50 hover:bg-green-900/40 hover:shadow-lg hover:shadow-green-500/10"
                  }`}
                >
                  #{nft.id}
                </button>
              ))}
            </div>
            <button
              onClick={handleUnstake}
              disabled={selectedToUnstake.length === 0}
              className="btn-secondary w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
            >
              ↩️ Unstake {selectedToUnstake.length > 0 ? `(${selectedToUnstake.length})` : "Selected"} 
              <span className="text-xs ml-2 text-gray-400">(0.001 STX fee each)</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
