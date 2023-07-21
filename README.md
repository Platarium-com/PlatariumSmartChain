<p align="center">
  <a href="" rel="noopener">
 <img width=200px height=200px src="https://i.imgur.com/VELRxXl.png" alt="Project logo"></a>
</p>

<h3 align="center">Platarium Smart Chain</h3>

---

## Features

* Simple proof-of-work algorithm
* Verify blockchain (to prevent tampering)
* Generate wallet (private/public key)
* Sign transactions

## 🏁 Getting Started <a name="getting_started"></a>

### Install library
```
npm i platariumsmartchain
```


### Generate a keypair
To make transactions on this blockchain, you need a keypair. The public key becomes your wallet address, and the private key is used to sign transactions.

```js
const { PlatariumSmartChain } = require('platariumsmartchain');
const bip39 = require('bip39');
const hdkey = require('hdkey');

// Create a new instance of PlatariumSmartChain
const PlatariumSmartChainInstance = new PlatariumSmartChain();

// Generate a new wallet keys (public and private key)
const walletKeys = PlatariumSmartChainInstance.generateWalletKeys();

// WalletKeys object now contains your public & private key
console.log('Public key:', walletKeys.publicKey);
console.log('Private key:', walletKeys.privateKey);
```

The `myKey` object now contains your public & private key:

```js
console.log('Public key:', myKey.getPublic('hex'));
console.log('Private key:', myKey.getPrivate('hex'));
```

### Create a blockchain instance
Now you can create a new instance of the Blockchain:

```js
const { Blockchain, Transaction } = require('platariumsmartchain');
const myChain = new Blockchain();
```

### Adding transactions
```js
// Transfer 100 coins from my wallet to "toAddress"
const tx = new Transaction(walletKeys.publicKey, 'toAddress', 100);

// Sign the transaction with your private key
tx.signTransaction(walletKeys.privateKey);

// Add the transaction to the pending transactions pool
myChain.addTransaction(tx);
```

To finalize this transaction, we have to mine a new block. We give this method our wallet address because we will receive a mining reward:

```js
myChain.minePendingTransactions(walletKeys.publicKey);
```
Note: In order to send the transaction to the server, you will need to implement the server API to receive and process transactions from the client. For the server-side implementation, please refer to the server.js file.
