---
title: "Create a secure and anonymous Crypto Wallet"
description: ""
date: 2022-01-01T11:41:52+08:00
lastmod: 2022-01-01T13:35:57+08:00
draft: false
resources:
  - name: "featured-image-preview"
    src: "start-bitkey-turnkey-linux.png"
tags:
  [
    "crypto",
    "wallet",
    "btc",
    "secure",
    "anonymous",
    "privacy",
    "bitcoin",
    "paper wallet",
    "cold wallet",
    "bitkey",
    "coinbase",
    "satoshi",
    "liveusb"
  ]
categories: ["Crypto"]
---

Creating a wallet address (Bitcoin/Ethereum) is easy, but is it really _secure_?

In this article we look at a secure but also anonymous approach using tools like Live USB BitKey to create your own anonymous crypto wallet you can trust.

<!--more-->

As soon as you get deeper into the crypto world, you realize that it is essential to take a closer look at the issues of security and anonymity and not to rely on others. Especially when the amounts and number of your transactions increase.

## Are you sure your wallet is secure from hackers?

Let's say you're going to transfer $120,000 from your wallet to another wallet

- Can you say with 100% certainty that no one really has access to your wallet or your private key?
- Are you sure there is no [middle man](../cold-crypto-wallets-and-mitm-attacks/) active?

Sending transactions on decentralised blockchains using the Bitcoin or Ethereum protocol are great, but they require even more conscientious handling due to the absence of a central authority. Since there is no bank or liquidity provider that can or will control your transaction in the event of a mistake, you are solely responsible for handling your own money and digital crypto-assets with more care than usual.

{{< admonition warning Note >}}
When you deposit money at a bank, you let them worry about the security, right? However, the keys to your transactions and coins are stored on your computer and that means you are fully responsible for securing them.
{{< /admonition >}}

## Are blockchain transactions really anonymous?

A blockchain is a public ledger, which means all transactions are publicly viewable.

When you make a transaction, your wallet address and the transaction details are recorded in the blockchain.

{{< admonition info Note >}}
As long as there is no link between your wallet address and your identity, your transaction stays anonymous.
{{< /admonition >}}

However, as soon as a connection is made between your address and your identity - let's say your IP address, your email address or anything else identifiable - your cover is blown. And why? Because from that point on, anybody can link your address to every transaction you've ever made on the blockchain.

## Create a secure wallet (the quick & easy way)

1. Go to Coinbase.com or binance.com.
2. Click create Wallet.
3. Done.

No, that's exactly the reason why I'm writing this article. Since it is so **easy** to create a wallet, people are also **too easy** with their wallets. Let it be things like

- writing your seed phrase on a piece of paper and lose it
- writing your seed phrase on a digital note (Notepad, Notes) and don't secure it
- not enabling multi-factor authentication
- not enabling password protection on your soft wallets

### Security concerns you should be aware of

It's important to sched some light on some major security concerns and you must be aware of common threats, such as

- Modern operating systems are highly complex which lead to large attack surfaces and constant leak of information without the user's knowledge or consent
- Duping users through fake cryptocurrencies
- Phishing methods and scams
- Knowing the confidential lock PIN code of your phone
- Any other attempts to steal your cryptographic keys
- Wallets can be hacked by using old password backups (even if you think you're safe while your password is frequently being changed)
- Sybil attacks

### Security Precautions you should take care of

Make sure to

- Enable Multi-Factor Authentication (MFA)
- Enable Password Protection and don't use the same password everywhere and for everything
- Backup your wallet at multiple secure locations (like on a USB or on your hard drive)
- Keep your computer (Mac, Windows or Linux) up to date with latest security updates and patches
- Be careful when opening emails (Desktop or Mobile), as phishing scams are becoming more and more sophisticated
- Generally use a VPN like NordVPN or ExpressVPN
- Avoid public Wi-Fi's
- Your browser (Chrome/Edge/Mozilla) indicates the sites you're browsing are encrypted with SSL
- Double-check the address of the recipient before sending any payments

## Create a secure wallet (the more secure way)

Since we're going to create a cold wallet you should know cold wallets can also be referred to as

- Offline Wallets like paper, NFC chips or any data storage medium
- Cold Storage Wallets are hardware (USB) devices like Nano Ledger or Trezor

{{< admonition info Note >}}
Hardware wallets, however, can also be called offline wallets, since they do not have direct access to the Internet and vice versa.
{{< /admonition >}}

{{< admonition warning Air-Gap >}}
Before you start, remember to disconnect any LAN cables from your computer/laptop.
{{< /admonition >}}

1. Download the BitKey ISO.
2. Create a bootable USB drive with [Rufus](https://rufus.ie/).
3. Start/Boot BitKey from your USB drive.
   {{< image src="start-bitkey-turnkey-linux.png" caption="**Bootscreen BitKey**" >}}
4. Remove your BitKey USB boot device.
5. Insert a USB drive to save your data on it later.
   {{< image src="bitkey-get-started.png" caption="**Bootscreen BitKey**" >}}
6. Now you can decide to choose any Wallet Generator you want to use to generate your address(es)
   {{< admonition danger Remember >}}
   Do not try to make use of your phone camera to make a photo of your generated keys since this breaks the air-gap. Your mobile phone is usually always connected to the internet.
   {{< /admonition >}}
   {{< image src="electrum.png" caption="**Electrum**" >}}
   {{< image src="bitaddress.org.png" caption="**Bitaddress.org**" >}}
   {{< image src="warp-wallet2.png" caption="**Warp Wallet**" >}}
   {{< image src="coinbin.png" caption="**Coinb.in**" >}}
7. Once you generated your mnemonic seed phrase and/or keys, write them down on to a physical piece of paper or store them on your USB drive.

{{< admonition info References >}}
- [Cold Crypto Wallets and MITM Attacks](../cold-crypto-wallets-and-mitm-attacks/)
- [Hot and Cold Crypto Wallet (Address)](../hot-and-cold-wallet-address/)
- [Crypto Token, Coins and Mnemonics](../crypto-token-coins-and-mnemonics/)
- [BIP39 wordlist](https://github.com/bitcoin/bips/blob/master/bip-0039/english.txt)
- [Why Storing Bitcoin in a Single Wallet is a Bad Idea](https://www.investopedia.com/news/why-storing-bitcoin-single-wallet-bad-idea/)
- [Extract Private Key from Ledger Mnemonic](https://dune.network/ledger_extract/)
- [Get/Generate private keys from mnemonic or create own Mnemonic](https://iancoleman.io/bip39/)
- [Generate Bitcoin Address](https://bitaddress.org)
- [Generate Ethereum Address](https://myetherwallet.com)
- [Bitkey](https://bitkey.io/)
- [Live USB](https://en.wikipedia.org/wiki/Live_USB)
- [Trusted Third Parties are Security Holes](https://nakamotoinstitute.org/trusted-third-parties/)
- [The closest you can get to perfectly secure Bitcoin transactions (without doing them in your head)](https://www.turnkeylinux.org/blog/secure-bitcoin-transactions)
- [Cold Wallets (offline and hardware) and MITM attacks](../cold-wallets-and-mitm-attacks/index.en.md)
- [Why you need several Crypto Wallets](https://dailyiowan.com/2021/07/07/why-you-need-several-crypto-wallets/)
  {{< /admonition >}}
