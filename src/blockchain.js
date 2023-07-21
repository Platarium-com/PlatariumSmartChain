const SHA256 = require('crypto-js/sha256');
const EC = require('elliptic').ec;
const bip39 = require('bip39');
const hdkey = require('hdkey');

const prefix = "Px";
const privateKeyPrefix = "PSx";

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
    this.nonce = 0;
  }

  calculateHash() {
    return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
  }

  mineBlock(difficulty) {
    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
      this.nonce++;
      this.hash = this.calculateHash();
    }
    console.log(`Майнінг успішний! Новий блок доданий: ${this.hash}`);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 4;
    this.pendingTransactions = [];
    this.miningReward = 100;
  }

  // Function to calculate the balance of a wallet address
  getBalance(walletAddress) {
    let balance = 0;

    for (const block of this.chain) {
      if (block.data && Array.isArray(block.data)) {
        for (const transaction of block.data) {
          if (transaction.from === walletAddress) {
            balance -= transaction.amount;
          }

          if (transaction.to === walletAddress) {
            balance += transaction.amount;
          }
        }
      }
    }

    return balance;
  }

  createGenesisBlock() {
    const ec = new EC('secp256k1');
    const key = ec.genKeyPair();
    const publicKey = prefix + key.getPublic('hex').slice(0, 40);
    const privateKey = privateKeyPrefix + key.getPrivate('hex').slice(0, 40);
    const walletAddress = publicKey;
    const genesisData = {
      amount: "Genesis Block",
      walletAddress: walletAddress
    };
    return new Block(0, "10/05/1995", genesisData, "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  minePendingTransactions() {
    const newBlock = new Block(
      this.chain.length,
      Date.now(),
      this.pendingTransactions,
      
     
this.getLatestBlock().hash
    );
    newBlock.mineBlock(this.difficulty);

    this.chain.push(newBlock);
    this.pendingTransactions = [];
  }

  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }

  isTransactionValid(transaction) {
    const ec = new EC('secp256k1');
    const publicKey = ec.keyFromPublic(transaction.from, 'hex');

    return publicKey.verify(transaction.calculateHash(), transaction.signature);
  }
}

class PlatariumSmartChain {
  constructor(chain) {
    this.chain = chain || [this.createGenesisBlock()];
    this.ec = new EC('secp256k1');
  }

  getMnemonic() {
    return this.mnemonic;
  }

  createGenesisBlock() {
    const ec = new EC('secp256k1');
    const key = ec.genKeyPair();
    const publicKey = prefix + key.getPublic('hex').slice(0, 40);
    const privateKey = privateKeyPrefix + key.getPrivate('hex').slice(0, 40);
    const walletAddress = publicKey;
    const genesisData = {
      amount: "Genesis Block",
      walletAddress: walletAddress
    };
    return new Block(0, "10/05/1995", genesisData, "0");
  }
  // Метод для генерації ключів
  generateWalletKeys() {
    const mnemonic = bip39.generateMnemonic(256);
    console.log('Mnemonic Phrase: ' + mnemonic);

    const seed = bip39.mnemonicToSeedSync(mnemonic);
    const root = hdkey.fromMasterSeed(seed);
    const addrNode = root.derive("m/44'/60'/0'/0/0");
    const pubKey = addrNode._publicKey;
    const prvKey = addrNode._privateKey;
    const publicKey = prefix + pubKey.toString('hex');
    const privateKey = privateKeyPrefix + prvKey.toString('hex');

    return {
      publicKey: publicKey,
      privateKey: privateKey,
    };
  }
}

module.exports = {
  Block,
  Blockchain,
  PlatariumSmartChain,
};