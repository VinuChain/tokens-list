#!/usr/bin/env node

/**
 * Validation script for VinuChain Token List
 * Validates all contract and project JSON files against their schemas
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');
const { getAddress } = require('ethers');

// Initialize AJV with formats
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

// Load schemas
const tokenSchema = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../schemas/token.schema.json'), 'utf8')
);

// Compile validators
const validateToken = ajv.compile(tokenSchema);

let hasErrors = false;
let validatedTokens = 0;

/**
 * Check if address is properly EIP-55 checksummed
 * @param {string} address - The address to validate
 * @returns {boolean} - True if properly checksummed, false otherwise
 */
function isValidChecksumAddress(address) {
  try {
    const checksummed = getAddress(address);
    return checksummed === address;
  } catch (error) {
    return false;
  }
}

/**
 * Format AJV validation errors for better readability
 * @param {Array} errors - Array of AJV validation errors
 * @returns {string} - Formatted error message
 */
function formatValidationErrors(errors) {
  return errors.map(err => {
    const path = err.instancePath || '/';
    let message = `   - ${path}: ${err.message}`;
    if (err.params && Object.keys(err.params).length > 0) {
      message += `\n     ${JSON.stringify(err.params)}`;
    }
    return message;
  }).join('\n');
}

/**
 * Validate all token files
 */
function validateTokens() {
  console.log('\n🪙 Validating tokens...');

  const tokensDir = path.join(__dirname, '../tokens');

  if (!fs.existsSync(tokensDir)) {
    console.log('⚠️  No tokens directory found');
    return;
  }

  // Get all token directories (address folders)
  const tokenDirs = fs.readdirSync(tokensDir).filter(f => {
    const stat = fs.statSync(path.join(tokensDir, f));
    return stat.isDirectory();
  });

  if (tokenDirs.length === 0) {
    console.log('⚠️  No token directories found');
    return;
  }

  const seenAddresses = new Set();
  const seenSymbols = new Map();

  for (const tokenDir of tokenDirs) {
    const address = tokenDir;
    const tokenDirPath = path.join(tokensDir, tokenDir);
    const files = fs.readdirSync(tokenDirPath).filter(f => f.endsWith('.json'));

    if (files.length === 0) {
      console.error(`❌ No JSON file found in ${tokenDirPath}`);
      hasErrors = true;
      continue;
    }

    if (files.length > 1) {
      console.error(`❌ Multiple JSON files found in ${tokenDirPath}`);
      console.error(`   Each token directory should contain exactly one JSON file`);
      hasErrors = true;
      continue;
    }

    const file = files[0];
    const filePath = path.join(tokenDirPath, file);
    const fileAddress = file.replace('.json', '');

    // Check directory name is valid address format
    if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
      console.error(`❌ Invalid address format for directory: ${tokenDir}`);
      console.error(`   Directory name must be a valid Ethereum address`);
      hasErrors = true;
      continue;
    }

    // Check filename matches directory name
    if (fileAddress !== address) {
      console.error(`❌ Filename does not match directory: ${filePath}`);
      console.error(`   Expected: ${address}.json`);
      console.error(`   Got: ${file}`);
      hasErrors = true;
      continue;
    }

    // Validate EIP-55 checksum
    if (!isValidChecksumAddress(address)) {
      console.error(`❌ Invalid EIP-55 checksum: ${tokenDir}`);
      try {
        const correctChecksum = getAddress(address);
        console.error(`   Expected: ${correctChecksum}`);
        console.error(`   Got: ${address}`);
      } catch (e) {
        console.error(`   Address has invalid format`);
      }
      hasErrors = true;
      continue;
    }

    // Check for duplicate addresses
    if (seenAddresses.has(address.toLowerCase())) {
      console.error(`❌ Duplicate address: ${address}`);
      hasErrors = true;
      continue;
    }
    seenAddresses.add(address.toLowerCase());

    // Read and validate JSON
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Validate against schema
      if (!validateToken(data)) {
        console.error(`❌ Schema validation failed: ${filePath}`);
        console.error(formatValidationErrors(validateToken.errors));
        hasErrors = true;
        continue;
      }

      // Check address in JSON matches directory/filename
      if (data.address !== address) {
        console.error(`❌ Address mismatch: ${filePath}`);
        console.error(`   Directory/filename: ${address}`);
        console.error(`   JSON address field: ${data.address}`);
        hasErrors = true;
        continue;
      }

      // Check for duplicate symbols (warning only)
      if (seenSymbols.has(data.symbol)) {
        console.log(`⚠️  Duplicate symbol "${data.symbol}": ${filePath}`);
        console.log(`   Also used by: ${seenSymbols.get(data.symbol)}`);
        console.log(`   Note: This is not an error, but symbols should typically be unique`);
      } else {
        seenSymbols.set(data.symbol, filePath);
      }

      validatedTokens++;
    } catch (error) {
      console.error(`❌ Error reading ${filePath}:`);
      if (error instanceof SyntaxError) {
        console.error(`   JSON Parse Error: ${error.message}`);
      } else {
        console.error(`   ${error.message}`);
      }
      if (process.env.DEBUG) {
        console.error(error.stack);
      }
      hasErrors = true;
    }
  }

  console.log(`✅ Validated ${validatedTokens} token(s)`);
}

// Run all validations
console.log('🚀 VinuChain Tokens List Validation\n');
validateTokens();

if (hasErrors) {
  console.log('\n❌ Validation failed with errors');
  process.exit(1);
} else {
  console.log('\n✨ All validations passed!');
  process.exit(0);
}
