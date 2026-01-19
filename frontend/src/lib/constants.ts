// Contract addresses for mainnet
export const CONTRACTS = {
  TOKEN: "SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-token-mainnet",
  NFT: "SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-nft-mainnet",
  STAKING: "SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-staking-mainnet",
  REWARDS: "SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-rewards-mainnet",
  UNSTAKE: "SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT.stakeflow-unstake-mainnet",
} as const;

export const DEPLOYER = "SP5K2RHMSBH4PAP4PGX77MCVNK1ZEED07CWX9TJT";
export const TREASURY = "SP1ZYBVXD24AG7HNQ9PXB7TBCY2FD4YWT307FRKA3";

// Mint price in microSTX (0.001 STX = 1000 microSTX)
export const MINT_PRICE = 1000;
export const UNSTAKE_FEE = 1000;

// Reward rate: 1 STF per 10 blocks (about 14.4 STF per day per NFT)
export const BLOCKS_PER_REWARD = 10;
export const REWARD_AMOUNT = 1000000; // 1 STF with 6 decimals

export const API_BASE = "https://api.mainnet.hiro.so";
