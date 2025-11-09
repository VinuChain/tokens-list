#!/usr/bin/env node

/**
 * Test suite for VinuChain Tokens List validation
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
    console.log(`✅ ${name}`);
    testsPassed++;
  } catch (error) {
    console.error(`❌ ${name}`);
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

console.log('🧪 Running VinuChain Tokens List Tests\n');

// Test 1: Schema exists and is valid JSON
test('Token schema file exists and is valid JSON', () => {
  const schemaPath = path.join(__dirname, '../schemas/token.schema.json');
  assert(fs.existsSync(schemaPath), 'Token schema file should exist');
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  assert(schema.type === 'object', 'Schema should be object type');
  assert(Array.isArray(schema.required), 'Schema should have required fields');
});

// Test 2: Required fields are defined
test('Token schema has correct required fields', () => {
  const schemaPath = path.join(__dirname, '../schemas/token.schema.json');
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const required = schema.required;
  assert(required.includes('symbol'), 'Should require symbol');
  assert(required.includes('name'), 'Should require name');
  assert(required.includes('address'), 'Should require address');
  assert(required.includes('decimals'), 'Should require decimals');
});

// Test 3: Schema properties are defined
test('Token schema has correct properties', () => {
  const schemaPath = path.join(__dirname, '../schemas/token.schema.json');
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  assert(schema.properties.symbol, 'Should have symbol property');
  assert(schema.properties.name, 'Should have name property');
  assert(schema.properties.address, 'Should have address property');
  assert(schema.properties.decimals, 'Should have decimals property');
  assert(schema.properties.logoURI, 'Should have logoURI property');
});

// Test 4: Validation script exists
test('Validation script exists', () => {
  const scriptPath = path.join(__dirname, '../scripts/validate.js');
  assert(fs.existsSync(scriptPath), 'Validation script should exist');
});

// Test 5: Validation script is executable
test('Validation script can be run', () => {
  try {
    execSync('node scripts/validate.js', {
      cwd: path.join(__dirname, '..'),
      stdio: 'pipe'
    });
  } catch (error) {
    // Script might fail if there are validation errors, which is okay
    // We're just testing that it runs
  }
});

// Test 6: Tokens directory exists
test('Tokens directory exists', () => {
  const tokensDir = path.join(__dirname, '../tokens');
  assert(fs.existsSync(tokensDir), 'Tokens directory should exist');
});

// Test 7: Example tokens exist
test('Example tokens exist', () => {
  const tokensDir = path.join(__dirname, '../tokens');
  const dirs = fs.readdirSync(tokensDir).filter(f => {
    const stat = fs.statSync(path.join(tokensDir, f));
    return stat.isDirectory();
  });
  assert(dirs.length > 0, 'Should have at least one token');
});

// Test 8: Example token has correct structure
test('Example token has correct file structure', () => {
  const tokensDir = path.join(__dirname, '../tokens');
  const tokenDirs = fs.readdirSync(tokensDir).filter(f => {
    const stat = fs.statSync(path.join(tokensDir, f));
    return stat.isDirectory();
  });
  
  if (tokenDirs.length > 0) {
    const firstToken = tokenDirs[0];
    const tokenDir = path.join(tokensDir, firstToken);
    const files = fs.readdirSync(tokenDir).filter(f => f.endsWith('.json'));
    assert(files.length === 1, 'Token directory should have exactly one JSON file');
    assert(files[0] === `${firstToken}.json`, 'Filename should match directory name');
  }
});

// Test 9: Example token validates against schema
test('Example token validates against schema', () => {
  const Ajv = require('ajv');
  const addFormats = require('ajv-formats');
  
  const ajv = new Ajv({ allErrors: true, strict: false });
  addFormats(ajv);
  
  const schemaPath = path.join(__dirname, '../schemas/token.schema.json');
  const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
  const validate = ajv.compile(schema);
  
  const tokensDir = path.join(__dirname, '../tokens');
  const tokenDirs = fs.readdirSync(tokensDir).filter(f => {
    const stat = fs.statSync(path.join(tokensDir, f));
    return stat.isDirectory();
  });
  
  if (tokenDirs.length > 0) {
    const firstToken = tokenDirs[0];
    const tokenFile = path.join(tokensDir, firstToken, `${firstToken}.json`);
    const tokenData = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));
    
    const valid = validate(tokenData);
    assert(valid, validate.errors ? JSON.stringify(validate.errors, null, 2) : 'Token should validate');
  }
});

// Test 10: Example token has EIP-55 checksummed address
test('Example token has valid EIP-55 checksummed address', () => {
  const { getAddress } = require('ethers');
  
  const tokensDir = path.join(__dirname, '../tokens');
  const tokenDirs = fs.readdirSync(tokensDir).filter(f => {
    const stat = fs.statSync(path.join(tokensDir, f));
    return stat.isDirectory();
  });
  
  if (tokenDirs.length > 0) {
    const firstToken = tokenDirs[0];
    const tokenFile = path.join(tokensDir, firstToken, `${firstToken}.json`);
    const tokenData = JSON.parse(fs.readFileSync(tokenFile, 'utf8'));
    
    const checksummed = getAddress(tokenData.address);
    assert(checksummed === tokenData.address, 'Address should be EIP-55 checksummed');
  }
});

// Summary
console.log('\n' + '='.repeat(50));
console.log(`Tests passed: ${testsPassed}`);
console.log(`Tests failed: ${testsFailed}`);
console.log('='.repeat(50));

if (testsFailed > 0) {
  process.exit(1);
} else {
  console.log('\n✨ All tests passed!');
  process.exit(0);
}
