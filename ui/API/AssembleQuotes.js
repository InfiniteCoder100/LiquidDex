const assembleUrl = 'https://api.odos.xyz/sor/assemble';

const assembleRequestBody = {
  userAddr: '0x...', // the checksummed address used to generate the quote
  pathId: quote.pathId, // Replace with the pathId from quote response in step 1
  simulate: true, // this can be set to true if the user isn't doing their own estimate gas call for the transaction
};

const response = await fetch(
  assembleUrl,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(assembleRequestBody),
  });

if (response.status === 200) {
  const assembledTransaction = await response.json();
  // handle Transaction Assembly response data
} else {
  console.error('Error in Transaction Assembly:', response);
  // handle quote failure cases
}