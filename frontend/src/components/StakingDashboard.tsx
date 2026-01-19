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
      <div className="card">
        <h2 className="text-2xl font-semibold mb-4">Your NFTs</h2>
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold mb-6">Staking Dashboard</h2>

      {/* Unstaked NFTs */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4 text-gray-300">
          Available to Stake ({nfts.length})
        </h3>
        {nfts.length === 0 ? (
          <p className="text-gray-500">No NFTs to stake. Mint some first!</p>
        ) : (
          <>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-4">
              {nfts.map((nft) => (
                <button
                  key={nft.id}
                  onClick={() => toggleStakeSelection(nft.id)}
                  className={`aspect-square rounded-lg border-2 flex items-center justify-center text-sm font-bold transition-all ${
                    selectedToStake.includes(nft.id)
                      ? "border-purple-500 bg-purple-500/20"
                      : "border-gray-700 bg-gray-800 hover:border-gray-600"
                  }`}
                >
                  #{nft.id}
                </button>
              ))}
            </div>
            <button
              onClick={handleStake}
              disabled={selectedToStake.length === 0}
              className="btn-primary w-full disabled:opacity-50"
            >
              Stake {selectedToStake.length > 0 ? `(${selectedToStake.length})` : "Selected"}
            </button>
          </>
        )}
      </div>

      {/* Staked NFTs */}
      <div>
        <h3 className="text-lg font-medium mb-4 text-gray-300">
          Currently Staked ({stakedNfts.length})
        </h3>
        {stakedNfts.length === 0 ? (
          <p className="text-gray-500">No NFTs currently staked.</p>
        ) : (
          <>
            <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 mb-4">
              {stakedNfts.map((nft) => (
                <button
                  key={nft.id}
                  onClick={() => toggleUnstakeSelection(nft.id)}
                  className={`aspect-square rounded-lg border-2 flex items-center justify-center text-sm font-bold transition-all ${
                    selectedToUnstake.includes(nft.id)
                      ? "border-indigo-500 bg-indigo-500/20"
                      : "border-green-700 bg-green-900/20 hover:border-green-600"
                  }`}
                >
                  #{nft.id}
                </button>
              ))}
            </div>
            <button
              onClick={handleUnstake}
              disabled={selectedToUnstake.length === 0}
              className="btn-secondary w-full disabled:opacity-50"
            >
              Unstake {selectedToUnstake.length > 0 ? `(${selectedToUnstake.length})` : "Selected"} (0.001 STX fee each)
            </button>
          </>
        )}
      </div>
    </div>
  );
}
