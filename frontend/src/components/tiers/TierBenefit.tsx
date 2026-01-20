import React from 'react';

type TierBenefitProps = {
  tier: string;
  benefits: string[];
  stakingRequirement: string;
  nftRequired: boolean;
  color: string;
};

export function TierBenefit({ tier, benefits, stakingRequirement, nftRequired, color }: TierBenefitProps) {
  return (
    <div className={`rounded-xl border border-slate-800 bg-slate-900/60 p-5`}>
      <div className="flex items-center gap-3">
        <div className={`h-4 w-4 rounded-full ${color}`} />
        <h3 className="text-lg font-semibold text-white">{tier}</h3>
      </div>
      <ul className="mt-4 space-y-2">
        {benefits.map((b, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-slate-300">
            <span className="text-emerald-400">✓</span>
            {b}
          </li>
        ))}
      </ul>
      <div className="mt-4 border-t border-slate-700 pt-4 text-sm">
        <p className="text-slate-400">
          Requires: <span className="text-white">{stakingRequirement}</span>
        </p>
        {nftRequired && (
          <p className="mt-1 text-amber-400">+ NFT Required</p>
        )}
      </div>
    </div>
  );
}
