"use client";

import { useState } from "react";
import { useWallet } from "@/contexts/WalletContext";
import { openContractCall } from "@stacks/connect";
import { uintCV, listCV } from "@stacks/transactions";
import { CONTRACTS, MINT_PRICE } from "@/lib/constants";

export default function MintSection() {
  const { network, address } = useWallet();
  const [mintAmount, setMintAmount] = useState(1);
  const [isMinting, setIsMinting] = useState(false);

  const handleMint = async () => {
    if (!address) return;

    setIsMinting(true);
    try {
      const [contractAddress, contractName] = CONTRACTS.NFT.split(".");

      if (mintAmount === 1) {
        // Single mint
        await openContractCall({
          network,
          contractAddress,
          contractName,
          functionName: "mint",
          functionArgs: [],
          postConditionMode: 0x01, // Allow
          onFinish: (data) => {
            console.log("Mint transaction:", data);
            alert(`Minting submitted! TX: ${data.txId}`);
          },
          onCancel: () => {
            console.log("User cancelled");
          },
        });
      } else {
        // Batch mint
        const amounts = Array(mintAmount).fill(uintCV(1));
        await openContractCall({
          network,
          contractAddress,
          contractName,
          functionName: "mint-many",
          functionArgs: [listCV(amounts)],
          postConditionMode: 0x01,
          onFinish: (data) => {
            console.log("Batch mint transaction:", data);
            alert(`Minting ${mintAmount} NFTs submitted! TX: ${data.txId}`);
          },
          onCancel: () => {
            console.log("User cancelled");
          },
        });
      }
    } catch (error) {
      console.error("Mint error:", error);
      alert("Minting failed. Please try again.");
    } finally {
      setIsMinting(false);
    }
  };

  const totalCost = (mintAmount * MINT_PRICE / 1000000).toFixed(6);

  return (
    <div className="card">
      <h2 className="text-2xl font-semibold mb-6">Mint NFTs</h2>
      
      <div className="flex items-center justify-center space-x-4 mb-6 px-4 py-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
        <button
          onClick={() => setMintAmount(Math.max(1, mintAmount - 1))}
          className="w-10 h-10 rounded-lg bg-gray-700 hover:bg-gray-600 text-xl font-bold transition-colors duration-200 active:scale-95"
        >
          −
        </button>
        <span className="text-4xl font-bold w-20 text-center text-white">{mintAmount}</span>
        <button
          onClick={() => setMintAmount(Math.min(10, mintAmount + 1))}
          className="w-10 h-10 rounded-lg bg-gray-700 hover:bg-gray-600 text-xl font-bold transition-colors duration-200 active:scale-95"
        >
          +
        </button>
      </div>

      <div className="space-y-3 bg-gray-800/20 rounded-lg p-4 border border-gray-700/30 mb-6">
        <div className="flex justify-between text-gray-400">
          <span className="font-medium">Price per NFT:</span>
          <span className="text-white font-semibold">0.001 STX</span>
        </div>
        <div className="border-t border-gray-700/50 pt-3 flex justify-between text-lg font-bold">
          <span className="text-white">Total Cost:</span>
          <span className="gradient-text text-xl">{totalCost} STX</span>
        </div>
      </div>

      <button
        onClick={handleMint}
        disabled={isMinting}
        className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
      >
        {isMinting ? "Minting..." : `Mint ${mintAmount} NFT${mintAmount > 1 ? "s" : ""}`}
      </button>
    </div>
  );
}
