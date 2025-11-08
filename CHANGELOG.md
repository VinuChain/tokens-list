# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Comprehensive security audit and fixes
- Reserved project names validation (23 blocked names)
- Project ID length validation (3-100 characters)
- Repository status badges in README
- CHANGELOG.md for tracking changes
- CODE_OF_CONDUCT.md (Contributor Covenant v2.1)
- .editorconfig for cross-IDE consistency
- .npmrc for npm configuration
- Comprehensive test suite (11 tests covering schemas, validation, checksums)
- Orphaned project detection (warns about projects with no contracts)
- Enhanced test scripts (test, test:all)

### Changed
- Updated Node.js version from 18 to 20 in GitHub Actions workflow
- Made token.name field required in project schema
- Improved logoURI pattern to allow query parameters and CDN URLs
- Clarified Sourcify integration as future feature
- Removed weak bash checksum validation (now using ethers.js only)
- Enhanced error reporting in validation script with formatted output
- Updated all schema maxLength constraints (RFC 5321 for emails)
- Fixed documentation links from relative to absolute URLs
- Improved test coverage from 0% to comprehensive

### Removed
- Duplicate .gitkeep files (using EXAMPLE.md instead)
- Duplicate add-token.yml issue template
- Non-existent npm scripts from documentation
- .claude and .vscode from git tracking
- Weak bash regex checksum validation from workflow

### Fixed
- Missing ethers.js dependency installation
- EIP-55 checksum validation logic (was broken, now uses ethers.js)
- GitHub workflow permissions for PR commenting
- Schema validation gaps (URL protocols, string lengths, email maxLength)
- Documentation inconsistencies and broken links
- Package.json missing engines and files fields

## [1.0.0] - 2025-11-08

### Added
- Initial repository structure
- Contract and project JSON schemas with comprehensive validation
- Validation script using AJV and ethers.js
- GitHub issue templates for submissions
- GitHub Actions workflow for automated validation
- Comprehensive documentation (README, CONTRIBUTING, SECURITY)
- Example contract and project files
- Support for VinuChain mainnet (Chain ID: 26600)

### Security
- EIP-55 checksum validation for all addresses
- HTTPS-only URL validation
- Input validation through JSON schemas
- Maximum string length constraints to prevent DoS
- Reserved words blocking for project names

[Unreleased]: https://github.com/VinuChain/vinuchain-tokens/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/VinuChain/vinuchain-tokens/releases/tag/v1.0.0
