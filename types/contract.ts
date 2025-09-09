export interface NFTContractData {
  availableTokens: number;
  remainingTokens: number;
  usdcBalance: number;
  price: number;
  maxSupply: number;
  maxTokensPerWallet: number;
  userNFTBalance: number;
}

export interface MintStatus {
  status: 'idle' | 'approving' | 'minting' | 'success' | 'error';
  message: string;
  transactionHash?: string;
}

export interface NFTSaleEvent {
  tokenId: number;
  buyer: string;
  price: number;
  transactionHash: string;
}
