//modules/keyGenerator.js
const hdkey = require('hdkey');
const EC = require('elliptic').ec;
const bip39 = require('bip39');
const crypto = require('crypto');

class KeyGenerator {
  generateWalletKeys(mnemonic, signatureCode) {
    try {
      const seed = bip39.mnemonicToSeedSync(mnemonic + signatureCode);
      const root = hdkey.fromMasterSeed(seed);
      const addrNode = root.derive("m/44'/60'/0'/0/0");
      const pubKey = addrNode.publicKey;
      const prvKey = addrNode._privateKey;
      const ec = new EC('secp256k1');
      const key = ec.keyFromPrivate(prvKey.slice(0, 32), 'bytes');
      const publicKeyPart1 = key.getPublic('hex').slice(0, key.getPublic('hex').length / 2);
      const privateKey = "PSx" + key.getPrivate('hex');
      const publicKeyPart2 = key.getPublic('hex').slice(key.getPublic('hex').length / 2);
      const publicKey = "Px" + publicKeyPart2;
      const signatureKey = "Sx" + publicKeyPart1;

      return {
        publicKey: publicKey,
        privateKey: privateKey,
        signatureKey: signatureKey,
      };
    } catch (error) {
      console.error('Error generating keys:', error.message);
      return null;
    }
  }
}

module.exports = KeyGenerator;
