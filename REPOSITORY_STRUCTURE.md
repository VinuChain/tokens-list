# VinuChain Token List - Repository Structure

```
vinuchain-tokens/
│
├── .github/                          # GitHub configuration
│   ├── ISSUE_TEMPLATE/              # Issue templates for submissions
│   │   ├── contract-submission.yml  # Contract submission form
│   │   ├── project-submission.yml   # Project submission form
│   │   └── config.yml               # Issue template configuration
│   ├── workflows/                   # GitHub Actions workflows
│   │   └── validate.yml             # Automated validation workflow
│   └── pull_request_template.md     # PR template
│
├── contracts/                        # Contract entries by chain ID
│   └── 26600/                       # VinuChain Mainnet (Chain ID: 26600)
│       ├── .gitkeep                 # Keep directory in git
│       └── EXAMPLE.md               # Example documentation
│
├── projects/                         # Project metadata files
│   ├── .gitkeep                     # Keep directory in git
│   └── EXAMPLE.md                   # Example documentation
│
├── schemas/                          # JSON Schema validation files
│   ├── contract.schema.json         # Contract entry schema
│   └── project.schema.json          # Project entry schema
│
├── scripts/                          # Utility scripts
│   └── validate.js                  # Validation script (Node.js)
│
├── .gitignore                        # Git ignore rules
├── CONTRIBUTING.md                   # Contribution guidelines
├── LICENSE                           # MIT License
├── package.json                      # Node.js dependencies and scripts
├── QUICKSTART.md                     # Quick start guide
├── README.md                         # Main documentation
├── REPOSITORY_STRUCTURE.md           # This file
└── SECURITY.md                       # Security policy
```

## Key Files

### Documentation
- **README.md** - Main repository documentation
- **CONTRIBUTING.md** - Detailed contribution guidelines
- **QUICKSTART.md** - Quick start guide for new users
- **SECURITY.md** - Security policy and reporting
- **REPOSITORY_STRUCTURE.md** - Repository structure overview

### Configuration
- **package.json** - Node.js dependencies and scripts
- **.gitignore** - Git ignore rules
- **LICENSE** - MIT License

### Schemas
- **schemas/contract.schema.json** - JSON schema for contract entries
- **schemas/project.schema.json** - JSON schema for project entries

### Scripts
- **scripts/validate.js** - Validation script for all submissions

### GitHub Configuration
- **.github/ISSUE_TEMPLATE/** - Submission forms
- **.github/workflows/validate.yml** - Automated CI/CD validation
- **.github/pull_request_template.md** - Pull request template

## Directory Structure

### contracts/CHAINID/
Each contract is stored as a JSON file named by its EIP55 checksummed address:
- `26600/` - VinuChain Mainnet
- Format: `0xAddress.json`

### projects/
Each project is stored as a JSON file with a lowercase, hyphenated identifier:
- Format: `project-name.json`

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/VinuChain/vinuchain-tokens.git
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run validation**
   ```bash
   npm run validate
   ```

## Submission Workflow

1. **Submit via GitHub Issue** (Recommended)
   - Use issue templates for guided submission

2. **Submit via Pull Request**
   - Fork repository
   - Add JSON files
   - Run validation
   - Create PR

3. **Automated Validation**
   - GitHub Actions runs on every PR
   - Validates JSON format and schemas
   - Checks address checksums
   - Verifies project references

## Links

- Repository: https://github.com/VinuChain/vinuchain-tokens
- Issues: https://github.com/VinuChain/vinuchain-tokens/issues
- Discussions: https://github.com/VinuChain/vinuchain-tokens/discussions
- VinuChain: https://vinuchain.org

---

Last Updated: November 2025
