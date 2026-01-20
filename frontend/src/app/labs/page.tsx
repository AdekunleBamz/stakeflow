'use client';

import React from 'react';
import { LabProjectCard } from '@/components/labs/LabProjectCard';
import { LabFocus } from '@/components/labs/LabFocus';

const projects = [
  {
    title: 'Dynamic Reward Multipliers',
    summary: 'Experimenting with time-weighted reward multipliers for long-term stakers.',
    stage: 'Research',
    lead: 'Core Team',
  },
  {
    title: 'Cross-Chain Staking',
    summary: 'Exploring bridges to enable staking from other Bitcoin L2s.',
    stage: 'Concept',
    lead: 'Partnerships',
  },
  {
    title: 'Governance V2',
    summary: 'Enhanced voting mechanisms with delegation and quadratic voting.',
    stage: 'Development',
    lead: 'Protocol',
  },
];

const focuses = [
  {
    title: 'Security First',
    detail: 'All experiments undergo rigorous security audits before mainnet deployment.',
  },
  {
    title: 'Community Driven',
    detail: 'Lab projects are prioritized based on community feedback and governance votes.',
  },
  {
    title: 'Open Source',
    detail: 'All research and code is open source for community review and contribution.',
  },
];

export default function LabsPage() {
  return (
    <div className="min-h-screen bg-slate-950 pb-20 pt-24 text-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-4">
        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-purple-400">Labs</p>
          <h1 className="text-4xl font-semibold md:text-5xl">StakeFlow Labs</h1>
          <p className="max-w-2xl text-lg text-slate-300">
            Experimental features and research projects in development.
          </p>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Active Projects</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <LabProjectCard key={project.title} {...project} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold">Our Focus</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {focuses.map((focus) => (
              <LabFocus key={focus.title} {...focus} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}