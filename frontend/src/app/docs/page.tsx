"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export default function DocsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        <span className="gradient-text">Documentation</span>
      </h1>
      <p className="text-gray-400 mb-8">
        Learn how to use StakeFlow and maximize your rewards
      </p>

      {/* Getting Started */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Getting Started</h2>
        
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>1. Connect Your Wallet</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">
              Click the "Connect Wallet" button in the navigation bar. StakeFlow supports:
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li><strong>Leather Wallet</strong> - The most popular Stacks wallet</li>
              <li><strong>Xverse Wallet</strong> - A mobile-friendly alternative</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>2. Mint NFTs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">
              Each StakeFlow NFT costs only 0.001 STX to mint. You can mint up to 10 NFTs per transaction.
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Select the number of NFTs to mint</li>
              <li>Click "Mint" and confirm the transaction</li>
              <li>Wait for confirmation (usually 1-2 minutes)</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-4">
          <CardHeader>
            <CardTitle>3. Stake Your NFTs</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">
              Once you have NFTs, you can stake them to start earning STF tokens.
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>Select NFTs from your collection</li>
              <li>Click "Stake Selected" to batch stake</li>
              <li>Start earning rewards immediately</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>4. Claim Rewards</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-400 mb-4">
              Your rewards accumulate automatically. Claim them anytime from the Rewards panel.
            </p>
            <ul className="list-disc list-inside text-gray-400 space-y-2">
              <li>View pending rewards in the Rewards panel</li>
              <li>Click "Claim Rewards" to collect</li>
              <li>STF tokens will be sent to your wallet</li>
            </ul>
          </CardContent>
        </Card>
      </section>

      {/* Reward Mechanics */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Reward Mechanics</h2>
        
        <Card>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold text-white mb-2">How Rewards Work</h3>
              <p className="text-gray-400">
                Staked NFTs earn 1 STF token for every 10 Stacks blocks. With an average block time of ~10 seconds, this means:
              </p>
            </div>
            
            <div className="bg-gray-800/50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-400 text-sm">Per Hour</p>
                  <p className="font-semibold text-green-400">~0.6 STF</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Per Day</p>
                  <p className="font-semibold text-green-400">~14.4 STF</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Per Week</p>
                  <p className="font-semibold text-green-400">~100.8 STF</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Per Month</p>
                  <p className="font-semibold text-green-400">~432 STF</p>
                </div>
              </div>
            </div>

            <p className="text-gray-500 text-sm">
              * These are estimates based on average block times. Actual rewards may vary.
            </p>
          </CardContent>
        </Card>
      </section>

      {/* Smart Contracts */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Smart Contracts</h2>
        
        <Card>
          <CardContent>
            <p className="text-gray-400 mb-4">
              StakeFlow is powered by Clarity smart contracts on Stacks. All contracts are open source and verifiable.
            </p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-gray-400">NFT Contract</span>
                <code className="text-xs text-purple-400">stakeflow-nft-mainnet</code>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-gray-400">Token Contract</span>
                <code className="text-xs text-purple-400">stakeflow-token-mainnet</code>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-gray-400">Staking Contract</span>
                <code className="text-xs text-purple-400">stakeflow-staking-mainnet</code>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-800">
                <span className="text-gray-400">Rewards Contract</span>
                <code className="text-xs text-purple-400">stakeflow-rewards-mainnet</code>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-gray-400">Unstake Contract</span>
                <code className="text-xs text-purple-400">stakeflow-unstake-mainnet</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
