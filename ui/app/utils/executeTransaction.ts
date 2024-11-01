import Web3 from 'web3';
import { AssembleResponse } from '../types/odosApiTypes';

export async function executeTransaction(transaction: AssembleResponse['transaction']) {
  const web3 = new Web3(process.env.NEXT_PUBLIC_NODE_HTTP_ENDPOINT);

  const privateKey = process.env.NEXT_PUBLIC_EOA_PRIVATE_KEY;
  if (!privateKey) {
    throw new Error('Private key is not provided in environment variables.');
  }

  try {
    const signedTx = await web3.eth.accounts.signTransaction(transaction, privateKey);

    if (!signedTx.rawTransaction) {
      throw new Error('Signing failed.');
    }

    const txHash = await web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    return txHash;
  } catch (error) {
    console.error('Error executing transaction:', error);
    throw error;
  }
}
