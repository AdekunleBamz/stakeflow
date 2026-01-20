/**
 * Contract interaction utilities
 */

import {
  openContractCall,
  type ContractCallOptions,
} from "@stacks/connect";
import {
  uintCV,
  principalCV,
  contractPrincipalCV,
  listCV,
  noneCV,
  someCV,
  bufferCVFromString,
  standardPrincipalCV,
  type ClarityValue,
} from "@stacks/transactions";
import {
  CONTRACT_ADDRESSES,
  MINT_PRICE,
  UNSTAKE_FEE,
} from "./constants";

/**
 * Build mint NFT transaction options
 */
export function buildMintOptions(): ContractCallOptions {
  const [address, name] = CONTRACT_ADDRESSES.NFT.split(".");
  
  return {
    contractAddress: address,
    contractName: name,
    functionName: "mint",
    functionArgs: [],
    postConditionMode: 0x02, // Allow
    network: "mainnet",
  };
}

/**
 * Build stake NFT transaction options
 */
export function buildStakeOptions(tokenId: number): ContractCallOptions {
  const [address, name] = CONTRACT_ADDRESSES.STAKING.split(".");
  
  return {
    contractAddress: address,
    contractName: name,
    functionName: "stake-nft",
    functionArgs: [uintCV(tokenId)],
    postConditionMode: 0x02,
    network: "mainnet",
  };
}

/**
 * Build unstake NFT transaction options
 */
export function buildUnstakeOptions(tokenId: number): ContractCallOptions {
  const [address, name] = CONTRACT_ADDRESSES.UNSTAKE.split(".");
  
  return {
    contractAddress: address,
    contractName: name,
    functionName: "unstake-nft",
    functionArgs: [uintCV(tokenId)],
    postConditionMode: 0x02,
    network: "mainnet",
  };
}

/**
 * Build claim rewards transaction options
 */
export function buildClaimRewardsOptions(tokenId: number): ContractCallOptions {
  const [address, name] = CONTRACT_ADDRESSES.REWARDS.split(".");
  
  return {
    contractAddress: address,
    contractName: name,
    functionName: "claim-rewards",
    functionArgs: [uintCV(tokenId)],
    postConditionMode: 0x02,
    network: "mainnet",
  };
}

/**
 * Build batch stake transaction options
 */
export function buildBatchStakeOptions(tokenIds: number[]): ContractCallOptions {
  const [address, name] = CONTRACT_ADDRESSES.STAKING.split(".");
  
  return {
    contractAddress: address,
    contractName: name,
    functionName: "stake-multiple",
    functionArgs: [listCV(tokenIds.map((id) => uintCV(id)))],
    postConditionMode: 0x02,
    network: "mainnet",
  };
}

/**
 * Build batch unstake transaction options
 */
export function buildBatchUnstakeOptions(tokenIds: number[]): ContractCallOptions {
  const [address, name] = CONTRACT_ADDRESSES.UNSTAKE.split(".");
  
  return {
    contractAddress: address,
    contractName: name,
    functionName: "unstake-multiple",
    functionArgs: [listCV(tokenIds.map((id) => uintCV(id)))],
    postConditionMode: 0x02,
    network: "mainnet",
  };
}

/**
 * Build transfer NFT transaction options
 */
export function buildTransferOptions(
  tokenId: number,
  sender: string,
  recipient: string
): ContractCallOptions {
  const [address, name] = CONTRACT_ADDRESSES.NFT.split(".");
  
  return {
    contractAddress: address,
    contractName: name,
    functionName: "transfer",
    functionArgs: [
      uintCV(tokenId),
      standardPrincipalCV(sender),
      standardPrincipalCV(recipient),
    ],
    postConditionMode: 0x02,
    network: "mainnet",
  };
}

/**
 * Build transfer token transaction options
 */
export function buildTokenTransferOptions(
  amount: number,
  sender: string,
  recipient: string,
  memo?: string
): ContractCallOptions {
  const [address, name] = CONTRACT_ADDRESSES.TOKEN.split(".");
  
  const args: ClarityValue[] = [
    uintCV(amount),
    standardPrincipalCV(sender),
    standardPrincipalCV(recipient),
  ];
  
  if (memo) {
    args.push(someCV(bufferCVFromString(memo)));
  } else {
    args.push(noneCV());
  }
  
  return {
    contractAddress: address,
    contractName: name,
    functionName: "transfer",
    functionArgs: args,
    postConditionMode: 0x02,
    network: "mainnet",
  };
}

/**
 * Execute a contract call with error handling
 */
export async function executeContractCall(
  options: ContractCallOptions,
  onFinish?: (data: { txId: string }) => void,
  onCancel?: () => void
): Promise<void> {
  try {
    await openContractCall({
      ...options,
      onFinish: (data) => {
        if (onFinish) {
          onFinish({ txId: data.txId });
        }
      },
      onCancel: () => {
        if (onCancel) {
          onCancel();
        }
      },
    });
  } catch (error) {
    console.error("Contract call failed:", error);
    throw error;
  }
}

/**
 * Get explorer URL for a transaction
 */
export function getExplorerTxUrl(txId: string): string {
  return `https://explorer.stacks.co/txid/${txId}?chain=mainnet`;
}

/**
 * Get explorer URL for an address
 */
export function getExplorerAddressUrl(address: string): string {
  return `https://explorer.stacks.co/address/${address}?chain=mainnet`;
}

/**
 * Get explorer URL for a contract
 */
export function getExplorerContractUrl(contractId: string): string {
  return `https://explorer.stacks.co/txid/${contractId}?chain=mainnet`;
}
