# Example Contract Submissions

This directory contains contract entries for VinuChain Mainnet (Chain ID: 26600).

## File Naming

Each contract file should be named using the EIP55 checksummed contract address:

```
0xAbC1234567890123456789012345678901234567.json
```

## Example Entry

Here's an example of what a contract entry should look like:

**File:** `0x1234567890123456789012345678901234567890.json`

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
    "pausable": true,
    "max_supply": "1000000000000000000000000000"
  }
}
```

## Required Fields

- `project`: Must reference an existing project in `projects/`
- `name`: User-friendly display name
- `contract`: Exact contract name from source code

## Optional Fields

- `source`: Link to source code or documentation
- `tags`: Array of applicable tags (see README.md for full list)
- `features`: Object with additional contract metadata

## Verification

Before submitting, ensure:
1. Address is EIP55 checksummed
2. Project reference exists in `projects/`
3. JSON is valid and properly formatted
4. All required fields are present
5. Run `npm run validate` to check
