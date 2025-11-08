# Contributing to VinuChain Token List

Thank you for your interest in contributing to the VinuChain Token List! This guide will help you add your project or contract to the registry.

## Table of Contents

- [Before You Begin](#before-you-begin)
- [Contribution Methods](#contribution-methods)
- [Submission Guidelines](#submission-guidelines)
- [File Format Requirements](#file-format-requirements)
- [Verification Process](#verification-process)
- [Best Practices](#best-practices)

## Before You Begin

### Prerequisites

- Your contract must be deployed on VinuChain (Chain ID: 26600)
- Contract should be verified on the block explorer when possible
- You should have authorization to represent the project
- Prepare all required information (see below)

### Required Information

For **Projects**:
- Project name and website
- Contact email addresses (general and security)
- Token details (if applicable)
- Social media links

For **Contracts**:
- Contract address (EIP55 checksummed)
- Project association
- Contract name and user-friendly name
- Source code URL (GitHub, block explorer, etc.)
- Relevant tags

## Contribution Methods

### Method 1: Issue Template (Recommended for Most Users)

This is the easiest method for adding your project:

1. Go to [Issues](../../issues/new/choose)
2. Select "Add New Token/Contract"
3. Fill out the form with your project information
4. Submit the issue
5. Our team will review and create a PR on your behalf

### Method 2: Direct Pull Request (For Technical Users)

If you're comfortable with Git and JSON:

1. **Fork the repository**
   ```bash
   git clone https://github.com/VinuChain/vinuchain-tokens.git
   cd vinuchain-tokens
   ```

2. **Create a new branch**
   ```bash
   git checkout -b add-your-project-name
   ```

3. **Add your project file**

   Create `projects/your-project-name.json`:
   ```json
   {
     "name": "Your Project Name",
     "website": "https://yourproject.com",
     "description": "Brief description of your project",
     "contact": "contact@yourproject.com",
     "security": "security@yourproject.com",
     "token": {
       "chainId": 26600,
       "address": "0xYourTokenAddress",
       "symbol": "SYMBOL",
       "name": "Token Name",
       "decimals": 18,
       "logoURI": "https://yourproject.com/logo.png"
     },
     "social": {
       "github": "https://github.com/yourproject",
       "twitter": "https://twitter.com/yourproject",
       "telegram": "https://t.me/yourproject"
     }
   }
   ```

4. **Add your contract files**

   Create `contracts/26600/0xYourContractAddress.json`:
   ```json
   {
     "project": "your-project-name",
     "name": "Your Contract Name",
     "contract": "ContractName",
     "source": "https://github.com/yourproject/contracts",
     "tags": ["token", "erc20"]
   }
   ```

5. **Validate your JSON**
   ```bash
   npm install
   npm run validate
   ```

6. **Commit and push**
   ```bash
   git add .
   git commit -m "Add YourProjectName"
   git push origin add-your-project-name
   ```

7. **Create a Pull Request**

   Go to GitHub and create a PR from your branch to the main repository

### Method 3: Sourcify Integration (Automated)

For contracts verified on Sourcify:

1. Add the security contact tag to your Solidity contract:
   ```solidity
   /// @custom:security-contact security@yourproject.com
   contract YourContract {
       // Your contract code
   }
   ```

2. Verify your contract on [Sourcify](https://sourcify.dev/)

3. Your contract will be automatically included in future imports

## Submission Guidelines

### Project Naming Convention

- Use lowercase with hyphens: `example-project`
- Keep it short but descriptive
- Avoid special characters

### Address Format

- All addresses must be EIP55 checksummed
- Use tools like [ethsum](https://ethsum.netlify.app/) to checksum addresses
- Example: `0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed`

### Logo Requirements

- Format: PNG or SVG preferred
- Size: Square aspect ratio, at least 256x256px
- Hosting: Must be publicly accessible via HTTPS
- Content: Clear, recognizable logo without text

### Tags

Choose appropriate tags for your contract:

**Token Standards:**
- `token` - General token
- `erc20` - ERC20 token
- `erc721` - ERC721 NFT
- `erc1155` - ERC1155 multi-token

**Contract Types:**
- `factory` - Deploys other contracts
- `proxy` - Proxy contract
- `implementation` - Implementation contract
- `governance` - Governance contract
- `staking` - Staking contract
- `vault` - Vault/treasury
- `router` - DEX router
- `oracle` - Price oracle
- `bridge` - Cross-chain bridge
- `multisig` - Multi-signature wallet
- `timelock` - Timelock contract

## File Format Requirements

### Project File Structure

```json
{
  "name": "string (required)",
  "website": "string/uri (required)",
  "description": "string (optional)",
  "contact": "string/email (optional)",
  "security": "string/email (recommended)",
  "token": {
    "chainId": 26600,
    "address": "string (checksummed)",
    "symbol": "string",
    "name": "string",
    "decimals": 18,
    "logoURI": "string/uri"
  },
  "social": {
    "github": "string/uri",
    "twitter": "string/uri",
    "telegram": "string/uri",
    "discord": "string/uri",
    "medium": "string/uri"
  }
}
```

### Contract File Structure

```json
{
  "project": "string (required)",
  "name": "string (required)",
  "contract": "string (required)",
  "source": "string/uri (optional)",
  "tags": ["array of strings"],
  "features": {
    "custom": "metadata"
  }
}
```

## Verification Process

### What We Check

1. **Schema Validation**: JSON files must validate against our schemas
2. **Address Verification**: Contract must exist on VinuChain
3. **Authorization**: Submission should come from official project account
4. **Uniqueness**: No duplicate entries
5. **Accuracy**: Information matches on-chain data

### Review Timeline

- Most PRs are reviewed within 3-5 business days
- Complex submissions may require additional verification
- You may be asked for additional proof of authorization

### Proof of Authorization

If submitting from a non-official account, provide one of:

- Message signed by the contract deployer address
- Tweet from official project account mentioning the PR
- Email from official domain confirming the submission
- GitHub organization membership

## Best Practices

### Security Contact

Always provide a security contact email. This helps:
- Responsible disclosure of vulnerabilities
- Quick communication in case of security issues
- Building trust with the community

### Keep Information Updated

- Submit PRs to update outdated information
- Notify us of rebranding or URL changes
- Update security contacts promptly

### Source Code Links

Provide links to:
- GitHub repository (preferred)
- Block explorer verification
- Documentation
- Audit reports

### Complete Your Project Profile

The more information you provide, the more useful your listing:
- Add all relevant social media links
- Include a clear, concise description
- Use high-quality logos
- Tag contracts appropriately

## Common Mistakes to Avoid

- L Non-checksummed addresses
- L Invalid JSON format
- L Missing required fields
- L Broken links
- L Incorrect chain ID
- L Duplicate entries
- L Unauthorized submissions

## Getting Help

If you need assistance:

1. Check existing issues and PRs for examples
2. Review the [README](README.md) for format details
3. Open an issue with the "question" label
4. Join our community channels for support

## Code of Conduct

- Be respectful and professional
- Provide accurate information
- Don't submit spam or scam projects
- Report security issues responsibly
- Help others in the community

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to the VinuChain ecosystem!
