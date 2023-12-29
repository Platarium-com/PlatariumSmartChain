//modules/signatureVerification.js

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

class SignatureAlgorithm {
  static sign(privateKey, data) {
    const key = ec.keyFromPrivate(privateKey, 'hex');
    const signature = key.sign(data);
    return signature.toDER('hex');
  }
}

class SignatureVerification {
  static verify(privateKey, signatureKey, publicKey, data) {
    const combinedVerificationPublicKey = signatureKey.slice(2) + publicKey.slice(2);
    const signature = SignatureAlgorithm.sign(privateKey.slice(3), data);
    const derSignature = Buffer.from(signature, 'hex');
    const r = derSignature.slice(4, 36).toString('hex');
    const s = derSignature.slice(38).toString('hex');

    const key = ec.keyFromPublic(combinedVerificationPublicKey, 'hex');
    return key.verify(data, { r, s });
  }
}

module.exports = {
  SignatureAlgorithm: SignatureAlgorithm,
  SignatureVerification: SignatureVerification,
};