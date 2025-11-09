# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Token submission issue template
- Token schema with comprehensive validation
- Address-based folder structure for tokens
- Support for optional fields (logoURI, website, social links, etc.)
- Red flags field for security warnings
- Comprehensive test suite for token validation

### Changed
- Repository restructured to focus exclusively on tokens
- Updated all documentation to reflect tokens-only focus
- Validation script rewritten for token-specific checks
- Enhanced error reporting in validation script

### Removed
- Contract and project structures (moved to separate contracts-list repository)
- Contract and project schemas
- Contract and project issue templates

## [1.0.0] - 2025-11-09

### Added
- Initial tokens-list repository structure
- Token JSON schema with validation
- Validation script using AJV and ethers.js
- GitHub issue template for token submissions
- GitHub Actions workflow for automated validation
- Comprehensive documentation (README, CONTRIBUTING, SECURITY, QUICKSTART)
- Support for VinuChain (Chain ID: 207)
- Example tokens (VINU, WVC, USDT, ETH, VIN, BTC, VIR)

### Security
- EIP-55 checksum validation for all addresses
- HTTPS-only URL validation for logos and websites
- Input validation through JSON schemas
- Maximum string length constraints to prevent DoS
- Symbol format validation (uppercase alphanumeric)

[Unreleased]: https://github.com/VinuChain/tokens-list/compare/v1.0.0...HEAD
[1.0.0]: https://github.com/VinuChain/tokens-list/releases/tag/v1.0.0
