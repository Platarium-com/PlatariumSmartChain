// blockchain.js
const { KeyGenerator } = require('./modules/keyGenerator');
const { generateMnemonic } = require('./modules/mnemonic');
const Block = require('./modules/block');
const createGenesisBlock = require('./modules/genesisblock');
const { SignatureVerification } = require('./modules/signatureVerification');
const Transaction = require('./modules/transaction');

const readlineSync = require('readline-sync');
const genesisBlock = createGenesisBlock();
const blockchain = [genesisBlock];

function createBlock(index, timestamp, data) {
  const previousBlock = blockchain[blockchain.length - 1] || genesisBlock;
  const block = new Block(index, timestamp, data, previousBlock.hash);
  block.hash = block.calculateHash();
  blockchain.push(block);

  return block;
}

function createTransaction(publicKey, receiver, amount, signature) {
  const newTransaction = new Transaction(publicKey, receiver, amount, signature);
  return newTransaction;
}

function generateAndLogMnemonic() {
  const generatedMnemonic = generateMnemonic();
  return generatedMnemonic;
}

function generateWalletKeys(mnemonic, signatureCode) {
  try {
    const keyGenerator = new KeyGenerator();
    const walletKeys = keyGenerator.generateWalletKeys(mnemonic, signatureCode);
    return walletKeys;
  } catch (error) {
    console.error('Error generating wallet keys:', error.message);
    return null;
  }
}

function verifyTransactionSignature(privateKey, signatureKey, publicKey, transactionData) {
  try {
    const isVerified = SignatureVerification.verify(privateKey, signatureKey, publicKey, transactionData);
    return isVerified;
  } catch (error) {
    console.error('Error verifying transaction signature:', error.message);
    return false;
  }
}

module.exports = {
  generateAndLogMnemonic,
  generateWalletKeys,
  createBlock,
  Block,
  createTransaction,
  verifyTransactionSignature,
  genesisBlock,
  blockchain,
};
