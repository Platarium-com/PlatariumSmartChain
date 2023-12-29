<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://prevedere.platarium.com/assets/images/plp/plp.png" alt="Project logo"></a>
</p>

<h3 align="center">Platarium Smart Chain</h3>

---

## 🏁 Getting Started <a name="getting_started"></a>

### Install library
```
npm i platariumsmartchain
```

### Key Generator Module (modules/keyGenerator.js)

###### `generateWalletKeys(mnemonic, signatureCode)`

Generates a set of wallet keys based on a mnemonic and signature code.

###### Parameters

- `mnemonic`: A mnemonic phrase.
- `signatureCode`: A signature code.

###### Returns

An object containing the following keys:

- `publicKey`: The public key generated from the mnemonic and signature code.
- `privateKey`: The private key generated from the mnemonic and signature code.
- `signatureKey`: A signature key derived from the public key.

###### Example

```javascript
const { KeyGenerator } = require('platariumsmartchain');

// Replace 'yourMnemonicPhrase' and 'yourSignatureCode' with actual values
const mnemonic = 'yourMnemonicPhrase';
const signatureCode = 'yourSignatureCode';

const keyGenerator = new KeyGenerator();
const walletKeys = keyGenerator.generateWalletKeys(mnemonic, signatureCode);

console.log('Public key:', walletKeys.publicKey);
console.log('Private key:', walletKeys.privateKey);
console.log('Signature key:', walletKeys.signatureKey);
```

### Signature Verification Module (modules/signatureVerification.js)

###### `verify(privateKey, signatureKey, publicKey, data)`

Verifies the signature of data.

###### Parameters

- `privateKey`: The private key of the signer.
- `signatureKey`: The signature key derived from the public key.
- `publicKey`: The public key of the signer.
- `data`: The data to be verified.

###### Returns

- `true`: If the signature is verified successfully.
- `false`: If the signature verification fails.

###### Example

```javascript
const { SignatureVerification } = require('platariumsmartchain');

// Replace 'yourPrivateKey', 'yourSignatureKey', 'yourPublicKey', and 'yourData' with actual values
const privateKey = 'yourPrivateKey';
const signatureKey = 'yourSignatureKey';
const publicKey = 'yourPublicKey';
const data = 'yourData';

const isVerified = SignatureVerification.verify(privateKey, signatureKey, publicKey, data);

if (isVerified) {
  console.log('Signature is valid.');
} else {
  console.log('Signature verification failed.');
}
```
This method verifies the signature of data using the provided private key, signature key, public key, and data. It returns true if the signature is valid and false otherwise.

Please replace 'yourPrivateKey', 'yourSignatureKey', 'yourPublicKey', and 'yourData' with your actual private key, signature key, public key, and data.

### Transaction Module (modules/transaction.js)

##### Constructor

```javascript
new Transaction(publicKey, receiver, amount, signature);

- `publicKey`: The public key of the sender.
- `receiver`: The public key of the receiver.
- `amount`: The amount of the transaction.
- `signature`: The signature of the transaction.
```
##### Properties
```javascript
- `sender`: The public key of the sender.
- `receiver`: The public key of the receiver.
- `amount`: The amount of the transaction.
- `feePercentage`: The fee percentage.
- `minFee`: The minimum fee.
- `fee`: The calculated fee.
- `totalAmount`: The total amount including the fee.
- `timestamp`: The timestamp of the transaction.
- `id`: The unique ID of the transaction.
- `signature`: The signature of the transaction.
```

### Methods
calculateHash()
Calculates the hash of the transaction.

### verifySignature()
Verifies the signature of the transaction.

###### Returns
true: If the signature is verified successfully.
false: If the signature verification fails.

###### Example

```javascript
const { Transaction } = require('platariumsmartchain');

// Replace 'yourPublicKey', 'toAddress', 'yourAmount', and 'yourSignature' with actual values
const publicKey = 'yourPublicKey';
const toAddress = 'toAddress';
const amount = 100;
const signature = 'yourSignature';

const transaction = new Transaction(publicKey, toAddress, amount, signature);
const isSignatureValid = transaction.verifySignature();

if (isSignatureValid) {
  console.log('Transaction signature is valid.');
} else {
  console.log('Transaction signature verification failed.');
}
```