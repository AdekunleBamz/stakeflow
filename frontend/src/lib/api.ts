import { CONTRACTS, API_BASE } from "./constants";

export interface NFTAsset {
  id: number;
  isStaked: boolean;
  stakedAt?: number;
}

export async function fetchUserNFTs(address: string): Promise<NFTAsset[]> {
  try {
    const response = await fetch(
      `${API_BASE}/extended/v1/tokens/nft/holdings?principal=${address}&asset_identifiers=${CONTRACTS.NFT}::stakeflow-nft`
    );
    const data = await response.json();
    
    const nfts: NFTAsset[] = [];
    for (const holding of data.results || []) {
      const tokenId = parseInt(holding.value.repr.replace("u", ""));
      nfts.push({ id: tokenId, isStaked: false });
    }
    return nfts;
  } catch (error) {
    console.error("Error fetching NFTs:", error);
    return [];
  }
}

export async function fetchStakedNFTs(address: string): Promise<NFTAsset[]> {
  // This would need to query the staking contract's data
  // For now, return empty - would need indexer or contract read
  return [];
}

export async function fetchSTFBalance(address: string): Promise<number> {
  try {
    const response = await fetch(
      `${API_BASE}/extended/v1/address/${address}/balances`
    );
    const data = await response.json();
    
    const stfKey = `${CONTRACTS.TOKEN}::stakeflow-token`;
    const balance = data.fungible_tokens?.[stfKey]?.balance || "0";
    return parseInt(balance);
  } catch (error) {
    console.error("Error fetching STF balance:", error);
    return 0;
  }
}

export async function fetchTotalMinted(): Promise<number> {
  try {
    const [contractAddress, contractName] = CONTRACTS.NFT.split(".");
    const response = await fetch(
      `${API_BASE}/v2/contracts/call-read/${contractAddress}/${contractName}/get-last-token-id`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender: contractAddress, arguments: [] }),
      }
    );
    const data = await response.json();
    if (data.okay && data.result) {
      // Parse Clarity response
      const match = data.result.match(/u(\d+)/);
      return match ? parseInt(match[1]) : 0;
    }
    return 0;
  } catch (error) {
    console.error("Error fetching total minted:", error);
    return 0;
  }
}

export async function fetchCurrentBlock(): Promise<number> {
  try {
    const response = await fetch(`${API_BASE}/extended/v1/block?limit=1`);
    const data = await response.json();
    return data.results?.[0]?.height || 0;
  } catch (error) {
    console.error("Error fetching block:", error);
    return 0;
  }
}
