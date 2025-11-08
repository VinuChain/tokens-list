#!/usr/bin/env node

/**
 * Validation script for VinuChain Token List
 * Validates all contract and project JSON files against their schemas
 */

const fs = require('fs');
const path = require('path');
const Ajv = require('ajv');
const addFormats = require('ajv-formats');

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
 * Check if address is EIP55 checksummed
 */
function isChecksummed(address) {
  // This is a simplified check - in production, use web3.js or ethers.js
  return /^0x[a-fA-F0-9]{40}$/.test(address) && address === address.toLowerCase() ? false : true;
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
    return stat.isDirectory();
  });

  for (const chainId of chainDirs) {
    const chainDir = path.join(contractsDir, chainId);
    const files = fs.readdirSync(chainDir).filter(f => f.endsWith('.json'));

    for (const file of files) {
      const filePath = path.join(chainDir, file);
      const address = file.replace('.json', '');

      // Check filename is valid address
      if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
        console.error(`❌ Invalid filename: ${filePath}`);
        console.error(`   Filename must be EIP55 checksummed address`);
        hasErrors = true;
        continue;
      }

      // Read and validate JSON
      try {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

        if (!validateContract(data)) {
          console.error(`❌ Validation failed: ${filePath}`);
          console.error(validateContract.errors);
          hasErrors = true;
        } else {
          validatedContracts++;
        }
      } catch (error) {
        console.error(`❌ Error reading ${filePath}:`, error.message);
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

  for (const file of files) {
    const filePath = path.join(projectsDir, file);
    const projectId = file.replace('.json', '');

    // Check filename format
    if (!projectId.match(/^[a-z0-9-]+$/)) {
      console.error(`❌ Invalid project filename: ${filePath}`);
      console.error(`   Filename must be lowercase, hyphenated identifier`);
      hasErrors = true;
      continue;
    }

    // Read and validate JSON
    try {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

      if (!validateProject(data)) {
        console.error(`❌ Validation failed: ${filePath}`);
        console.error(validateProject.errors);
        hasErrors = true;
      } else {
        validatedProjects++;
      }
    } catch (error) {
      console.error(`❌ Error reading ${filePath}:`, error.message);
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
