#!/usr/bin/env node

/**
 * Test suite for VinuChain Token List validation
 *
 * This is a simple test suite that validates the validation script works correctly.
 * It tests schema validation, checksum validation, and file format validation.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

let testsPassed = 0;
let testsFailed = 0;

/**
 * Test helper function
 */
function test(name, fn) {
  try {
    fn();
    console.log(` ${name}`);
    testsPassed++;
  } catch (error) {
    console.error(`L ${name}`);
    console.error(`   ${error.message}`);
    testsFailed++;
  }
}

/**
 * Assert helper
 */
function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'Assertion failed');
  }
}

console.log('>ê Running VinuChain Token List Tests\n');

// Test 1: Schemas exist and are valid JSON
test('Contract schema file exists and is valid JSON', () => {
  const schemaPath = path.join(__dirname, '../schemas/contract.schema.json');
  assert(fs.existsSync(schemaPath), 'Contract schema file should exist');
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  assert(schema.type === 'object', 'Schema should be object type');
  assert(Array.isArray(schema.required), 'Schema should have required fields');
});

test('Project schema file exists and is valid JSON', () => {
  const schemaPath = path.join(__dirname, '../schemas/project.schema.json');
  assert(fs.existsSync(schemaPath), 'Project schema file should exist');
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  assert(schema.type === 'object', 'Schema should be object type');
  assert(Array.isArray(schema.required), 'Schema should have required fields');
});

// Test 2: Example files validate correctly
test('Example contract file validates against schema', () => {
  const Ajv = require('ajv');
  const addFormats = require('ajv-formats');

  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);

  const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '../schemas/contract.schema.json'), 'utf8'));
  const validate = ajv.compile(schema);

  const contractPath = path.join(__dirname, '../contracts/26600/0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed.json');
  const contract = JSON.parse(fs.readFileSync(contractPath, 'utf8'));

  assert(validate(contract), `Contract should validate: ${JSON.stringify(validate.errors)}`);
});

test('Example project file validates against schema', () => {
  const Ajv = require('ajv');
  const addFormats = require('ajv-formats');

  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);

  const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '../schemas/project.schema.json'), 'utf8'));
  const validate = ajv.compile(schema);

  const projectPath = path.join(__dirname, '../projects/example-project.json');
  const project = JSON.parse(fs.readFileSync(projectPath, 'utf8'));

  assert(validate(project), `Project should validate: ${JSON.stringify(validate.errors)}`);
});

// Test 3: EIP-55 checksum validation
test('EIP-55 checksum validation works correctly', () => {
  const { getAddress } = require('ethers');

  // Valid checksummed address
  const validAddress = '0x5aAeb6053F3E94C9b9A09f33669435E7Ef1BeAed';
  assert(getAddress(validAddress) === validAddress, 'Valid checksummed address should pass');

  // Invalid checksum (all lowercase)
  const lowercaseAddress = '0x5aaeb6053f3e94c9b9a09f33669435e7ef1beaed';
  assert(getAddress(lowercaseAddress) !== lowercaseAddress, 'Lowercase address should not match checksum');

  // Invalid checksum (all uppercase)
  const uppercaseAddress = '0x5AAEB6053F3E94C9B9A09F33669435E7EF1BEAED';
  assert(getAddress(uppercaseAddress) !== uppercaseAddress, 'Uppercase address should not match checksum');
});

// Test 4: Reserved names are properly defined
test('Reserved names list exists and is valid', () => {
  const validateScript = fs.readFileSync(path.join(__dirname, '../scripts/validate.js'), 'utf8');
  assert(validateScript.includes('RESERVED_NAMES'), 'Reserved names should be defined');
  assert(validateScript.includes("'main'"), 'Reserved names should include main');
  assert(validateScript.includes("'master'"), 'Reserved names should include master');
  assert(validateScript.includes("'test'"), 'Reserved names should include test');
});

// Test 5: Validation script runs without errors
test('Validation script executes successfully', () => {
  try {
    const result = execSync('npm run validate', {
      cwd: path.join(__dirname, '..'),
      encoding: 'utf8',
      stdio: 'pipe'
    });
    assert(result.includes('All validations passed'), 'Validation should pass');
  } catch (error) {
    throw new Error(`Validation script failed: ${error.message}`);
  }
});

// Test 6: Package.json is valid
test('Package.json has all required fields', () => {
  const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf8'));
  assert(pkg.name === 'vinuchain-tokens', 'Package name should be vinuchain-tokens');
  assert(pkg.version, 'Package should have version');
  assert(pkg.scripts && pkg.scripts.validate, 'Package should have validate script');
  assert(pkg.engines && pkg.engines.node, 'Package should specify Node.js version');
  assert(Array.isArray(pkg.files), 'Package should specify files array');
});

// Test 7: Documentation files exist
test('All required documentation files exist', () => {
  const requiredFiles = [
    'README.md',
    'CONTRIBUTING.md',
    'LICENSE',
    'CODE_OF_CONDUCT.md',
    'SECURITY.md',
    'CHANGELOG.md',
    '.gitignore',
    '.editorconfig'
  ];

  requiredFiles.forEach(file => {
    const filePath = path.join(__dirname, '..', file);
    assert(fs.existsSync(filePath), `${file} should exist`);
  });
});

// Test 8: Schema constraints are proper
test('Contract schema has proper constraints', () => {
  const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '../schemas/contract.schema.json'), 'utf8'));

  // Check required fields
  assert(schema.required.includes('project'), 'Contract should require project');
  assert(schema.required.includes('name'), 'Contract should require name');
  assert(schema.required.includes('contract'), 'Contract should require contract');

  // Check maxLength constraints exist
  assert(schema.properties.project.maxLength, 'Project field should have maxLength');
  assert(schema.properties.name.maxLength, 'Name field should have maxLength');
  assert(schema.properties.source.maxLength, 'Source field should have maxLength');

  // Check HTTPS-only for source
  assert(schema.properties.source.pattern.startsWith('^https://'), 'Source should require HTTPS');
});

test('Project schema has proper constraints', () => {
  const schema = JSON.parse(fs.readFileSync(path.join(__dirname, '../schemas/project.schema.json'), 'utf8'));

  // Check required fields
  assert(schema.required.includes('name'), 'Project should require name');
  assert(schema.required.includes('website'), 'Project should require website');

  // Check token.name is required
  assert(schema.properties.token.required.includes('name'), 'Token should require name');

  // Check maxLength constraints exist
  assert(schema.properties.name.maxLength, 'Name field should have maxLength');
  assert(schema.properties.website.maxLength, 'Website field should have maxLength');
  assert(schema.properties.contact.maxLength === 320, 'Contact email should have RFC 5321 maxLength');

  // Check HTTPS-only for URLs
  assert(schema.properties.website.pattern.startsWith('^https://'), 'Website should require HTTPS');
});

// Print results
console.log(`\n${'='.repeat(50)}`);
console.log(`Tests Passed: ${testsPassed}`);
console.log(`Tests Failed: ${testsFailed}`);
console.log(`${'='.repeat(50)}`);

if (testsFailed > 0) {
  console.log('\nL Some tests failed');
  process.exit(1);
} else {
  console.log('\n( All tests passed!');
  process.exit(0);
}
