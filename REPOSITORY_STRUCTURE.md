# VinuChain Token List - Repository Structure

```
tokens-list/
│
├── .github/                         # GitHub configuration
│   ├── ISSUE_TEMPLATE/              # Issue templates for submissions
│   │   ├── token-submission.yml     # Token submission form
│   │   └── config.yml               # Issue template configuration
│   ├── workflows/                   # GitHub Actions workflows
│   │   └── validate.yml             # Automated validation workflow
│   └── pull_request_template.md     # PR template
│
├── tokens/                          # Token entries by contract address
│   ├── .gitkeep                     # Keep directory in git
│   └── EXAMPLE.md                   # Example documentation
│
├── schemas/                         # JSON Schema validation files
│   ├── token.schema.json            # Token entry schema
│
├── scripts/                         # Utility scripts
│   └── validate.js                  # Validation script (Node.js)
│
├── .gitignore                       # Git ignore rules
├── CONTRIBUTING.md                  # Contribution guidelines
├── LICENSE                          # MIT License
├── package.json                     # Node.js dependencies and scripts
├── QUICKSTART.md                    # Quick start guide
├── README.md                        # Main documentation
├── REPOSITORY_STRUCTURE.md          # This file
└── SECURITY.md                      # Security policy
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
- **schemas/token.schema.json** - JSON schema for token entries

### Scripts
- **scripts/validate.js** - Validation script for all submissions

### GitHub Configuration
- **.github/ISSUE_TEMPLATE/** - Submission forms
- **.github/workflows/validate.yml** - Automated CI/CD validation
- **.github/pull_request_template.md** - Pull request template

## Directory Structure

### tokens/
Each token is stored as a JSON file named by its EIP55 checksummed address:
- Format: `0xAddress.json`

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/VinuChain/tokens-list.git
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

- Repository: https://github.com/VinuChain/tokens-list
- Issues: https://github.com/VinuChain/tokens-list/issues
- Discussions: https://github.com/VinuChain/tokens-list/discussions
- VinuChain: https://vinuchain.org

---

Last Updated: November 2025
