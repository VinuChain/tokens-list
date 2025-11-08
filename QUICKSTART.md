# Quick Start Guide

This guide will help you get started with the VinuChain Token List repository.

## For Users

### Viewing Contract Information

1. Navigate to `contracts/26600/` to browse VinuChain mainnet contracts
2. Each file is named by its contract address (EIP55 checksummed)
3. Open any `.json` file to view contract details

### Viewing Project Information

1. Navigate to `projects/` to browse registered projects
2. Each file contains project metadata, social links, and token information
3. Files are named using lowercase, hyphenated identifiers

## For Contributors

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Git

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/VinuChain/vinuchain-tokens.git
cd vinuchain-tokens

# Install dependencies
npm install

# Run validation
npm run validate
```

### Submitting a Contract

#### Option 1: Using GitHub Issue Form

1. Go to [Issues → New Issue](../../issues/new/choose)
2. Select "Contract Submission"
3. Fill out the form
4. Submit and wait for review

#### Option 2: Manual Submission

```bash
# 1. Fork and clone the repository
git clone https://github.com/YOUR_USERNAME/vinuchain-tokens.git
cd vinuchain-tokens

# 2. Create a new branch
git checkout -b add-my-contract

# 3. Create your contract file
# contracts/26600/0xYourChecksummedAddress.json
cat > contracts/26600/0xYourAddress.json << 'EOF'
{
  "project": "your-project",
  "name": "Your Token",
  "contract": "YourToken",
  "source": "https://github.com/yourproject/contracts",
  "tags": ["token", "erc20"]
}
EOF

# 4. Validate your submission
npm run validate

# 5. Commit and push
git add .
git commit -m "Add YourToken contract"
git push origin add-my-contract

# 6. Create a pull request on GitHub
```

### Submitting a Project

```bash
# 1. Create your project file
# projects/your-project.json
cat > projects/your-project.json << 'EOF'
{
  "name": "Your Project",
  "website": "https://yourproject.com",
  "description": "Your project description",
  "security": "security@yourproject.com",
  "token": {
    "chainId": 26600,
    "address": "0xYourTokenAddress",
    "symbol": "SYMBOL",
    "name": "Token Name",
    "decimals": 18
  },
  "social": {
    "github": "https://github.com/yourproject",
    "twitter": "https://twitter.com/yourproject"
  }
}
EOF

# 2. Validate
npm run validate

# 3. Commit and create PR
git add .
git commit -m "Add YourProject metadata"
git push origin add-my-project
```

## For Developers

### Using the Token List in Your App

#### JavaScript/TypeScript

```javascript
// Fetch all contracts for a specific chain
const chainId = 26600;
const response = await fetch(
  `https://raw.githubusercontent.com/VinuChain/vinuchain-tokens/main/contracts/${chainId}/`
);

// Parse contract data
const contractAddress = '0xYourContractAddress';
const contractData = await fetch(
  `https://raw.githubusercontent.com/VinuChain/vinuchain-tokens/main/contracts/${chainId}/${contractAddress}.json`
).then(res => res.json());

console.log(contractData.name); // Display name
console.log(contractData.tags); // Contract tags
```

#### Fetching Project Information

```javascript
const projectId = 'your-project';
const projectData = await fetch(
  `https://raw.githubusercontent.com/VinuChain/vinuchain-tokens/main/projects/${projectId}.json`
).then(res => res.json());

console.log(projectData.name);     // Project name
console.log(projectData.website);  // Website URL
console.log(projectData.token);    // Token information
console.log(projectData.social);   // Social links
```

### Validation

The validation script checks:

```bash
npm run validate
```

- ✅ JSON syntax and formatting
- ✅ Schema compliance
- ✅ Address checksums
- ✅ Project reference integrity
- ✅ Filename conventions

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
cat your-file.json | jq .
```

### Find a Project's Security Contact

```bash
# Using jq to extract security email
cat projects/your-project.json | jq -r '.security'
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
3. 🔍 Browse existing [contracts](contracts/) and [projects](projects/)
4. ➕ Submit your contract or project
5. 🤝 Join the [VinuChain community](https://discord.gg/vinuchain)

## Troubleshooting

### Validation Fails

```bash
# Install dependencies
npm install

# Run validation with verbose output
npm run validate

# Check specific JSON file
cat contracts/26600/0xAddress.json | jq .
```

### Address Not Checksummed

Use [EthSum](https://ethsum.netlify.app/) or ethers.js to get the proper checksum:

```javascript
import { getAddress } from 'ethers';
console.log(getAddress('0xabcd1234...')); // Properly checksummed
```

### Project Reference Not Found

Ensure the project file exists:

```bash
# Check if project exists
ls -la projects/your-project.json

# If not, create it first
cat > projects/your-project.json << 'EOF'
{
  "name": "Your Project",
  "website": "https://yourproject.com"
}
EOF
```

---

Ready to contribute? [Submit your first contract →](../../issues/new/choose)
