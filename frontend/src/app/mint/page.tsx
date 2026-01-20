import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mint NFT | StakeFlow",
  description: "Mint your StakeFlow NFT and start earning STF rewards",
};

export default function MintPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">
            Mint Your StakeFlow NFT
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join the StakeFlow ecosystem by minting an NFT and start earning STF rewards through staking
          </p>
        </div>

        <div className="bg-gray-800/50 rounded-2xl border border-gray-700 overflow-hidden">
          <div className="p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-1">
                <div className="aspect-square bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎨</div>
                    <div className="text-white font-semibold">StakeFlow NFT</div>
                    <div className="text-purple-200 text-sm">Preview</div>
                  </div>
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    StakeFlow Collection
                  </h2>
                  <p className="text-gray-400">
                    A unique NFT that grants you access to staking rewards in the StakeFlow ecosystem.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Price</span>
                    <span className="text-white font-medium">0.001 STX</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Total Supply</span>
                    <span className="text-white font-medium">10,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Minted</span>
                    <span className="text-white font-medium">1,234 / 10,000</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Remaining</span>
                    <span className="text-green-400 font-medium">8,766</span>
                  </div>
                </div>

                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                    style={{ width: "12.34%" }}
                  />
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="text-purple-400 text-xl">✨</div>
                    <div>
                      <h3 className="text-purple-300 font-medium">Staking Benefits</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        Stake your NFT to earn 1 STF token every 10 blocks. 
                        The longer you stake, the more you earn!
                      </p>
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02]">
                  Mint NFT
                </button>

                <p className="text-center text-xs text-gray-500">
                  By minting, you agree to our terms of service
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon="🔒"
            title="Secure"
            description="Smart contracts audited and verified on the Stacks blockchain"
          />
          <FeatureCard
            icon="💰"
            title="Earn Rewards"
            description="Stake your NFT to earn STF tokens passively"
          />
          <FeatureCard
            icon="⚡"
            title="Instant"
            description="Mint and start staking immediately after purchase"
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gray-800/30 rounded-xl p-6 border border-gray-700/50">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}
