# Cold Crypto Wallets and MITM Attacks


Are my cold wallet and the generated addresses really secure? I would like to familiarise you with the security topics of cold wallets and what you should pay attention to.

<!--more-->

## Cold Wallet

A wallet is a collection of private keys, like a key ring. It holds copies of each private key and each private key's corresponding address. A private key is necessary to spend from an address. Other than a hot wallet, a cold wallet is not connected to the internet and therefore stands a far lesser risk of being compromised. Cold wallets can also be referred to as offline (paper) wallets or hardware (USB) wallets.

## Man-in-the-Middle Attack (MITM)

A man-in-the-middle attack (MITM) is a general term for when a perpetrator infiltrates a conversation between a user and an application to either eavesdrop or impersonate one of the two parties to make it appear that a normal exchange of information is underway.

{{< image src="illustration-of-the-man-in-the-middle-attack.png" caption="Source: Man-in-the-middle attack, Wikipedia. <br> **Figure 1**: *Illustration of a MITM attack.*" >}}

## Case 1

Let's assume you generate a wallet address (hashed public and private key) via [bitaddress.org](https://bitaddress.org) or [myetherwallet.com](https://myetherwallet.com) and during the generation or transmission a MITM attack occurs, be it through JavaScript hijacking, SSL offloading, key/screen logging or even compromised hardware. This key pair would thus be compromised and insecure, as the attacker would possess both key pairs or, in any case, the private key.

{{< image src="mitm-soft-wallet.png" caption="**Figure 2**: *Illustration of a MITM attack of a soft wallet.*" >}}

## Case 2

Let's assume you use a hardware wallet like a Nano Ledger S/X or BitBox, which generates the public and private key for you using the manufacturer's software and uses a recovery mnemonic/phrase as the seed. Key/screen logging would also be fatal here and keys and mnemonic could be caputred and hence would be visible to attackers.

{{< image src="mitm-cold-wallet.png" caption="**Figure 2**: *Illustration of a MITM attack of a cold/hardware wallet.*" >}}

## Conclusion

Ultimately, the only option is to manually create your own address using (BIP32/BIP39/BIP38/BIP44) on a secure, offline and trusted device, i.e. not a mobile phone or workstation with internet.

{{< image src="secured-and-trusted-workstation.png" caption="**Figure 3**: *Illustration of a MITM attack of a soft wallet.*" >}}

If I had several higher 6/7-digit amounts in Ethereum and Bitcoin and I wanted to make sure for newly created addresses that mnemonic and private keys were not seen by any other person from the time of generation and safekeeping, then I think this is definitely a safer way than just quickly generating an address via app or online.

Of course, there are far more paranoid ways, but I don't think I'm far off the mark.

If you want to know how to create a secure wallet address, check out my post [Create a secure and anonymous Crypto Wallet](../create-a-secure-and-anonymous-wallet-address/).

{{< admonition info References >}}
- [Create a secure and anonymous Crypto Wallet](../create-a-secure-and-anonymous-wallet-address/)
- [Hot and Cold Crypto Wallet (Address)](../hot-and-cold-wallet-address/)
- [Crypto Token, Coins and Mnemonics](../crypto-token-coins-and-mnemonics/)
- [Generate Bitcoin Address](https://bitaddress.org)
- [Generate Ethereum Address](https://myetherwallet.com)
- [How Jason Bourne Stores His Bitcoin](http://maxtaco.github.io/bitcoin/2014/01/16/how-jason-bourne-stores-his-bitcoin/)
- [Trusted Third Parties are Security Holes](https://nakamotoinstitute.org/trusted-third-parties/)
  {{< /admonition >}}

