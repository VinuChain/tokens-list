# Security Policy

## Reporting Vulnerabilities

### Repository Security Issues

If you discover a security vulnerability in this repository (e.g., in validation scripts, schemas, or workflows), please report it to:

**Email:** security@vinuchain.org

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if any)

### Token Security Issues

If you discover a security vulnerability in a **listed token contract**, please:

1. **DO NOT** open a public issue
2. Find the token's support/security contact in its JSON file
3. Contact them directly using the listed email
4. If no security contact is listed, contact: security@vinuchain.org

## Responsible Disclosure

We ask that you:

1. **Give us time to respond** - Allow at least 48 hours for initial response
2. **Keep it confidential** - Do not publicly disclose the vulnerability until it's fixed
3. **Be detailed** - Provide clear steps to reproduce the issue
4. **Be constructive** - We appreciate good-faith security research

## What We'll Do

When you report a vulnerability, we will:

1. **Acknowledge** your report within 48 hours
2. **Investigate** and determine the severity
3. **Fix** the issue as quickly as possible
4. **Notify** you when the issue is resolved
5. **Credit** you (if desired) in our security acknowledgments

## Scope

### In Scope

- Validation scripts (`scripts/`)
- GitHub workflows (`.github/workflows/`)
- Schema definitions (`schemas/`)
- Documentation and templates

### Out of Scope

- Individual token smart contracts (report to token project contacts)
- Third-party dependencies (report to respective maintainers)
- VinuChain network issues (report to VinuChain team)

## Security Best Practices

### For Token Submitters

When submitting tokens:

1. **Verify authorization** - Only submit tokens you're authorized to list
2. **Check addresses** - Ensure all addresses are correct and checksummed
3. **Validate data** - Run `npm run validate` before submitting
4. **Provide contact** - Include support email for security reports
5. **Update information** - Keep token information current

### For Token Projects

When listing your token:

1. **Include support contact** - Provide an email for security reports
2. **Verify contract** - Ensure contract is verified on block explorer
3. **Monitor listings** - Watch for unauthorized changes to your token info
4. **Respond promptly** - Address security reports quickly
5. **Use audited contracts** - Have contracts audited by reputable firms

### For Users

When using this token list:

1. **Verify independently** - Always verify token information independently
2. **Check multiple sources** - Cross-reference with block explorers
3. **Be cautious** - This is a community-maintained list, not financial advice
4. **DYOR** - Do Your Own Research before interacting with any token
5. **Report issues** - If you spot incorrect or fraudulent information, report it

## Common Security Concerns

### Fake Tokens

If you discover a fake/scam token in the list:

1. Open an issue with evidence
2. Include the token address and why it's fraudulent
3. We will investigate and remove if confirmed

### Incorrect Information

If token information is incorrect or outdated:

1. Contact the token project directly first
2. If unresponsive, open an issue
3. Provide correct information with evidence

### Phishing/Scam Sites

If a listed token has malicious URLs:

1. Report immediately to security@vinuchain.org
2. Do not visit or interact with suspicious links
3. We will investigate and update/remove the listing

## Security Contacts

- **Repository issues:** security@vinuchain.org
- **VinuChain network:** security@vinuchain.org
- **Listed tokens:** See individual token JSON files for support contacts

## Past Security Issues

We maintain transparency about resolved security issues. Check our [security advisories](../../security/advisories) for details about past vulnerabilities and their resolutions.

## Bug Bounty Program

Currently, we do not have a formal bug bounty program. However, we greatly appreciate security researchers who help us identify and fix vulnerabilities. Recognition will be provided in our security acknowledgments.

## Security Acknowledgments

We thank the following individuals and organizations for responsibly disclosing security issues:

*(This section will be updated as issues are reported and resolved)*

## Red Flags

Tokens may include a `redFlags` field to warn users of potential security concerns:

```json
{
  "symbol": "TOKEN",
  "name": "Example Token",
  "address": "0x...",
  "decimals": 18,
  "redFlags": [
    "Unverified contract",
    "No audit available"
  ]
}
```

If you identify security concerns with a token, please report them rather than adding red flags yourself.

## Questions?

If you have questions about this security policy:

- Email: security@vinuchain.org
- Open a discussion (for non-sensitive questions)

---

**Last Updated:** November 2025
