# StakeFlow - NFT Staking on Stacks

StakeFlow is a premier NFT staking platform built on the Stacks blockchain. Mint exclusive NFTs for just 0.001 STX, stake them, and earn STF token rewards.

## Features

- **Low Mint Price**: Mint StakeFlow NFTs for just 0.001 STX each
- **Instant Staking**: Stake your NFTs immediately after minting
- **Continuous Rewards**: Earn ~14.4 STF tokens per day per staked NFT
- **Secure & Transparent**: Built with Clarity smart contracts on Stacks
- **Supports Multiple Wallets**: Compatible with Leather and Xverse wallets

## Technology Stack

### Frontend
- **Framework**: Next.js 14 with React 18
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Blockchain Integration**: Stacks Connect and Stacks Transactions

### Smart Contracts
- **Language**: Clarity
- **Blockchain**: Stacks (Bitcoin Settlement Layer)

## Stacks Blockchain Integration

### @stacks/connect

The `@stacks/connect` package provides wallet connection and transaction signing capabilities. It enables seamless integration with Stacks wallets like Leather and Xverse.

**Key Features:**
- Wallet connection management
- Transaction signing
- Authentication and user sessions
- Network switching (mainnet/testnet)

**Usage Example:**
```typescript
import { showConnect } from '@stacks/connect';

showConnect({
  appDetails: {
    name: 'StakeFlow',
    icon: 'https://stakeflow.app/icon.png',
  },
  redirectTo: '/',
  onFinish: () => {
    window.location.reload();
  },
  userSession: userSession,
});
```

### @stacks/transactions

The `@stacks/transactions` package provides utilities for building, signing, and submitting Clarity contract transactions to the Stacks blockchain.

**Key Features:**
- Contract transaction building
- Transaction signing with private keys or wallets
- Fee estimation
- Transaction broadcasting
- Nonce management

**Usage Example:**
```typescript
import { 
  ContractCallPayload,
  openContractCall,
} from '@stacks/connect';

const mintTx: ContractCallPayload = {
  network: new StacksMainnet(),
  contractAddress: STAKEFLOW_NFT_CONTRACT_ADDRESS,
  contractName: 'stakeflow-nft',
  functionName: 'mint',
  functionArgs: [principalCV(userAddress)],
  onFinish: (data) => {
    console.log('Mint transaction submitted:', data.txId);
  },
};

await openContractCall(mintTx);
```

## Project Structure

```
stakeflow/
├── frontend/              # Next.js frontend application
│   ├── src/
│   │   ├── app/          # App routes and pages
│   │   ├── components/   # Reusable React components
│   │   ├── contexts/     # React Context providers
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   └── types/        # TypeScript type definitions
│   └── package.json      # Frontend dependencies
├── contracts/             # Clarity smart contracts
│   ├── stakeflow-nft.clar
│   ├── stakeflow-token.clar
│   ├── stakeflow-staking.clar
│   ├── stakeflow-rewards.clar
│   └── stakeflow-unstake.clar
├── deployments/          # Deployment configurations
└── tests/                # Contract test suites
```

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Stacks wallet (Leather or Xverse)

### Installation

```bash
# Clone the repository
git clone https://github.com/stakeflow/stakeflow.git
cd stakeflow

# Install dependencies
npm install
cd frontend && npm install
```

### Development

```bash
# Start frontend development server
cd frontend
npm run dev

# Open http://localhost:3000 in your browser
```

### Building

```bash
# Build production frontend
cd frontend
npm run build
npm start
```

## Smart Contract Interaction

### Wallet Connection Flow

1. User clicks "Connect Wallet"
2. `@stacks/connect` displays wallet selection modal
3. User selects Leather or Xverse
4. Wallet handles authentication
5. User session established in app context

### NFT Minting

1. User selects mint amount
2. App constructs contract call using `@stacks/transactions`
3. `@stacks/connect` opens transaction signing dialog
4. Wallet signs transaction
5. Transaction broadcast to Stacks mempool
6. Confirmation shown to user

### Staking Flow

1. User selects NFTs to stake
2. App constructs stake contract call
3. Transaction signed and broadcast
4. Rewards begin accruing immediately

## Environment Variables

Create a `.env.local` file in the `frontend` directory:

```
NEXT_PUBLIC_STACKS_NETWORK=mainnet
NEXT_PUBLIC_API_SERVER=https://api.mainnet.hiro.so
NEXT_PUBLIC_NFT_CONTRACT_ADDRESS=SP...
NEXT_PUBLIC_TOKEN_CONTRACT_ADDRESS=SP...
NEXT_PUBLIC_STAKING_CONTRACT_ADDRESS=SP...
```

## Testing

```bash
# Run contract tests
clarinet test

# Run contract checks
clarinet check
```

## Deployment

### Frontend Deployment
The frontend can be deployed to any Node.js hosting platform:
- Vercel (recommended for Next.js)
- Netlify
- AWS Amplify
- Self-hosted servers

### Smart Contract Deployment
See `deployments/` directory for mainnet and simnet deployment plans.

## API Integration

The frontend integrates with:
- **Stacks Node API**: For blockchain data and transaction status
- **Hiro API**: For block data and smart contract queries
- **Stacks Explorer**: For transaction verification

## Security

- All transactions require wallet signature
- Contract calls validated on-chain
- User keys never exposed to frontend
- Smart contracts audited (see `/audits`)

## Documentation

- [Stacks Documentation](https://docs.stacks.co)
- [Clarity Smart Contract Language](https://docs.stacks.co/clarity)
- [Stacks Connect Documentation](https://docs.stacks.co/build/connect)
- [Stacks Transactions Documentation](https://docs.stacks.co/build/transactions)

## License

All rights reserved. © 2026 StakeFlow

## Support

For issues and questions:
- GitHub Issues: [Report a bug](https://github.com/stakeflow/stakeflow/issues)
- Discord: [Join our community](https://discord.gg/stakeflow)
- Email: support@stakeflow.app
