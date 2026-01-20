'use client';

interface ClaimCardProps {
  amount: number;
  nextClaimIn: string;
  onClaim?: () => void;
}

export function ClaimCard({ amount, nextClaimIn, onClaim }: ClaimCardProps) {
  return (
    <div className="p-6 rounded-2xl bg-gray-900/40 border border-gray-800 space-y-4">
      <div>
        <p className="text-xs uppercase text-gray-500">Claimable Rewards</p>
        <p className="text-3xl font-semibold mt-2 text-green-400">{amount.toLocaleString()} STF</p>
      </div>
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-400">Next claim</span>
        <span className="text-white">{nextClaimIn}</span>
      </div>
      <button
        onClick={onClaim}
        className="w-full py-2.5 rounded-lg bg-purple-600 hover:bg-purple-500 transition-colors"
      >
        Claim rewards
      </button>
    </div>
  );
}
