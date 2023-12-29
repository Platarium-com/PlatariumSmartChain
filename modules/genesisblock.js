//modules/genesisblock.js
const SHA256 = require('crypto-js/sha256');

function createGenesisBlock() {
  const index = 0;
  const timestamp = new Date('1995-05-10');
  const data = 'Genesis Block';
  const previousHash = '0';

  return {
    index,
    timestamp,
    data,
    previousHash,
    hash: SHA256(index + previousHash + timestamp + JSON.stringify(data)).toString()
  };
}

module.exports = createGenesisBlock;
