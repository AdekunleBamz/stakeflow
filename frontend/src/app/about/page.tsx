'use client';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is StakeFlow?',
    answer: 'StakeFlow is an NFT staking platform built on the Stacks blockchain. Holders can stake their NFTs to earn STF tokens as rewards.',
  },
  {
    question: 'How do I stake my NFTs?',
    answer: 'Connect your wallet, navigate to the staking page, select the NFTs you want to stake, and click the stake button. Your NFTs will be locked in the staking contract.',
  },
  {
    question: 'What are STF tokens?',
    answer: 'STF (StakeFlow Token) is our native SIP-010 token on Stacks. It\'s earned through staking NFTs and can be used for governance and other platform features.',
  },
  {
    question: 'How are rewards calculated?',
    answer: 'Rewards are calculated based on the number of NFTs staked and your reward tier. Higher tiers provide multiplier bonuses on base rewards.',
  },
  {
    question: 'Can I unstake my NFTs anytime?',
    answer: 'Yes, you can unstake your NFTs at any time. However, there may be a cooldown period before your NFTs are returned to your wallet.',
  },
  {
    question: 'What wallets are supported?',
    answer: 'We support all Stacks-compatible wallets including Leather (formerly Hiro) wallet and Xverse.',
  },
];

function TeamMember({ name, role, image }: { name: string; role: string; image: string }) {
  return (
    <div className="text-center">
      <div className="w-32 h-32 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full mx-auto mb-4 flex items-center justify-center">
        <span className="text-4xl font-bold text-white">{name.charAt(0)}</span>
      </div>
      <h3 className="text-lg font-semibold text-white">{name}</h3>
      <p className="text-gray-400">{role}</p>
    </div>
  );
}

function FAQAccordion({ item }: { item: FAQItem }) {
  return (
    <details className="group bg-gray-800/50 rounded-xl overflow-hidden">
      <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
        <h3 className="text-lg font-medium text-white pr-8">{item.question}</h3>
        <svg
          className="w-5 h-5 text-purple-400 transition-transform group-open:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <div className="px-6 pb-6">
        <p className="text-gray-400">{item.answer}</p>
      </div>
    </details>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">About StakeFlow</h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Building the future of NFT utility on Stacks. Stake your NFTs, earn rewards, 
            and be part of a growing community.
          </p>
        </div>

        {/* Mission Section */}
        <section className="mb-16">
          <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
                <p className="text-gray-400 mb-4">
                  StakeFlow was created to give NFT holders real utility for their digital assets. 
                  We believe that NFTs should be more than just collectibles – they should work for you.
                </p>
                <p className="text-gray-400">
                  By building on Stacks and leveraging Bitcoin's security, we provide a secure and 
                  decentralized platform for NFT staking and rewards distribution.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-purple-500/10 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-purple-400">1,000+</p>
                  <p className="text-gray-400 text-sm">NFTs Staked</p>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-purple-400">500+</p>
                  <p className="text-gray-400 text-sm">Active Stakers</p>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-purple-400">5M+</p>
                  <p className="text-gray-400 text-sm">STF Distributed</p>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-6 text-center">
                  <p className="text-3xl font-bold text-purple-400">100%</p>
                  <p className="text-gray-400 text-sm">On-Chain</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { step: '1', title: 'Mint or Buy', desc: 'Get a StakeFlow NFT through minting or secondary markets' },
              { step: '2', title: 'Connect Wallet', desc: 'Connect your Stacks wallet to the platform' },
              { step: '3', title: 'Stake NFTs', desc: 'Lock your NFTs in our staking contract' },
              { step: '4', title: 'Earn Rewards', desc: 'Accumulate STF tokens based on your stake' },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-white">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">Our Team</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <TeamMember name="Alex" role="Founder & Developer" image="" />
            <TeamMember name="Sarah" role="Smart Contracts" image="" />
            <TeamMember name="Mike" role="Community Lead" image="" />
            <TeamMember name="Luna" role="Design & UX" image="" />
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-white text-center mb-8">FAQ</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <FAQAccordion key={index} item={faq} />
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-gray-400 mb-8">Have questions or want to collaborate? Reach out to us!</p>
          <div className="flex justify-center gap-6">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://discord.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-800 hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
            >
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
