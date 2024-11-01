const quoteUrl = 'https://api.odos.xyz/sor/quote/v2';

const quoteRequestBody = {
  chainId: 1, // Replace with desired chainId
  inputTokens: [
    {
        tokenAddress: '0x...', // checksummed input token address
        amount: '100000', // input amount as a string in fixed integer precision
    }
  ],
  outputTokens: [
    {
        tokenAddress: '0x...', // checksummed output token address
        proportion: 1
    }
  ],
  userAddr: '0x...', // checksummed user address
  slippageLimitPercent: 0.3, // set your slippage limit percentage (1 = 1%),
  referralCode: 0, // referral code (recommended)
  disableRFQs: true,
  compact: true,
};

const response = await fetch(
  quoteUrl,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(quoteRequestBody),
  });

if (response.status === 200) {
  const quote = await response.json();
  // handle quote response data
} else {
  console.error('Error in Quote:', response);
  // handle quote failure cases
}