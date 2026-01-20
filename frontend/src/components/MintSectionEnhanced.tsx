"use client";

import React, { useState } from "react";
import { Button, NumberInput } from "./ui";
import { useWallet } from "@/contexts/WalletContext";
import { useContractCall } from "@/hooks/useContractCall";
import { MINT_PRICE } from "@/lib/constants";

export function MintSectionEnhanced() {
  const { address } = useWallet();
  const { mint, status, txId } = useContractCall();
  const [mintAmount, setMintAmount] = useState(1);

  const handleMint = async () => {
    try {
      await mint(mintAmount);
    } catch (error) {
      console.error("Mint error:", error);
    }
  };

  const totalCost = (mintAmount * MINT_PRICE) / 1_000_000;
  const isMinting = status === "pending";

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-xl p-6">
      <h2 className="text-2xl font-semibold mb-6">Mint NFTs</h2>

      <div className="flex flex-col md:flex-row md:items-end gap-6">
        <NumberInput
          value={mintAmount}
          onChange={setMintAmount}
          min={1}
          max={10}
          label="Amount"
          className="flex-shrink-0"
        />

        <div className="flex-1 space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price per NFT</span>
            <span className="text-white">0.001 STX</span>
          </div>
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-white">Total</span>
            <span className="gradient-text">{totalCost.toFixed(3)} STX</span>
          </div>
        </div>

        <Button
          onClick={handleMint}
          disabled={!address || isMinting}
          loading={isMinting}
          className="md:w-40"
        >
          {isMinting ? "Minting..." : "Mint"}
        </Button>
      </div>

      {txId && status === "success" && (
        <div className="mt-4 p-3 bg-green-900/20 border border-green-800 rounded-lg">
          <p className="text-sm text-green-400">
            Transaction submitted!{" "}
            <a
              href={`https://explorer.stacks.co/txid/${txId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-green-300"
            >
              View on Explorer
            </a>
          </p>
        </div>
      )}

      <div className="mt-6 pt-6 border-t border-gray-800">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <p className="text-gray-400 text-xs">Max per TX</p>
            <p className="font-semibold">10</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Total Supply</p>
            <p className="font-semibold">10M</p>
          </div>
          <div>
            <p className="text-gray-400 text-xs">Rewards</p>
            <p className="font-semibold text-green-400">~14.4/day</p>
          </div>
        </div>
      </div>
    </div>
  );
}
