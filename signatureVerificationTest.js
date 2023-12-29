const { generateAndLogMnemonic, generateWalletKeys, createBlock, verifyTransactionSignature, genesisBlock, blockchain } = require('platariumsmartchain');

describe('Blockchain Signature Verification Test', function () {
  it('should verify the transaction signature in the blockchain', async function () {
    const publicKey = 'Px086c8a7cb6c9aa800a838a667af87e742f8e4955d9af5e3708e4c2bdade5fc6d2';
    const privateKey = 'PSxcd42dfa99a853086d9702ded3793734a5c095f31fcb07951ac1825a444ee9152';
    const signatureKey = 'Sx0416421c3d15be5187410e41a164d354155ba842ef3d69c43277f2b21569df63f';
    const newBlock = createBlock(blockchain.length, new Date());

    const isVerified = verifyTransactionSignature(privateKey, signatureKey, publicKey);

    console.log('Is Verified:', isVerified);

    if (isVerified) {
      console.log('Transaction successfully verified in the blockchain!');
    } else {
      console.log('Transaction verification failed in the blockchain.');
    }
  });
});
