import fetch from 'isomorphic-unfetch'; 
import { QuoteResponse, TokenInput, TokenOutput } from '../types/odosApiTypes';

export async function getQuote(
  chainId: number,
  inputTokens: TokenInput[],
  outputTokens: TokenOutput[],
  userAddr: string,
  slippageLimitPercent = 0.3,
  referralCode = 0
): Promise<QuoteResponse> {
  const quoteUrl = "https://api.odos.xyz/sor/quote/v2";

  const body = {
    chainId,
    inputTokens,
    outputTokens,
    userAddr,
    slippageLimitPercent,
    referralCode,
    disableRFQs: true,
    compact: true,
  };

  try {
    const response = await fetch(quoteUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    // Check if the response is OK
    if (response.ok) {
      return response.json();
    } else {
      // Log the response details for debugging
      const errorResponse = await response.text(); // Use text() to see the raw response
      console.error('Quote API Error: Status:', response.status, 'Status Text:', response.statusText, 'Error Response:', errorResponse);
      throw new Error(`Quote Error: ${response.statusText}`);
    }
  } catch (error) {
    console.error('Error fetching quote:', error);
    throw error; // Rethrow the error for further handling
  }
}
