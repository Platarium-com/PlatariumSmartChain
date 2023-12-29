//modules/block.js
const SHA256 = require('crypto-js/sha256');

function calculateHash(index, previousHash, timestamp, data) {
  return SHA256(index + previousHash + timestamp + JSON.stringify(data)).toString();
}

class Block {
  constructor(index, timestamp, data, previousHash = '') {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return calculateHash(this.index, this.previousHash, this.timestamp, this.data);
  }
}

module.exports = Block;
