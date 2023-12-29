// transactionTest.js
const { SignatureAlgorithm, SignatureVerification } = require('./modules/signatureVerification');
const { createBlock, blockchain, verifyTransactionSignature, createTransaction } = require('platariumsmartchain');

describe('Blockchain Signature Verification Test', function () {
  it('should verify the transaction signature in the blockchain 10 times', async function () {
    const publicKey = 'Px086c8a7cb6c9aa800a838a667af87e742f8e4955d9af5e3708e4c2bdade5fc6d2';
    const privateKey = 'PSxcd42dfa99a853086d9702ded3793734a5c095f31fcb07951ac1825a444ee9152';
    const signatureKey = 'Sx0416421c3d15be5187410e41a164d354155ba842ef3d69c43277f2b21569df63f';

    const sender = publicKey;
    const receiver = 'Px086c8a7cb6c9aa800a838a667af87e742f8e4955d9af5e3708e4c2bdade5fc6d1';
    const amount = 50; // amount

    for (let i = 0; i < 1000000; i++) {
      // Generate a signature
      const newSignature = SignatureAlgorithm.sign(privateKey, 'someData');

      // Create a transaction with the specified keys
      const newTransaction = createTransaction(publicKey, receiver, amount, newSignature);

      // Check the signature of the transaction
      const isVerified = verifyTransactionSignature(privateKey, signatureKey, publicKey);

      console.log(`Transaction #${i + 1} created:`, newTransaction);
      console.log(`Is Verified #${i + 1}:`, isVerified);

      if (isVerified) {
        console.log(`🚀Transaction #${i + 1} successfully verified in the blockchain!`);
      } else {
        console.log(`❌Transaction #${i + 1} verification failed in the blockchain.`);
      }
    }
  });
});
