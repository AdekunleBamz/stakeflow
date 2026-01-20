'use client';

import React from 'react';
import { StrategyCard } from '@/components/strategy/StrategyCard';
import { StrategyPillar } from '@/components/strategy/StrategyPillar';

const strategies = [
  {
    title: 'Maximize Staking Returns',
    summary: 'Optimize your NFT portfolio for maximum STF token rewards through strategic staking.',
    owner: 'Core Team',
    horizon: 'Long-term',
  },
  {
    title: 'Tier Advancement',
    summary: 'Progress through membership tiers to unlock exclusive benefits and higher APY rates.',
    owner: 'Community',
    horizon: 'Medium-term',
  },
  {
    title: 'Governance Participation',
    summary: 'Actively participate in protocol governance to shape the future of StakeFlow.',
    owner: 'DAO',
    horizon: 'Ongoing',
  },
];

const pillars = [
  {
    title: 'Security',
    detail: 'All strategies prioritize the security of your assets with audited smart contracts.',
  },
  {
    title: 'Transparency',
    detail: 'Clear documentation and on-chain data for all strategic decisions.',
  },
  {
    title: 'Community First',
    detail: 'Strategies are designed to benefit the entire StakeFlow community.',
  },
];

export default function StrategyPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">Strategy</p>
          <h1 className="text-4xl font-semibold md:text-5xl">Staking Strategy</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Learn about our strategic approach to maximizing value for stakers.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Active Strategies</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {strategies.map((strategy) => (
              <StrategyCard key={strategy.title} {...strategy} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Strategic Pillars</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {pillars.map((pillar) => (
              <StrategyPillar key={pillar.title} {...pillar} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}