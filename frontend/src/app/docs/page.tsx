"use client";

import { Card, CardContent } from "@/components/ui";
import { DocStep } from "@/components/docs";

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
        
        <DocStep
          title="1. Connect Your Wallet"
          description={'Click the "Connect Wallet" button in the navigation bar. StakeFlow supports:'}
          bullets={[
            'Leather Wallet - The most popular Stacks wallet',
            'Xverse Wallet - A mobile-friendly alternative',
          ]}
        />

        <DocStep
          title="2. Mint NFTs"
          description={'Each StakeFlow NFT costs only 0.001 STX to mint. You can mint up to 10 NFTs per transaction.'}
          bullets={[
            'Select the number of NFTs to mint',
            'Click "Mint" and confirm the transaction',
            'Wait for confirmation (usually 1-2 minutes)',
          ]}
        />

        <DocStep
          title="3. Stake Your NFTs"
          description={'Once you have NFTs, you can stake them to start earning STF tokens.'}
          bullets={[
            'Select NFTs from your collection',
            'Click "Stake Selected" to batch stake',
            'Start earning rewards immediately',
          ]}
        />

        <DocStep
          title="4. Claim Rewards"
          description={'Your rewards accumulate automatically. Claim them anytime from the Rewards panel.'}
          bullets={[
            'View pending rewards in the Rewards panel',
            'Click "Claim Rewards" to collect',
            'STF tokens will be sent to your wallet',
          ]}
        />
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
