import Web3 from 'web3';

// 1. create web3 provider
const web3 = new Web3('node http endpoint for your network or wallet provider');

// 2. Extract transaction object from assemble API response
const transaction = assembledTransaction.transaction;

let txHash;
// 3a. Sign transaction with a web3 provider / wallet
txHash = await web3.eth.accounts.signTransaction(transaction);

// 3b. sign transaction with private key
const pk = 'Your EOA private key';
const signedTx = web3.eth.accounts.signTransaction(transaction, pk);
txHash = await web3.eth.send_raw_transaction(signedTx.rawTransaction);