# VinuChain Token List

A comprehensive registry of verified smart contracts and tokens deployed on VinuChain. This repository helps identify deployed contract instances and provides security contact information for responsible disclosure.

## Purpose

This repository serves two primary functions:

1. **Contract Identification**: Map contract addresses to their respective projects, helping users identify contracts they interact with
2. **Security Contact Registry**: Maintain up-to-date security contact information for vulnerability disclosure

## Repository Structure

```
vinuchain-tokens/
├── contracts/          # Contract entries organized by chain ID
│   └── CHAINID/       # EIP155 chain identifier
│       └── ADDRESS.json  # EIP55 checksummed contract address
├── projects/          # Project metadata files
│   └── PROJECT.json   # Project information
├── schemas/           # JSON Schema validation files
│   ├── contract.schema.json
│   └── project.schema.json
└── scripts/           # Utility scripts for validation and management
```

## Contract Entry Format

Contract files are located at `contracts/CHAINID/ADDRESS.json` where:
- `CHAINID` is the EIP155 chain identifier for VinuChain
- `ADDRESS` is the EIP55 checksummed contract address

Example (`contracts/26600/0x1234567890123456789012345678901234567890.json`):

```json
{
  "project": "example-project",
  "name": "Example Token",
  "contract": "ExampleToken",
  "source": "https://github.com/example/contracts/blob/main/ExampleToken.sol",
  "tags": ["token", "erc20"],
  "features": {
    "mintable": true,
    "burnable": true,
    "pausable": true
  }
}
```

### Required Fields

- `project`: Reference to the project file (without .json extension)
- `name`: User-friendly name for the contract
- `contract`: Contract name as it appears in the source code

### Optional Fields

- `source`: URL to contract source code or documentation
- `tags`: Array of tags describing the contract (e.g., "factory", "proxy", "token", "nft")
- `features`: Object containing additional metadata

### Available Tags

- `factory` - Factory contract that deploys other contracts
- `proxy` - Proxy contract for upgradeable patterns
- `implementation` - Implementation contract behind a proxy
- `token` - Token contract
- `nft` - NFT/collectible contract
- `erc20` - ERC20 token standard
- `erc721` - ERC721 NFT standard
- `erc1155` - ERC1155 multi-token standard
- `governance` - Governance contract
- `staking` - Staking contract
- `vault` - Vault or treasury contract
- `router` - DEX router or similar
- `oracle` - Price oracle or data feed
- `bridge` - Cross-chain bridge
- `multisig` - Multi-signature wallet
- `timelock` - Timelock contract

## Project Entry Format

Project files are located at `projects/PROJECT.json` where `PROJECT` is a lowercase, hyphenated identifier.

Example (`projects/example-project.json`):

```json
{
  "name": "Example Project",
  "website": "https://example.com",
  "description": "A decentralized finance protocol on VinuChain",
  "contact": "contact@example.com",
  "security": "security@example.com",
  "token": {
    "chainId": 26600,
    "address": "0x1234567890123456789012345678901234567890",
    "symbol": "EXAMPLE",
    "name": "Example Token",
    "decimals": 18,
    "logoURI": "https://example.com/logo.png"
  },
  "social": {
    "github": "https://github.com/example",
    "twitter": "https://twitter.com/example",
    "telegram": "https://t.me/example",
    "discord": "https://discord.gg/example"
  }
}
```

### Required Fields

- `name`: Project or organization name
- `website`: Main website URL

### Optional Fields

- `description`: Brief description of the project
- `contact`: General contact email
- `security`: Security contact email for vulnerability disclosure
- `token`: Primary token information
- `social`: Social media and community links

## How to Contribute

### Option 1: Submission Form (Recommended)

Use our GitHub issue template to submit a new contract or project. This will automatically create a pull request for review.

[Create a new submission](../../issues/new/choose)

### Option 2: Direct Pull Request

1. Fork this repository
2. Add your contract file to `contracts/CHAINID/ADDRESS.json`
3. Add or update the project file in `projects/PROJECT.json`
4. Ensure your JSON files validate against the schemas
5. Submit a pull request

### Option 3: Sourcify Integration

Add the `@custom:security-contact` NatSpec tag to your Solidity contracts:

```solidity
/// @custom:security-contact security@yourproject.com
contract YourContract {
    // ...
}
```

Then verify your contract on [Sourcify](https://sourcify.dev/) for automatic inclusion in future imports.

## Verification

To maintain quality and security:

1. **GitHub Account**: Submissions should come from the project's official GitHub account when possible
2. **Proof of Authorization**: Additional verification may be required for submissions from non-official accounts
3. **Schema Validation**: All JSON files must validate against the defined schemas
4. **Address Checksum**: Contract addresses must be EIP55 checksummed

## VinuChain Information

- **Chain Name**: VinuChain
- **Chain ID**: 26600 (Mainnet)
- **Native Token**: VINU
- **Block Explorer**: [VinuScan](https://vinuscan.com)
- **RPC Endpoint**: https://vinuchain-rpc.com

## Scripts

### Validate Schemas

```bash
npm install
npm run validate
```

### Add New Contract

```bash
npm run add-contract -- --chain 26600 --address 0x... --project example-project
```

## Security

If you discover a security vulnerability within this repository or need to report a vulnerability in a listed contract, please:

1. For repository issues: Send an email to security@vinuchain.org
2. For contract vulnerabilities: Use the security contact listed in the project's metadata

All security vulnerabilities will be promptly addressed.

## Disclaimer

This token list is maintained by volunteers in the VinuChain community. While we strive for accuracy, the information may not always be up to date. Always verify token information independently before making any transactions.

**Use at your own risk.** The maintainers of this repository are not responsible for any losses or damages resulting from the use of this information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Maintainers

This repository is maintained by the VinuChain community. If you have questions or need assistance, please open an issue or contact the community channels.

## Acknowledgments

This repository structure is inspired by the [ethereum-lists/contracts](https://github.com/ethereum-lists/contracts) repository maintained by OpenZeppelin and Dune Analytics.
