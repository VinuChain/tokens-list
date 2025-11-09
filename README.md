# VinuChain Tokens List

[![Validate](https://github.com/VinuChain/tokens-list/actions/workflows/validate.yml/badge.svg)](https://github.com/VinuChain/tokens-list/actions/workflows/validate.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![GitHub issues](https://img.shields.io/github/issues/VinuChain/tokens-list)](https://github.com/VinuChain/tokens-list/issues)
[![GitHub pull requests](https://img.shields.io/github/issues-pr/VinuChain/tokens-list)](https://github.com/VinuChain/tokens-list/pulls)

A comprehensive, community-maintained registry of verified ERC-20 tokens deployed on VinuChain. This repository follows the [ethereum-lists/tokens](https://github.com/ethereum-lists/tokens) format for maximum compatibility with wallets and DApps.

## Overview

This repository provides a standardized, validated list of tokens on VinuChain, designed for integration into:

- Cryptocurrency wallets (MetaMask, Trust Wallet, etc.)
- Decentralized exchanges (DEXs)
- Portfolio trackers
- Block explorers
- DApps and smart contract interfaces

## Repository Structure

```
tokens-list/
├── tokens/                    # Token entries by contract address
│   └── 0xADDRESS/            # Each token has its own folder
│       └── 0xADDRESS.json    # Token metadata file
├── schemas/
│   └── token.schema.json      # JSON schema for validation
├── scripts/
│   └── validate.js            # Validation script
└── .github/
    ├── workflows/
    │   └── validate.yml       # CI/CD validation
    └── ISSUE_TEMPLATE/
        └── token-submission.yml  # Token submission form
```

## Token File Format

Each token is represented by a single JSON file in its own folder named by the contract address.

**Location**: `tokens/0xAddress/0xAddress.json`

```json
{
  "symbol": "VINU",
  "name": "Vita Inu",
  "address": "0x00c1E515EA9579856304198EFb15f525A0bb50f6",
  "decimals": 18,
  "logoURI": "https://vitainu.org/logo.png",
  "website": "https://vitainu.org",
  "support": "support@vitainu.org",
  "github": "https://github.com/vita-inu",
  "twitter": "https://twitter.com/vitainu",
  "telegram": "https://t.me/vitainu",
  "discord": "https://discord.gg/vitainu",
  "coingecko": "https://www.coingecko.com/en/coins/vita-inu",
  "coinmarketcap": "https://coinmarketcap.com/currencies/vita-inu/"
}
```

### Required Fields

- **symbol**: Token symbol/ticker (uppercase, 1-20 chars)
- **name**: Full token name (1-100 chars)
- **address**: EIP-55 checksummed contract address
- **decimals**: Number of decimal places (0-18)

### Optional Fields

- **logoURI**: HTTPS URL to token logo (recommended 200x200px PNG with transparency)
- **website**: Official project website
- **support**: Support email address
- **github**: GitHub repository URL
- **twitter**: Twitter/X profile URL
- **telegram**: Telegram group URL
- **discord**: Discord server URL
- **coingecko**: CoinGecko listing URL
- **coinmarketcap**: CoinMarketCap listing URL
- **redFlags**: Array of security warnings (use sparingly with evidence)

## How to Add Your Token

### Quick Start

1. **Fork** this repository
2. **Create** a new folder: `tokens/0xYOUR_ADDRESS/`
3. **Create** token file: `tokens/0xYOUR_ADDRESS/0xYOUR_ADDRESS.json`
4. **Fill in** your token details (see template above)
5. **Validate** locally: `npm run validate`
6. **Submit** a Pull Request

### Detailed Instructions

See [CONTRIBUTING.md](CONTRIBUTING.md) for comprehensive guidelines.

### Requirements

- Token must be deployed on VinuChain (Chain ID: 207)
- Contract should be verified on VinuChain block explorer when possible
- Address must be EIP-55 checksummed
- Logo should be hosted on HTTPS (IPFS acceptable)
- All URLs must be valid and accessible

## Using This Token List

### In Your Application

```javascript
// Fetch token by address
const address = '0x00c1E515EA9579856304198EFb15f525A0bb50f6';
const token = await fetch(
  `https://raw.githubusercontent.com/VinuChain/tokens-list/main/tokens/${address}/${address}.json`
).then(res => res.json());

console.log(token.symbol);  // "VINU"
console.log(token.name);    // "Vita Inu"
```

### In MetaMask

Add tokens to MetaMask using this list:

1. Copy the contract address from the token file
2. Import token in MetaMask
3. MetaMask will auto-fetch token details

### In Your DApp

```javascript
import { ethers } from 'ethers';

// Load token list
const tokenList = await loadTokenList();

// Get token by address
const token = tokenList.find(t => t.address.toLowerCase() === address.toLowerCase());

// Display token info
console.log(`${token.symbol} - ${token.name}`);
```

## Validation

All submissions are automatically validated using JSON Schema:

```bash
npm install
npm run validate
```

Validation checks:
- ✅ JSON syntax and structure
- ✅ Required fields present
- ✅ EIP-55 address checksums
- ✅ Directory and filename match
- ✅ No duplicate addresses
- ✅ URL format validity

## VinuChain Information

- **Chain Name**: VinuChain
- **Chain ID**: 207 (Mainnet)
- **Native Token**: VC
- **Block Explorer**: [VinuExplorer](https://vinuexplorer.org)
- **RPC Endpoint**: https://vinuchain-rpc.com

## Security

If you discover a security vulnerability within this repository or need to report a vulnerability in a listed token, please:

1. For repository issues: Send an email to security@vinuchain.org
2. For token vulnerabilities: Contact the token project directly using their listed support email

All security vulnerabilities will be promptly addressed.

## Disclaimer

This token list is maintained by volunteers in the VinuChain community. While we strive for accuracy, the information may not always be up to date. Always verify token information independently before making any transactions.

**Use at your own risk.** The maintainers of this repository are not responsible for any losses or damages resulting from the use of this information.

## Contributing

We welcome contributions from the community! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) guide for details on:

- How to submit tokens
- Code of conduct
- Review process
- Best practices

## Scripts

### Validate Tokens

```bash
npm install
npm run validate
```

### Check Address Checksum

```bash
# Using ethers.js
npm install ethers
node -e "console.log(require('ethers').getAddress('0xabcd...'))"
```

## Community

- 💬 **Discord**: https://discord.gg/vinuchain
- 🐦 **Twitter**: https://twitter.com/vinuchain
- 📱 **Telegram**: https://t.me/vinuchain
- 🌐 **Website**: https://vinuchain.org

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Maintainers

This repository is maintained by the VinuChain community. If you have questions or need assistance, please open an issue or contact the community channels.

## Acknowledgments

This repository structure is inspired by:
- [ethereum-lists/tokens](https://github.com/ethereum-lists/tokens) - Ethereum token list standard
- [Uniswap/token-lists](https://github.com/Uniswap/token-lists) - Token list schema standard

---

⭐ Star this repo | 📝 [Submit a token](../../issues/new/choose) | 🤝 [Join the community](https://discord.gg/vinuchain)
