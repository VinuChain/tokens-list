# Contributing to VinuChain Tokens List

Thank you for your interest in contributing to the VinuChain Tokens List! This guide will help you add your token to the registry.

## Table of Contents

- [Before You Begin](#before-you-begin)
- [Contribution Methods](#contribution-methods)
- [Submission Guidelines](#submission-guidelines)
- [File Format Requirements](#file-format-requirements)
- [Verification Process](#verification-process)
- [Best Practices](#best-practices)

## Before You Begin

### Prerequisites

- Your token must be deployed on VinuChain (Chain ID: 207)
- Token should be verified on the block explorer when possible
- You should have authorization to represent the token/project
- Prepare all required information (see below)

### Required Information

- **Token Symbol** - Uppercase ticker (1-20 characters)
- **Token Name** - Full token name (1-100 characters)
- **Contract Address** - EIP-55 checksummed address
- **Decimals** - Number of decimal places (0-18)

### Optional Information

- Logo URI (200x200px PNG recommended)
- Website URL
- Support email
- GitHub repository
- Social media links (Twitter, Telegram, Discord)
- Exchange listings (CoinGecko, CoinMarketCap)

## Contribution Methods

### Method 1: Issue Template (Recommended for Most Users)

This is the easiest method for adding your token:

1. Go to [Issues](https://github.com/VinuChain/tokens-list/issues/new/choose)
2. Select "Token Submission"
3. Fill out the form with your token information
4. Submit the issue
5. Our team will review and create a PR on your behalf

### Method 2: Direct Pull Request (For Technical Users)

If you're comfortable with Git and JSON:

1. **Fork the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/tokens-list.git
   cd tokens-list
   ```

2. **Create a new branch**
   ```bash
   git checkout -b add-your-token-symbol
   ```

3. **Create token directory**
   ```bash
   # Use your EIP-55 checksummed address
   mkdir -p tokens/0xYourChecksummedAddress
   ```

4. **Create token JSON file**

   Create `tokens/0xYourChecksummedAddress/0xYourChecksummedAddress.json`:
   
   ```json
   {
     "symbol": "SYMBOL",
     "name": "Your Token Name",
     "address": "0xYourChecksummedAddress",
     "decimals": 18,
     "logoURI": "https://yourproject.com/logo.png",
     "website": "https://yourproject.com",
     "support": "support@yourproject.com",
     "github": "https://github.com/yourproject",
     "twitter": "https://twitter.com/yourproject",
     "telegram": "https://t.me/yourproject",
     "discord": "https://discord.gg/yourproject",
     "coingecko": "https://www.coingecko.com/en/coins/yourtoken",
     "coinmarketcap": "https://coinmarketcap.com/currencies/yourtoken/"
   }
   ```

5. **Validate your submission**
   ```bash
   npm install
   npm run validate
   ```

6. **Commit and push**
   ```bash
   git add tokens/
   git commit -m "Add YourToken (SYMBOL)"
   git push origin add-your-token-symbol
   ```

7. **Create a pull request**
   - Go to GitHub and create a PR from your branch
   - Fill out the PR template
   - Wait for review

## Submission Guidelines

### Address Requirements

- **Must be EIP-55 checksummed**
  - Use [EthSum](https://ethsum.netlify.app/) or ethers.js to verify
  - Example: `0x00c1E515EA9579856304198EFb15f525A0bb50f6` ✅
  - Example: `0x00c1e515ea9579856304198efb15f525a0bb50f6` ❌

- **Must be deployed on VinuChain**
  - Verify on [VinuExplorer](https://vinuexplorer.org)
  - Chain ID must be 207

### File Structure Requirements

- **Directory name must match address**
  ```
  tokens/0xYourAddress/
  ```

- **Filename must match address**
  ```
  tokens/0xYourAddress/0xYourAddress.json
  ```

- **Address in JSON must match directory/filename**
  ```json
  {
    "address": "0xYourAddress"  // Must match exactly
  }
  ```

### Logo Requirements

If providing a logo:

- **Format**: PNG or SVG
- **Size**: 200x200px recommended (max 512x512px)
- **Background**: Transparent preferred
- **Hosting**: HTTPS required (IPFS acceptable)
- **File size**: < 100KB recommended

### URL Requirements

All URLs must be:

- Valid HTTPS URLs (except Telegram which uses `t.me`)
- Publicly accessible
- Official project URLs (not aggregators or forks)

## File Format Requirements

### Required Fields

```json
{
  "symbol": "VINU",              // Uppercase, 1-20 chars
  "name": "Vita Inu",            // 1-100 chars
  "address": "0x...",            // EIP-55 checksummed
  "decimals": 18                 // Integer, 0-18
}
```

### Optional Fields

```json
{
  "logoURI": "https://...",      // HTTPS URL
  "website": "https://...",      // HTTPS URL
  "support": "email@domain.com", // Valid email
  "github": "https://github.com/...",
  "twitter": "https://twitter.com/...",
  "telegram": "https://t.me/...",
  "discord": "https://discord.gg/...",
  "coingecko": "https://www.coingecko.com/...",
  "coinmarketcap": "https://coinmarketcap.com/..."
}
```

## Verification Process

### Automated Checks

When you submit a PR, GitHub Actions will automatically:

1. ✅ Validate JSON syntax
2. ✅ Check schema compliance
3. ✅ Verify EIP-55 checksum
4. ✅ Confirm directory/filename match
5. ✅ Check for duplicate addresses
6. ⚠️  Warn about duplicate symbols

### Manual Review

Our team will review:

1. **Authorization** - Are you authorized to submit this token?
2. **Accuracy** - Is the information correct and complete?
3. **Contract verification** - Is the contract verified on block explorer?
4. **Legitimacy** - Is this a legitimate project (not a scam)?
5. **URLs** - Are all URLs valid and official?

### Timeline

- **Initial response**: Within 48 hours
- **Review completion**: Within 1 week for most submissions
- **Complex cases**: May take longer if additional verification needed

## Best Practices

### Do's ✅

- Use official project information
- Verify contract address multiple times
- Test your JSON with `npm run validate`
- Provide complete information
- Use high-quality logos
- Keep information up-to-date

### Don'ts ❌

- Submit tokens you don't represent
- Use incorrect or fake information
- Submit scam/fraudulent tokens
- Use low-quality or copyrighted logos
- Include referral links
- Submit duplicate entries

## Common Issues

### Address Checksum Errors

```bash
# Get proper checksum using ethers.js
npm install ethers
node -e "console.log(require('ethers').getAddress('0xabcd...'))"
```

### JSON Syntax Errors

```bash
# Validate JSON using jq
cat tokens/0xAddress/0xAddress.json | jq .
```

### Directory Structure Errors

```bash
# Correct structure
tokens/0x00c1E515EA9579856304198EFb15f525A0bb50f6/
  └── 0x00c1E515EA9579856304198EFb15f525A0bb50f6.json

# Incorrect structure ❌
tokens/vinu/0x00c1E515EA9579856304198EFb15f525A0bb50f6.json
```

## Updating Token Information

To update existing token information:

1. Fork the repository
2. Update the token's JSON file
3. Run validation: `npm run validate`
4. Create a PR with description of changes
5. Provide evidence/authorization for changes

## Removing Tokens

Tokens may be removed if:

- Requested by authorized project representative
- Contract is identified as fraudulent/scam
- Project is abandoned or defunct
- Information cannot be verified

To request removal, open an issue with evidence and authorization.

## Getting Help

Need help with your submission?

- 📖 Read the [QUICKSTART.md](QUICKSTART.md)
- 💬 Ask in [Discussions](../../discussions)
- 📧 Email: community@vinuchain.org
- 🔒 Security issues: security@vinuchain.org

## Code of Conduct

This project follows our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you agree to uphold this code.

## Questions?

If you have questions about contributing:

- Check [QUICKSTART.md](QUICKSTART.md)
- Browse existing [tokens](tokens/)
- Open a [Discussion](../../discussions)
- Contact: community@vinuchain.org

---

Ready to contribute? [Submit your token →](../../issues/new/choose)
