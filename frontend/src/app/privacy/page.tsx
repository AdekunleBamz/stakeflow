"use client";

import { Card, CardContent } from "@/components/ui";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        Privacy <span className="gradient-text">Policy</span>
      </h1>
      <p className="text-gray-400 mb-8">Last updated: January 2026</p>

      <Card>
        <CardContent className="prose prose-invert max-w-none">
          <div className="space-y-8 text-gray-300">
            <section>
              <h2 className="text-xl font-semibold text-white mb-4">1. Introduction</h2>
              <p>
                StakeFlow ("we", "our", or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, and safeguard your information 
                when you use our NFT staking platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">2. Information We Collect</h2>
              <p className="mb-4">We collect the following types of information:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Wallet Addresses:</strong> When you connect your wallet, we receive your public wallet address.</li>
                <li><strong>Transaction Data:</strong> All transactions are recorded on the public Stacks blockchain.</li>
                <li><strong>Usage Data:</strong> We may collect anonymous analytics about how you use our platform.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use the collected information to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Provide and maintain our staking services</li>
                <li>Process your staking and reward transactions</li>
                <li>Improve our platform and user experience</li>
                <li>Communicate important updates</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">4. Blockchain Data</h2>
              <p>
                Please note that all transactions on the Stacks blockchain are public and immutable. 
                This includes minting, staking, unstaking, and claiming rewards. We cannot delete 
                or modify blockchain data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">5. Data Security</h2>
              <p>
                We implement appropriate security measures to protect your information. 
                However, we never have access to your private keys or seed phrases. 
                All transactions require your explicit approval through your wallet.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">6. Third-Party Services</h2>
              <p>
                Our platform integrates with third-party wallet providers (Leather, Xverse). 
                These services have their own privacy policies that govern their use of your data.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-white mb-4">7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us through 
                our official Discord or Twitter channels.
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
