# Quick Start Guide

This guide will help you get started with the VinuChain Tokens List repository.

## For Users

### Viewing Token Information

1. Navigate to `tokens/` to browse registered tokens
2. Each token has its own folder named by its contract address (EIP55 checksummed)
3. Open the `.json` file within each folder to view token details

### Finding a Specific Token

```bash
# Navigate to a token by address
cd tokens/0x00c1E515EA9579856304198EFb15f525A0bb50f6/

# View token information
cat 0x00c1E515EA9579856304198EFb15f525A0bb50f6.json
```

## For Contributors

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/VinuChain/tokens-list.git
cd tokens-list

# Install dependencies
npm install

# Run validation
npm run validate
```

### Submitting a Token

#### Option 1: Using GitHub Issue Form (Recommended)

1. Go to [Issues → New Issue](../../issues/new/choose)
2. Select "Token Submission"
3. Fill out the form with your token details
4. Submit and wait for review

#### Option 2: Manual Submission

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/tokens-list.git
cd tokens-list

# 2. Create a new branch
git checkout -b add-my-token

# 3. Create token directory and file
mkdir -p tokens/0xYourChecksummedAddress

# 4. Create token JSON file
cat > tokens/0xYourChecksummedAddress/0xYourChecksummedAddress.json << 'EOF'
{
  "symbol": "SYMBOL",
  "name": "Your Token Name",
  "address": "0xYourChecksummedAddress",
  "decimals": 18,
  "logoURI": "https://yourproject.com/logo.png",
  "website": "https://yourproject.com"
}
EOF

# 5. Validate your submission
npm run validate

# 6. Commit and push
git add .
git commit -m "Add YourToken"
git push origin add-my-token

# 7. Create a pull request on GitHub
```

## For Developers

### Using the Token List in Your App

#### JavaScript/TypeScript

```javascript
// Fetch token data by address
const tokenAddress = '0x00c1E515EA9579856304198EFb15f525A0bb50f6';
const tokenData = await fetch(
  `https://raw.githubusercontent.com/VinuChain/tokens-list/main/tokens/${tokenAddress}/${tokenAddress}.json`
).then(res => res.json());

console.log(tokenData.symbol);    // Token symbol
console.log(tokenData.name);      // Token name
console.log(tokenData.decimals);  // Token decimals
console.log(tokenData.logoURI);   // Token logo URL
```

#### Fetching All Tokens

```javascript
// Note: You'll need to implement directory listing
// or use the GitHub API to list all token directories

const response = await fetch(
  'https://api.github.com/repos/VinuChain/tokens-list/contents/tokens'
);
const tokenDirs = await response.json();

// Fetch each token's data
const tokens = await Promise.all(
  tokenDirs.map(async (dir) => {
    const address = dir.name;
    const tokenData = await fetch(
      `https://raw.githubusercontent.com/VinuChain/tokens-list/main/tokens/${address}/${address}.json`
    ).then(res => res.json());
    return tokenData;
  })
);

console.log(`Found ${tokens.length} tokens`);
```

### Validation

The validation script checks:

```bash
npm run validate
```

- ✅ JSON syntax and formatting
- ✅ Schema compliance (required fields, data types)
- ✅ Address checksums (EIP-55)
- ✅ Directory and filename match address
- ✅ No duplicate addresses
- ⚠️  Duplicate symbols (warning only)

## Common Tasks

### Check Address Checksum

Use an online tool like [EthSum](https://ethsum.netlify.app/) or use ethers.js:

```javascript
import { getAddress } from 'ethers';

const checksummed = getAddress('0xabcd...'); // Returns EIP55 checksummed
```

### Validate JSON Format

```bash
# Use jq to validate and format JSON
cat tokens/0xAddress/0xAddress.json | jq .
```

### Find Token by Symbol

```bash
# Search for a token by symbol (case-insensitive)
grep -r "\"symbol\": \"VINU\"" tokens/
```

## Getting Help

- 📖 **Documentation**: [README.md](README.md)
- 🤝 **Contributing**: [CONTRIBUTING.md](CONTRIBUTING.md)
- 🔒 **Security**: [SECURITY.md](SECURITY.md)
- 💬 **Discord**: https://discord.gg/vinuchain
- 📧 **Email**: community@vinuchain.org

## Next Steps

1. ⭐ Star this repository
2. 📝 Read the full [README.md](README.md)
3. 🔍 Browse existing [tokens](tokens/)
4. ➕ Submit your token
5. 🤝 Join the [VinuChain community](https://discord.gg/vinuchain)

## Troubleshooting

### Validation Fails

```bash
# Install dependencies
npm install

# Run validation with verbose output
npm run validate

# Check specific JSON file
cat tokens/0xAddress/0xAddress.json | jq .
```

### Address Not Checksummed

Use [EthSum](https://ethsum.netlify.app/) or ethers.js to get the proper checksum:

```javascript
import { getAddress } from 'ethers';
console.log(getAddress('0xabcd1234...')); // Properly checksummed
```

### Directory and Filename Mismatch

Ensure the directory name matches the filename:

```bash
# Correct structure
tokens/0x00c1E515EA9579856304198EFb15f525A0bb50f6/
  └── 0x00c1E515EA9579856304198EFb15f525A0bb50f6.json

# Incorrect - filename doesn't match directory
tokens/0x00c1E515EA9579856304198EFb15f525A0bb50f6/
  └── token.json  # ❌ Wrong!
```

### Address in JSON Doesn't Match Folder

Ensure the `address` field in your JSON matches the folder name:

```json
{
  "symbol": "VINU",
  "name": "Vita Inu",
  "address": "0x00c1E515EA9579856304198EFb15f525A0bb50f6",  // Must match folder name
  "decimals": 18
}
```

---

Ready to contribute? [Submit your first token →](../../issues/new/choose)
