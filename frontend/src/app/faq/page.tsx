"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";

export default function FAQPage() {
  const faqs = [
    {
      question: "What is StakeFlow?",
      answer:
        "StakeFlow is an NFT staking platform built on the Stacks blockchain. Users can mint exclusive NFTs for just 0.001 STX each and stake them to earn STF token rewards.",
    },
    {
      question: "How much does it cost to mint an NFT?",
      answer:
        "Each StakeFlow NFT costs 0.001 STX to mint. This is one of the most affordable NFT mints on the Stacks ecosystem.",
    },
    {
      question: "How do staking rewards work?",
      answer:
        "When you stake your NFTs, they start earning STF tokens automatically. You earn approximately 1 STF per 10 Stacks blocks (roughly every 100 seconds). This translates to about 14.4 STF per day per staked NFT.",
    },
    {
      question: "Is there a fee to unstake?",
      answer:
        "Yes, there is a small fee of 0.001 STX per NFT to unstake. This helps prevent spam and ensures the platform's sustainability.",
    },
    {
      question: "How do I claim my rewards?",
      answer:
        "You can claim your accumulated STF rewards at any time from the Rewards panel. Simply click the 'Claim Rewards' button and confirm the transaction in your wallet.",
    },
    {
      question: "What wallets are supported?",
      answer:
        "StakeFlow supports Leather (formerly Hiro Wallet) and Xverse wallet. Both are popular Stacks wallets that provide a secure way to interact with the platform.",
    },
    {
      question: "What is the maximum NFT supply?",
      answer:
        "The maximum supply of StakeFlow NFTs is 10,000,000. Once all NFTs are minted, no more can be created.",
    },
    {
      question: "Are the smart contracts audited?",
      answer:
        "The smart contracts are written in Clarity, a decidable language that prevents many common smart contract vulnerabilities. All contracts are open source and can be verified on the Stacks blockchain.",
    },
    {
      question: "Can I stake multiple NFTs at once?",
      answer:
        "Yes! You can select multiple NFTs and stake them all in a single transaction using the batch stake feature. This saves on transaction fees.",
    },
    {
      question: "How are rewards calculated?",
      answer:
        "Rewards are calculated based on the number of blocks your NFT has been staked. For every 10 blocks staked, you earn 1 STF token. Rewards accumulate continuously and can be claimed at any time.",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">
        Frequently Asked <span className="gradient-text">Questions</span>
      </h1>
      <p className="text-gray-400 mb-8">
        Everything you need to know about StakeFlow
      </p>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle className="text-lg">{faq.question}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">{faq.answer}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
