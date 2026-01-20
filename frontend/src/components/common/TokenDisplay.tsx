'use client';

interface TokenDisplayProps {
  amount: number;
  symbol?: string;
  decimals?: number;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSymbol?: boolean;
}

export function TokenDisplay({
  amount,
  symbol = 'STF',
  decimals = 6,
  size = 'md',
  showSymbol = true,
}: TokenDisplayProps) {
  const formattedAmount = (amount / Math.pow(10, decimals)).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-3xl font-bold',
  };

  return (
    <span className={`${sizeClasses[size]} text-white`}>
      {formattedAmount}
      {showSymbol && <span className="text-gray-400 ml-1">{symbol}</span>}
    </span>
  );
}

interface BalanceCardProps {
  label: string;
  amount: number;
  symbol?: string;
  icon?: React.ReactNode;
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function BalanceCard({
  label,
  amount,
  symbol = 'STF',
  icon,
  trend,
  action,
}: BalanceCardProps) {
  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              {icon}
            </div>
          )}
          <span className="text-gray-400">{label}</span>
        </div>
        {trend && (
          <span className={`flex items-center gap-1 text-sm ${
            trend.direction === 'up' ? 'text-green-400' : 'text-red-400'
          }`}>
            {trend.direction === 'up' ? '↑' : '↓'}
            {trend.value}%
          </span>
        )}
      </div>
      <div className="mb-4">
        <TokenDisplay amount={amount} symbol={symbol} size="xl" />
      </div>
      {action && (
        <button
          onClick={action.onClick}
          className="w-full py-2 bg-purple-500/20 text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors font-medium"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}

interface WalletBalancesProps {
  stfBalance: number;
  stxBalance: number;
  pendingRewards: number;
  onClaimRewards?: () => void;
}

export function WalletBalances({
  stfBalance,
  stxBalance,
  pendingRewards,
  onClaimRewards,
}: WalletBalancesProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <BalanceCard
        label="STF Balance"
        amount={stfBalance}
        symbol="STF"
        icon={
          <svg className="w-5 h-5 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11a1 1 0 11-2 0V9a1 1 0 112 0v4zm0-6a1 1 0 11-2 0 1 1 0 012 0z" />
          </svg>
        }
      />
      <BalanceCard
        label="STX Balance"
        amount={stxBalance}
        symbol="STX"
        icon={
          <svg className="w-5 h-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm3 2a1 1 0 011 1v1a1 1 0 01-2 0V7a1 1 0 011-1zm4 0a1 1 0 011 1v1a1 1 0 01-2 0V7a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
        }
      />
      <BalanceCard
        label="Pending Rewards"
        amount={pendingRewards}
        symbol="STF"
        icon={
          <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 2a2 2 0 00-2 2v14l3.5-2 3.5 2 3.5-2 3.5 2V4a2 2 0 00-2-2H5zm2.5 3a1.5 1.5 0 100 3 1.5 1.5 0 000-3zm6.207.293a1 1 0 00-1.414 0l-6 6a1 1 0 101.414 1.414l6-6a1 1 0 000-1.414zM12.5 10a1.5 1.5 0 100 3 1.5 1.5 0 000-3z" clipRule="evenodd" />
          </svg>
        }
        action={
          pendingRewards > 0 && onClaimRewards
            ? { label: 'Claim Rewards', onClick: onClaimRewards }
            : undefined
        }
      />
    </div>
  );
}
