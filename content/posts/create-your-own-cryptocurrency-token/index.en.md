---
title: "Create your own Cryptocurrency Token (Solana)"
description: ""
date: 2022-01-09T08:23:15+08:00
lastmod: 2022-01-09T08:23:15+08:00
draft: false
resources:
  - name: "featured-image-preview"
    src: "token-listing.png"
tags:
  [
    "crypto",
    "wallet",
    "solana",
    "token",
    "mint",
    "blockchain",

  ]
categories: ["Crypto"]
---

I created my own crypto Token and I want to show you how to create your own - It only takes about 15-30 minutes.

<!--more-->

{{< admonition note Note >}}
First of all, we are **NOT** going to create a **cryptocurrency**.<br>
We are going to create a cryptocurrency **Token**.
{{< /admonition >}}

If you want to learn more about the differences please check out my other post about basic [Crypto Tokenomics](https://www.graef.io/crypto-token-coins-and-mnemonics/).

## Why should you create your own Token?

Custom Tokens can represent an investor's stake in a business or they can serve an economic purpose like a payment instrument. As a token holder, you can use them as a means of payment, utility or trade them with other securities to make a profit.

But the reason we're creating it is simply to better understand the process behind the blockchain technology - Learning by doing. And simply because it's fun to learn something new in the world of cryptocurrencies.

## Requirements

- Computer (Windows, Linux or MacOS)
- Browser (Edge, Chrome or Firefox)
- [Solana Tool Suite](https://docs.solana.com/cli/install-solana-cli-tools)
- [GitHub Account](https://github.com/join)
- [Phantom Wallet](https://phantom.app/download) (min. 0.1-0.3 `$SOL` to cover transaction fees)
- Internet
- Brain

## Workflow

Here is a short overview of what we're going to do and to give you the bigger picture:


{{< mermaid >}}
stateDiagram
    [*] --> CreateWallet
    CreateWallet --> TokenAddress
    TokenAddress --> TokenAccount
    TokenAddress --> Mint
    Mint --> TokenAccount
    Mint --> TokenAddress
    TokenAccount --> LimitSupply
    LimitSupply --> RegisterToken
    RegisterToken --> [*]
{{< /mermaid >}}

## Set up your Solana Wallet

Let's start with setting up your Solana Wallet first.

{{< admonition info "Before you begin" >}}
Make sure you have installed the [Solana Command Line Tools](https://docs.solana.com/cli/install-solana-cli-tools).
{{< /admonition >}}

#### MacOS & Linux

Open your Terminal and copy and paste the following command

```bash
sh -c "$(curl -sSfL https://release.solana.com/v1.9.3/install)"
```

#### Windows

Open PowerShell or a Command Prompt (cmd.exe) as an Administrator and copy and paste the following command

```
curl https://release.solana.com/v1.9.3/solana-install-init-x86_64-pc-windows-msvc.exe --output C:\temp\solana-install-init.exe --create-dirs
```

{{< admonition info "Release" >}}
Feel free to replace `v1.9.3` with the release tag matching your desired release version, or just use any of the symbolic channel names: _stable_, _beta_, or _edge_.
{{< /admonition >}}

Confirm you have the desired version of `solana` installed by entering:

```
solana --version
```
### Generate a File System Wallet Keypair

```
solana-keygen new --outfile keypair.json
```

{{< image src="generate-new-keypair.png" caption="**Generate a new Wallet Keypair.**" >}}

The content of the `keypair.json` file looks like this:

```
[53,182,131,247,119,117,227,207,112,73,170,126,222,197,244,99,215,107,255,202,33,43,36,17,104,111,157,246,196,192,174,95,240,23,238,206,118,215,154,238,229,96,11,37,156,123,51,223,5,231,17,117,86,136,103,14,75,95,175,132,148,54,1,13]
```

It's basically an array of 64 values, the first 32 represent the private key

```
private_key_bytes = [53,182,131,247,119,117,227,207,112,73,170,126,222,197,244,99,215,107,255,202,33,43,36,17,104,111,157,246,196,192,174,95]

public_key_bytes = [240,23,238,206,118,215,154,238,229,96,11,37,156,123,51,223,5,231,17,117,86,136,103,14,75,95,175,132,148,54,1,13]
```


{{< admonition warning Remember >}}
Your `keypair.json` file is **unencrypted**. Do **not** share this file with others.
{{< /admonition >}}

Remember, and as we learned in [Hot and cold Crypto Wallet (Address)](../hot-and-cold-wallet-address/), a wallet address like shown in the output above, is just a _Base58Check Encoded_ Public Key Hash.

That's why your wallet address `8mNvt36N7bW3vuWJ3pFDTSWFp2i7fD1MF8bv6mTFMj8f` looks different than your `public_key_bytes`.

### Set Solana Config

By default your `RPC URL` should be set to https://api.mainnet-beta.solana.com already but here is the command to verify it:

```
solana config get
```


If it's not set to the Mainnet not you can set it with this command:

```
solana config set --url https://api.mainnet-beta.solana.com
solana config set --keypair keypair.json
```


### Verify your Public Key (Optional)

You can also verify if your public key belongs to your key pair with the following command:

```
solana-keygen verify 8mNvt36N7bW3vuWJ3pFDTSWFp2i7fD1MF8bv6mTFMj8f .\keypair.json
```

{{< image src="verify-public-key.png" caption="**Verify if your public key comes from this Keypair.**" >}}

### Import into your Phantom Wallet (Optional)

Copy the contents of your `keypair.json` and hit import on your Phantom Wallet.

{{< image src="import-wallet.png" caption="**Import into your Phantom Wallet.**" >}}

## Top up your wallet

Let's top up your wallet address you just created with some `$SOL`to cover the transaction fees.

{{< image src="topup.png" caption="**Top up your Wallet.**" >}}

If you imported your wallet address into Phantom you can check the balance there or you can use `solana balance` to check:

```
solana balance
```

{{< image src="balance.png" caption="**Check your balance.**" >}}


## Create Token

Now that we have sent some `$SOL` to our wallet address we can start creating our actual **Token Address**, which we will later use to mint fresh Tokens and send them to our **Token Account** which we will also create in the same process.

### Create Token and Token Account

```
spl-token create-token
```

Token Address: `2LTQripZZZXekBg5311zu4zdzKr7VwiQ81RzVL62S72q`

{{< image src="create-token.png" caption="**Create your Token.**" >}}

```
spl-token create-account 2LTQripZZZXekBg5311zu4zdzKr7VwiQ81RzVL62S72q
```

Token Account: `CB7WEx4wtFiy6ftJWbaSvBfw1pbxe3wq65DjEbWmGRve`

{{< image src="create-token-account.png" caption="**Create your Token Account.**" >}}

{{< admonition note Note >}}
Your Token Account is associated with your Token Address.
{{< /admonition >}}

### Mint Token Account

We're going to mint 1.000.000 tokens (out of thin air) with this token address `2LTQripZZZXekBg5311zu4zdzKr7VwiQ81RzVL62S72q` and then going to send them to our token account `CB7WEx4wtFiy6ftJWbaSvBfw1pbxe3wq65DjEbWmGRve`.

```
spl-token mint 2LTQripZZZXekBg5311zu4zdzKr7VwiQ81RzVL62S72q 1000000 CB7WEx4wtFiy6ftJWbaSvBfw1pbxe3wq65DjEbWmGRve
```

### Check your Token Account Balance

```
spl-token accounts
```

{{< image src="token-account-balance.png" caption="**Token Account Balance.**" >}}


## Limit Token Supply

Let's Limit your supply to prevent unlimited minting.

```
spl-token authorize 2LTQripZZZXekBg5311zu4zdzKr7VwiQ81RzVL62S72q mint --disable
```

## Transfer token to a browser wallet

```
spl-token transfer --fund-recipient tokenAddress transferAmount recipientAddress
```

```
spl-token transfer --fund-recipient 2LTQripZZZXekBg5311zu4zdzKr7VwiQ81RzVL62S72q 1000000 F7tHkHNUkM2R3w2A6fyVDK29m9y8oNx851nhYoa4SuRp
```

## Register your Token

To actually finish the creation of your Token we want to have it officially listed on the Solana Registry.

I am not going into details here, so feel free to check out my [pull request](https://github.com/solana-labs/token-list/pull/12779) at [github.com/solana-labs/token-list](https://github.com/solana-labs/token-list/) for reference.

But basically the only details you need for your PR are:

```json
"address": "2LTQripZZZXekBg5311zu4zdzKr7VwiQ81RzVL62S72q",
"symbol": "<yourTokenSymbol>",
"name": "<yourTokenName>",
"logoURI": "https://raw.githubusercontent.com/<yourLogoURI>.png",
```

Once your PR was merged you can see your token officiall listed on your Phantom wallet and the official solana.com registry (see [solscan.io](https://solscan.io/token/EmU2juRehuHHn3p2qwMbrPiupXdc3JrZdTD1aP5zyhrW) or [Solana Explorer](https://explorer.solana.com/address/EmU2juRehuHHn3p2qwMbrPiupXdc3JrZdTD1aP5zyhrW))

{{< image src="token-listing.png" caption="**Token Listing**" >}}

## Summary

Okay, let's summarize the whole thing again and show what we have done. We have created the following:

1. We created a Wallet Address: `8mNvt36N7bW3vuWJ3pFDTSWFp2i7fD1MF8bv6mTFMj8f` to be used as a so called Authority to fund the creation but also to mint our Token.
2. We created a Token (Address): `2LTQripZZZXekBg5311zu4zdzKr7VwiQ81RzVL62S72q` which is then associated to our Token Account: `CB7WEx4wtFiy6ftJWbaSvBfw1pbxe3wq65DjEbWmGRve`.
3. In the end we registered our Token `2LTQripZZZXekBg5311zu4zdzKr7VwiQ81RzVL62S72q` on the Solana Token Registry to make it available.

If you want to know how to create a secure wallet address, check out my post [Create a secure and anonymous Crypto Wallet](../create-a-secure-and-anonymous-wallet-address/).


{{< admonition info References >}}
- [Solana Token Program](https://spl.solana.com/token)
- [Create a secure and anonymous Crypto Wallet](../create-a-secure-and-anonymous-wallet-address/)
- [Hot and Cold Crypto Wallet (Address)](../hot-and-cold-wallet-address/)
- [Crypto Token, Coins and Mnemonics](../crypto-token-coins-and-mnemonics/)
- [Generate Bitcoin Address](https://bitaddress.org)
- [Generate Ethereum Address](https://myetherwallet.com)
- [How Jason Bourne Stores His Bitcoin](http://maxtaco.github.io/bitcoin/2014/01/16/how-jason-bourne-stores-his-bitcoin/)
- [Trusted Third Parties are Security Holes](https://nakamotoinstitute.org/trusted-third-parties/)
  {{< /admonition >}}
