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
const contractSchema = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../schemas/contract.schema.json'), 'utf8')
);
const projectSchema = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../schemas/project.schema.json'), 'utf8')
);

// Compile validators
const validateContract = ajv.compile(contractSchema);
const validateProject = ajv.compile(projectSchema);

let hasErrors = false;
let validatedContracts = 0;
let validatedProjects = 0;

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
 * Validate all contract files
 */
function validateContracts() {
  console.log('\n📋 Validating contracts...');

  const contractsDir = path.join(__dirname, '../contracts');

  if (!fs.existsSync(contractsDir)) {
    console.log('⚠️  No contracts directory found');
    return;
  }

  const chainDirs = fs.readdirSync(contractsDir).filter(f => {
    const stat = fs.statSync(path.join(contractsDir, f));
    if (!stat.isDirectory()) return false;

    // Validate chain ID is numeric
    if (!/^\d+$/.test(f)) {
      console.error(`❌ Invalid chain ID directory: ${f}`);
      console.error(`   Chain ID must be numeric`);
      hasErrors = true;
      return false;
    }
    return true;
  });

  const seenAddresses = new Set();

  for (const chainId of chainDirs) {
    const chainDir = path.join(contractsDir, chainId);
    const files = fs.readdirSync(chainDir).filter(f => f.endsWith('.json'));

    if (files.length === 0) {
      console.log(`⚠️  No contract files found in ${chainDir}`);
    }

    for (const file of files) {
      const filePath = path.join(chainDir, file);
      const address = file.replace('.json', '');

      // Check for duplicate addresses
      const addressKey = `${chainId}:${address.toLowerCase()}`;
      if (seenAddresses.has(addressKey)) {
        console.error(`❌ Duplicate address: ${filePath}`);
        console.error(`   Address ${address} already exists in chain ${chainId}`);
        hasErrors = true;
        continue;
      }
      seenAddresses.add(addressKey);

      // Check filename is valid address format
      if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
        console.error(`❌ Invalid address format: ${filePath}`);
        console.error(`   Filename must be a valid Ethereum address`);
        hasErrors = true;
        continue;
      }

      // Validate EIP-55 checksum
      if (!isValidChecksumAddress(address)) {
        console.error(`❌ Invalid EIP-55 checksum: ${filePath}`);
        try {
          const correctChecksum = getAddress(address);
          console.error(`   Expected: ${correctChecksum}.json`);
          console.error(`   Got: ${address}.json`);
        } catch (e) {
          console.error(`   Address has invalid format`);
        }
        hasErrors = true;
        continue;
      }

      // Read and validate JSON
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (!validateContract(data)) {
          console.error(`❌ Schema validation failed: ${filePath}`);
          console.error(formatValidationErrors(validateContract.errors));
          hasErrors = true;
        } else {
          validatedContracts++;
        }
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
  }

  console.log(`✅ Validated ${validatedContracts} contract(s)`);
}

/**
 * Validate all project files
 */
function validateProjects() {
  console.log('\n📁 Validating projects...');

  const projectsDir = path.join(__dirname, '../projects');

  if (!fs.existsSync(projectsDir)) {
    console.log('⚠️  No projects directory found');
    return;
  }

  const files = fs.readdirSync(projectsDir).filter(f => f.endsWith('.json'));

  if (files.length === 0) {
    console.log('⚠️  No project files found in projects/');
  }

  for (const file of files) {
    const filePath = path.join(projectsDir, file);
    const projectId = file.replace('.json', '');

    // Check filename format (stricter pattern)
    if (!projectId.match(/^[a-z0-9]+(-[a-z0-9]+)*$/)) {
      console.error(`❌ Invalid project filename: ${filePath}`);
      console.error(`   Filename must be lowercase alphanumeric with hyphens`);
      console.error(`   Examples: "my-project", "token123", "defi-protocol"`);
      hasErrors = true;
      continue;
    }

    // Read and validate JSON
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      // Validate against schema
      if (!validateProject(data)) {
        console.error(`❌ Schema validation failed: ${filePath}`);
        console.error(formatValidationErrors(validateProject.errors));
        hasErrors = true;
        continue;
      }

      // Additional validation: Check token address checksum if present
      if (data.token && data.token.address) {
        if (!isValidChecksumAddress(data.token.address)) {
          console.error(`❌ Invalid EIP-55 checksum for token address: ${filePath}`);
          try {
            const correctChecksum = getAddress(data.token.address);
            console.error(`   Expected: ${correctChecksum}`);
            console.error(`   Got: ${data.token.address}`);
          } catch (e) {
            console.error(`   Token address has invalid format`);
          }
          hasErrors = true;
          continue;
        }
      }

      validatedProjects++;
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

  console.log(`✅ Validated ${validatedProjects} project(s)`);
}

/**
 * Check that all contract project references exist
 */
function validateProjectReferences() {
  console.log('\n🔗 Validating project references...');

  const contractsDir = path.join(__dirname, '../contracts');
  const projectsDir = path.join(__dirname, '../projects');

  if (!fs.existsSync(contractsDir) || !fs.existsSync(projectsDir)) {
    console.log('⚠️  Skipping reference validation');
    return;
  }

  const projectFiles = fs.readdirSync(projectsDir)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''));

  const chainDirs = fs.readdirSync(contractsDir).filter(f => {
    const stat = fs.statSync(path.join(contractsDir, f));
    return stat.isDirectory();
  });

  for (const chainId of chainDirs) {
    const chainDir = path.join(contractsDir, chainId);
    const files = fs.readdirSync(chainDir).filter(f => f.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(chainDir, file);

      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (data.project && !projectFiles.includes(data.project)) {
          console.error(`❌ Missing project reference: ${filePath}`);
          console.error(`   Project "${data.project}" does not exist in projects/`);
          hasErrors = true;
        }
      } catch (error) {
        // Already handled in previous validation
      }
    }
  }

  console.log('✅ Project references validated');
}

// Run all validations
console.log('🚀 VinuChain Token List Validation\n');
validateContracts();
validateProjects();
validateProjectReferences();

if (hasErrors) {
  console.log('\n❌ Validation failed with errors');
  process.exit(1);
} else {
  console.log('\n✨ All validations passed!');
  process.exit(0);
}
