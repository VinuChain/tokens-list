# Example Project Submissions

This directory contains project metadata files.

## File Naming

Each project file should use a lowercase, hyphenated identifier:

```
my-awesome-project.json
vinuswap.json
example-defi-protocol.json
```

## Example Entry

Here's an example of what a project entry should look like:

**File:** `example-project.json`

```json
{
  "name": "Example Project",
  "website": "https://example.com",
  "description": "A decentralized finance protocol on VinuChain providing innovative yield farming solutions",
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
    "discord": "https://discord.gg/example",
    "medium": "https://medium.com/@example",
    "coingecko": "https://www.coingecko.com/en/coins/example",
    "coinmarketcap": "https://coinmarketcap.com/currencies/example"
  }
}
```

## Required Fields

- `name`: Official project or organization name
- `website`: Main project website URL

## Recommended Fields

- `description`: Brief project description (1-2 sentences)
- `security`: Security contact email for responsible disclosure
- `token`: Primary token information (if applicable)
- `social`: Social media and community links

## Token Object

If your project has a primary token, include:

- `chainId`: VinuChain chain ID (26600 for mainnet)
- `address`: EIP55 checksummed token address
- `symbol`: Token ticker symbol
- `name`: Full token name
- `decimals`: Number of decimal places
- `logoURI`: URL to token logo image (recommended: PNG, 128x128, transparent)

## Verification

Before submitting, ensure:
1. Filename is lowercase and hyphenated
2. All URLs are valid and accessible
3. Token address is EIP55 checksummed
4. JSON is valid and properly formatted
5. You are authorized to represent the project
6. Run `npm run validate` to check
