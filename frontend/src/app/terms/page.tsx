"use client";

import { Card, CardContent } from "@/components/ui";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        Terms of <span className="gradient-text">Service</span>
      </h1>
      <p className="text-gray-400 mb-8">Last updated: January 2026</p>

      <Card>
        <CardContent className="prose prose-invert max-w-none">
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing or using StakeFlow, you agree to be bound by these Terms of Service. 
                If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Description of Service</h2>
              <p>
                StakeFlow is a decentralized NFT staking platform built on the Stacks blockchain. 
                Users can mint NFTs, stake them, and earn STF token rewards. All interactions 
                are facilitated through smart contracts.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. Eligibility</h2>
              <p>
                You must be at least 18 years old and capable of forming a binding contract 
                to use our services. You are responsible for ensuring your use complies with 
                applicable laws in your jurisdiction.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Wallet Responsibility</h2>
              <p>
                You are solely responsible for maintaining the security of your wallet and 
                private keys. We never have access to your funds and cannot recover lost 
                access to your wallet.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Transaction Finality</h2>
              <p>
                All transactions on the blockchain are final and irreversible. This includes 
                minting, staking, unstaking, and claiming rewards. Please verify all 
                transaction details before confirming.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Fees</h2>
              <p className="mb-4">The following fees apply:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Mint Price: 0.001 STX per NFT</li>
                <li>Unstake Fee: 0.001 STX per NFT</li>
                <li>Network Fees: Standard Stacks transaction fees apply</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. No Financial Advice</h2>
              <p>
                Nothing on this platform constitutes financial, investment, or trading advice. 
                The value of NFTs and tokens can fluctuate. You should conduct your own 
                research before participating.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">8. Disclaimer of Warranties</h2>
              <p>
                StakeFlow is provided "as is" without warranties of any kind. We do not 
                guarantee uninterrupted access, error-free operation, or specific results 
                from using the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">9. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, StakeFlow shall not be liable for 
                any indirect, incidental, special, or consequential damages arising from 
                your use of the platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">10. Changes to Terms</h2>
              <p>
                We reserve the right to modify these terms at any time. Continued use of 
                the platform after changes constitutes acceptance of the new terms.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
