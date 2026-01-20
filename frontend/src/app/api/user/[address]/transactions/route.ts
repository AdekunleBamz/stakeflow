import { NextResponse } from 'next/server';

interface Transaction {
  id: string;
  type: 'mint' | 'stake' | 'unstake' | 'claim' | 'transfer';
  tokenId?: number;
  amount?: string;
  status: 'pending' | 'confirmed' | 'failed';
  timestamp: string;
  txHash: string;
  blockHeight: number;
}

// Simulate fetching transactions for user
function generateTransactions(address: string, limit: number = 20): Transaction[] {
  const hash = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const types: Transaction['type'][] = ['mint', 'stake', 'unstake', 'claim', 'transfer'];
  const transactions: Transaction[] = [];

  for (let i = 0; i < limit; i++) {
    const seed = (hash + i) * 7919;
    const rand = (n: number) => Math.abs((seed * n) % 1000) / 1000;

    const type = types[Math.floor(rand(1) * types.length)];
    const daysAgo = i * (1 + rand(2) * 2);
    const timestamp = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    const tx: Transaction = {
      id: `tx-${Date.now()}-${i}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      status: rand(3) > 0.05 ? 'confirmed' : 'failed',
      timestamp: timestamp.toISOString(),
      txHash: `0x${Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')}`,
      blockHeight: 150000 - Math.floor(daysAgo * 144),
    };

    if (type === 'mint' || type === 'stake' || type === 'unstake') {
      tx.tokenId = Math.floor(rand(4) * 1000) + 1;
    }

    if (type === 'claim') {
      tx.amount = `${(Math.floor(rand(5) * 5000) + 100).toLocaleString()} STF`;
    }

    if (type === 'transfer') {
      tx.tokenId = Math.floor(rand(6) * 1000) + 1;
    }

    transactions.push(tx);
  }

  return transactions;
}

export async function GET(
  request: Request,
  { params }: { params: { address: string } }
) {
  const { address } = params;
  const { searchParams } = new URL(request.url);
  
  const limit = parseInt(searchParams.get('limit') || '20', 10);
  const type = searchParams.get('type') as Transaction['type'] | null;

  if (!address || !address.startsWith('SP')) {
    return NextResponse.json(
      { error: 'Invalid address' },
      { status: 400 }
    );
  }

  let transactions = generateTransactions(address, Math.min(limit, 100));

  if (type) {
    transactions = transactions.filter(tx => tx.type === type);
  }

  return NextResponse.json({
    address,
    transactions,
    total: transactions.length,
  });
}
