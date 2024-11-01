// components/OdosQuote.tsx
"use client"
import { useState } from 'react';
import Web3 from 'web3';

const OdosQuote = () => {
  const [inputTokenAddress, setInputTokenAddress] = useState<string>('');
  const [outputTokenAddress, setOutputTokenAddress] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [quoteResponse, setQuoteResponse] = useState<any>(null);
  const [assembledTransaction, setAssembledTransaction] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const getQuote = async () => {
    const quoteUrl = 'https://api.odos.xyz/sor/quote/v2';
    const quoteRequestBody = {
      chainId: 1, // Mainnet ID
      inputTokens: [
        {
          tokenAddress: inputTokenAddress,
          amount, // Use the entered amount here
        },
      ],
      outputTokens: [
        {
          tokenAddress: outputTokenAddress,
          proportion: 1,
        },
      ],
      userAddr: '0x49f51e3C94B459677c3B1e611DB3E44d4E6b1D55', // Replace with actual user address
      slippageLimitPercent: 1, // 1% slippage tolerance
      referralCode: 0,
      disableRFQs: true,
      compact: true,
    };

    try {
      const response = await fetch(quoteUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quoteRequestBody),
      });

      if (response.ok) {
        const quote = await response.json();
        setQuoteResponse(quote);
        setError(null);
      } else {
        setError('Failed to fetch quote');
      }
      console.log(quoteRequestBody)
    } catch (err) {
      setError('An error occurred while fetching the quote');
      console.error(err);
    }
  };

  const assembleTransaction = async () => {
    if (!quoteResponse) return;
    
    const assembleUrl = 'https://api.odos.xyz/sor/assemble';
    const assembleRequestBody = {
      userAddr: '0x49f51e3C94B459677c3B1e611DB3E44d4E6b1D55', // Replace with actual user address
      pathId: quoteResponse.pathId,
      simulate: true,
    };

    try {
      const response = await fetch(assembleUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(assembleRequestBody),
      });

      if (response.ok) {
        const assembled = await response.json();
        setAssembledTransaction(assembled);
        setError(null);
        console.log("success")
        console.log(assembled)
      } else {
        setError('Failed to assemble transaction');
      }
    } catch (err) {
      setError('An error occurred while assembling the transaction');
      console.error(err);
    }
  };

  const sendTransaction = async () => {
    if (!assembledTransaction) return;
  
    const web3 = new Web3('https://mainnet.infura.io/v3/');
    let transaction = assembledTransaction.transaction;
  
    // Log the transaction object
    console.log("Transaction Object:", transaction);
  
    // If gas is -1, set it to the gas estimate value
    if (transaction.gas <= 0) {
      transaction.gas = 212960; // Use the valid gas estimate
    }
  
    // Get the gas price if not provided or invalid
    if (!transaction.gasPrice || parseInt(transaction.gasPrice) <= 0) {
      transaction.gasPrice = await web3.eth.getGasPrice();
    }
  
    try {
      const pk = 'PRIVATE_KEY_FOR_NOW';  
      const signedTx = await web3.eth.accounts.signTransaction(transaction, pk);
  
      if (signedTx && signedTx.rawTransaction) {
        const receipt = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
        console.log('Transaction receipt:', receipt);
      } else {
        console.error('Failed to sign transaction');
      }
    } catch (error) {
      console.error('Error in sending transaction:', error);
    }
  };
  

  return (
    <div className="container mx-auto p-6 max-w-lg">
      <div className="bg-gray-800 text-white p-8 rounded-lg shadow-lg space-y-6">
        <h3 className="text-2xl font-semibold text-center">Odos Quote and Transaction</h3>

        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Input Token Address</span>
            <input
              className="mt-1 block w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-indigo-500 focus:outline-none"
              type="text"
              value={inputTokenAddress}
              onChange={(e) => setInputTokenAddress(e.target.value)}
              placeholder="Enter input token address"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Output Token Address</span>
            <input
              className="mt-1 block w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-indigo-500 focus:outline-none"
              type="text"
              value={outputTokenAddress}
              onChange={(e) => setOutputTokenAddress(e.target.value)}
              placeholder="Enter output token address"
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Amount</span>
            <input
              className="mt-1 block w-full p-3 rounded-lg bg-gray-900 text-white border border-gray-700 focus:border-indigo-500 focus:outline-none"
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount in fixed integer precision"
            />
          </label>
        </div>

        <div className="flex justify-between space-x-2 mt-6">
          <button onClick={getQuote} className="bg-slate-500 hover:bg-slate-400 text-white font-semibold py-2 px-4 rounded-lg">
            Get Quote
          </button>
          <button onClick={assembleTransaction} className="bg-slate-500 hover:bg-slate-400 text-white font-semibold py-2 px-4 rounded-lg">
            Assemble Transaction
          </button>
          <button onClick={sendTransaction} className="bg-slate-500 hover:bg-slate-400 text-white font-semibold py-2 px-4 rounded-lg">
            Send Transaction
          </button>
        </div>

        {error && <p className="text-red-400 mt-4">{error}</p>}

        {quoteResponse && (
          <div className="bg-gray-700 p-4 rounded-lg mt-6">
            <h4 className="text-lg font-semibold mb-2">Quote Response</h4>
            <ul className="space-y-2 text-sm">
              <li><strong>In Tokens:</strong> {quoteResponse.inTokens?.join(', ')}</li>
              <li><strong>Out Tokens:</strong> {quoteResponse.outTokens?.join(', ')}</li>
              <li><strong>In Amounts:</strong> {quoteResponse.inAmounts?.join(', ')}</li>
              <li><strong>Out Amounts:</strong> {quoteResponse.outAmounts?.join(', ')}</li>
              <li><strong>Gas Estimate:</strong> {quoteResponse.gasEstimate}</li>
              <li><strong>Path ID:</strong> {quoteResponse.pathId}</li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default OdosQuote;