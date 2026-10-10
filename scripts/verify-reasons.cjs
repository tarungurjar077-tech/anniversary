const fs = require('fs');
const path = require('path');

const reasonsFilePath = path.join(__dirname, '../src/data/reasons.js');

if (!fs.existsSync(reasonsFilePath)) {
  console.error('❌ Error: src/data/reasons.js does not exist!');
  process.exit(1);
}

const fileContent = fs.readFileSync(reasonsFilePath, 'utf8');

// Extract JSON array
const match = fileContent.match(/export\s+const\s+reasons\s*=\s*(\[[\s\S]*?\]);/);
if (!match) {
  console.error('❌ Error: Could not extract reasons array from src/data/reasons.js');
  process.exit(1);
}

let reasons;
try {
  reasons = JSON.parse(match[1]);
} catch (err) {
  console.error('❌ Error parsing JSON from reasons.js:', err.message);
  process.exit(1);
}

console.log('--- 365 REASONS VERIFICATION SUITE ---');
console.log(`Total count found: ${reasons.length}`);

let errors = [];

// 1. Check exact length
if (reasons.length !== 365) {
  errors.push(`Expected exactly 365 reasons, found ${reasons.length}`);
}

// 2. Check numbering
for (let i = 0; i < reasons.length; i++) {
  const expectedId = i + 1;
  if (reasons[i].id !== expectedId) {
    errors.push(`Reason at index ${i} has id ${reasons[i].id}, expected ${expectedId}`);
    break;
  }
}

// 3. Check for empty strings or placeholders
for (let i = 0; i < reasons.length; i++) {
  const item = reasons[i];
  if (!item.text || typeof item.text !== 'string' || item.text.trim().length === 0) {
    errors.push(`Reason #${item.id} is empty or invalid!`);
  }
}

// 4. Check for duplicates
const seenTexts = new Map();
for (let i = 0; i < reasons.length; i++) {
  const normalized = reasons[i].text.trim().toLowerCase();
  if (seenTexts.has(normalized)) {
    errors.push(`Duplicate reason found at #${reasons[i].id} (duplicates #${seenTexts.get(normalized)}): "${reasons[i].text}"`);
  } else {
    seenTexts.set(normalized, reasons[i].id);
  }
}

if (errors.length > 0) {
  console.error('\n❌ VERIFICATION FAILED:');
  errors.forEach(e => console.error(` - ${e}`));
  process.exit(1);
}

console.log('✅ Count: Exactly 365 distinct reasons verified.');
console.log('✅ Numbering: 1 through 365 strictly sequential.');
console.log('✅ Content: No empty or invalid strings.');
console.log('✅ Uniqueness: 100% unique, zero duplicates detected.');
console.log('🎉 ALL 365 REASONS TESTS PASSED PERFECTLY!\n');
process.exit(0);
