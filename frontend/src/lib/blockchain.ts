// Blockchain helper utilities for StakeFlow

import { CONTRACTS } from './constants';

export function getContractParts(contract: keyof typeof CONTRACTS): {
  address: string;
  name: string;
} {
  const fullContract = CONTRACTS[contract];
  const [address, name] = fullContract.split('.');
  return { address, name };
}

export function getExplorerUrl(type: 'tx' | 'address' | 'contract', value: string): string {
  const baseUrl = 'https://explorer.stacks.co';
  switch (type) {
    case 'tx':
      return `${baseUrl}/txid/${value}?chain=mainnet`;
    case 'address':
      return `${baseUrl}/address/${value}?chain=mainnet`;
    case 'contract':
      return `${baseUrl}/txid/${value}?chain=mainnet`;
    default:
      return baseUrl;
  }
}

export function microToToken(microAmount: number, decimals = 6): number {
  return microAmount / Math.pow(10, decimals);
}

export function tokenToMicro(amount: number, decimals = 6): number {
  return Math.floor(amount * Math.pow(10, decimals));
}

export function microSTXToSTX(microStx: number): number {
  return microStx / 1_000_000;
}

export function stxToMicroSTX(stx: number): number {
  return Math.floor(stx * 1_000_000);
}

export function estimateBlockTime(blocks: number): Date {
  const avgBlockTime = 10 * 60 * 1000; // ~10 minutes in ms
  return new Date(Date.now() + blocks * avgBlockTime);
}

export function blocksUntil(targetDate: Date): number {
  const now = Date.now();
  const target = targetDate.getTime();
  const diffMs = target - now;
  const avgBlockTime = 10 * 60 * 1000;
  return Math.max(0, Math.ceil(diffMs / avgBlockTime));
}

export function calculateAPY(
  rewardsPerBlock: number,
  totalStaked: number,
  tokenPrice = 1
): number {
  if (totalStaked === 0) return 0;
  const blocksPerYear = 52560; // ~365 days * 144 blocks/day
  const yearlyRewards = rewardsPerBlock * blocksPerYear;
  const apy = (yearlyRewards / totalStaked) * 100 * tokenPrice;
  return Math.min(apy, 999.99); // Cap at 999.99%
}

export function calculateRewards(
  stakedBlocks: number,
  rewardsPerBlock: number,
  multiplier = 1
): number {
  return stakedBlocks * rewardsPerBlock * multiplier;
}

export function calculatePenalty(
  rewards: number,
  penaltyPercent: number,
  stakedBlocks: number,
  minBlocks: number
): number {
  if (stakedBlocks >= minBlocks) return 0;
  return Math.floor(rewards * (penaltyPercent / 100));
}

export function getStakingProgress(
  stakedAtBlock: number,
  currentBlock: number,
  minBlocks: number
): number {
  const elapsed = currentBlock - stakedAtBlock;
  return Math.min(100, (elapsed / minBlocks) * 100);
}

export function isEarlyUnstake(
  stakedAtBlock: number,
  currentBlock: number,
  minBlocks: number
): boolean {
  return currentBlock - stakedAtBlock < minBlocks;
}

export async function waitForBlock(targetBlock: number): Promise<void> {
  const checkInterval = 30000; // 30 seconds

  return new Promise((resolve) => {
    const check = async () => {
      try {
        const response = await fetch('https://stacks-node-api.mainnet.stacks.co/v2/info');
        const info = await response.json();
        if (info.stacks_tip_height >= targetBlock) {
          resolve();
        } else {
          setTimeout(check, checkInterval);
        }
      } catch {
        setTimeout(check, checkInterval);
      }
    };
    check();
  });
}
