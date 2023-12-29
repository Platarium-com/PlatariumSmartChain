// modules/transaction.js
const SHA256 = require('crypto-js/sha256');
const { SignatureVerification } = require('./signatureVerification');

class Transaction {
  constructor(publicKey, receiver, amount, signature) {
    this.sender = publicKey;
    this.receiver = receiver;
    this.amount = amount;
    this.feePercentage = 0.002;
    this.minFee = 0.000001;
    this.fee = Math.max(amount * this.feePercentage, this.minFee);
    this.totalAmount = amount + this.fee;
    this.timestamp = new Date().toISOString();
    this.id = 'Tx' + (this.signature = this.calculateHash());
  }
  calculateHash() {
    return SHA256(
      this.sender +
      this.receiver +
      this.amount +
      this.timestamp +
      this.publicKey
    ).toString();
  }

  verifySignature() {
    return SignatureVerification.verify(this.publicKey, this.signature, this.hash);
  }
}

module.exports = Transaction;
