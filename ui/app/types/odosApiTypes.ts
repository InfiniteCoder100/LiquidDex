// types/odosApiTypes.ts

export interface TokenInput {
    tokenAddress: string;
    amount: string;
  }
  
  export interface TokenOutput {
    tokenAddress: string;
    proportion: number;
  }
  
  export interface QuoteResponse {
    pathId: string;
    inTokens: string[];
    outTokens: string[];
    inAmounts: string[];
    outAmounts: string[];
    gasEstimate: number;
    dataGasEstimate: number;
    gweiPerGas: number;
    gasEstimateValue: number; // Add this line
    inValues: number[]; // Add this line
    outValues: number[]; // Add this line
    netOutValue: number;
    priceImpact: number;
    percentDiff: number;
    partnerFeePercent: number;
    blockNumber: number; // You might want to include this as well
  }
  
  export interface AssembleResponse {
    transaction: {
      to: string;
      data: string;
      from?: string;
      gas?: number;
      gasPrice?: string;
      value?: string;
    };
  }
  