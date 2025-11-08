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

### Contract Security Issues

If you discover a security vulnerability in a **listed contract**, please:

1. **DO NOT** open a public issue
2. Find the project's security contact in its project metadata file
3. Contact them directly using the listed security email
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

- Individual smart contracts (report to project security contacts)
- Third-party dependencies (report to respective maintainers)
- VinuChain network issues (report to VinuChain team)

## Security Best Practices

### For Contributors

When submitting contracts or projects:

1. **Verify authorization** - Only submit information you're authorized to share
2. **Check addresses** - Ensure all addresses are correct and checksummed
3. **Validate data** - Run `npm run validate` before submitting
4. **Provide security contacts** - Include security email in project metadata

### For Projects

When listing your project:

1. **Include security contact** - Provide a dedicated security email
2. **Keep information updated** - Update contact information if it changes
3. **Monitor your listings** - Watch for unauthorized changes
4. **Use Sourcify** - Verify contracts on Sourcify for additional validation

### For Users

When using this registry:

1. **Verify independently** - Always verify contract information independently
2. **Check multiple sources** - Cross-reference with other registries
3. **Be cautious** - This is a community-maintained list, not financial advice
4. **Report issues** - If you spot incorrect or fraudulent information, report it

## Security Contacts

- **Repository issues:** security@vinuchain.org
- **VinuChain network:** security@vinuchain.org
- **Listed contracts:** See individual project metadata

## Past Security Issues

We maintain transparency about resolved security issues. Check our [security advisories](../../security/advisories) for details about past vulnerabilities and their resolutions.

## Bounty Program

Currently, we do not have a formal bug bounty program. However, we greatly appreciate security researchers who help us identify and fix vulnerabilities. Recognition will be provided in our security acknowledgments.

## Security Acknowledgments

We thank the following individuals and organizations for responsibly disclosing security issues:

*(This section will be updated as issues are reported and resolved)*

## Questions?

If you have questions about this security policy:

- Email: security@vinuchain.org
- Open a discussion (for non-sensitive questions)

---

**Last Updated:** November 2025
