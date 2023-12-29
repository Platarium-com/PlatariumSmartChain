//modules/mnemonic.js
const bip39 = require('bip39');

function generateMnemonic() {
  const mnemonic = bip39.generateMnemonic(256);
  const alphanumericPart = Array.from({ length: 12 }, () => {
    const characterSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const randomIndex = Math.floor(Math.random() * characterSet.length);
    return characterSet.charAt(randomIndex);
  }).join('');

  return {
    mnemonic: mnemonic,
    alphanumericPart: alphanumericPart
  };
}

module.exports = {
  generateMnemonic
};
