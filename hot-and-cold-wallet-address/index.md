# Hot and cold Crypto Wallet (Address)


Today I learned how to explain the differences between a hot and cold crypto wallet and a wallet address.

<!--more-->

## Wallet

A wallet is a collection of private keys, like a key ring. It holds copies of each private key and each private key's corresponding address. A private key is necessary to spend from an address.

{{< admonition info Note >}}
Wallets contain keys, not coins. Each user has a wallet containing keys. These keys in turn can prove that the output (coins) of a blockchain transaction belong to a user.
{{< /admonition >}}

Wallets are really keychains containing pairs of private/public keys. Users sign transactions with the keys, thereby proving they own the transaction outputs (their coins). The coins are stored on the blockchain in the form of transaction-outputs.

## Wallet Address

An address is a public key to which transactions can be sent. To be accurate, an address represents a hash of a public key of an asymmetric key pair (public and private key).

{{< image src="public-key-address-meme-bitcoin-briefly.png" caption="**Figure 1**: *A wallet address represents a hash of a public key.*" >}}

Wallet Address (Hash): `0x207BC0f0C4E20C806299BE54ceca0a5b9cf07602`

Public Key: `0x0268968b2ffdf391178374346875a54974054cfb15166a176bf93dac67d861606e`

Private Key: `0x9b3f56cfbed5889ead6b11a038cc10141c9247edddc80b2556f4703048ee126b`

{{< image src="public-key-to-bitcoin-address.png" caption="Source: Mastering Bitcoin, A. Antonopoulos, 2017). <br> **Figure 2**: *Public key to bitcoin address: conversion of a public key into a bitcoin address.*" >}}

### Hot Wallet

A hot wallet is a tool that allows to receive and send tokens/coins. Compared to a cold wallet it's faster and makes it easier to trade or spend crypto since it's connected to the internet.

### Cold Wallet

A cold wallet is not connected to the internet and therefore stands a far lesser risk of being compromised. Cold wallets can also be referred to as offline (paper) wallets or hardware (USB) wallets.

{{< admonition info References >}}
- [Create a secure and anonymous Crypto Wallet](../create-a-secure-and-anonymous-wallet-address/)
- [Cold Crypto Wallets and MITM Attacks](../cold-crypto-wallets-and-mitm-attacks/)
- [Crypto Token, Coins and Mnemonics](../crypto-token-coins-and-mnemonics/)
- [Mastering Bitcoin](https://www.oreilly.com/library/view/mastering-bitcoin/9781491902639/ch04.html)
- [Hot Wallet?](https://www.investopedia.com/terms/h/hot-wallet.asp)
  {{< /admonition >}}

