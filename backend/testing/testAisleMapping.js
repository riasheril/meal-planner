const { normalizeAisle } = require('../utils/transformSpoonacular');

// Test cases
const testCases = [
    { input: 'Produce', expected: 'Produce' },
    { input: 'Bakery/Bread', expected: 'Bakery' },
    { input: 'Milk, Eggs, Other Dairy', expected: 'Dairy' },
    { input: 'Frozen', expected: 'Frozen' },
    { input: 'Health Foods', expected: 'Miscellaneous' },
    { input: 'Baking', expected: 'Pantry' },
    { input: 'Meat', expected: 'Protein' },
    { input: null, expected: 'Miscellaneous' },
    { input: undefined, expected: 'Miscellaneous' },
    { input: 'Some Unknown Aisle', expected: 'Miscellaneous' }
];

console.log('Testing aisle normalization:\n');
testCases.forEach(test => {
    const result = normalizeAisle(test.input);
    const passed = result === test.expected;
    console.log(`Input: "${test.input}"`);
    console.log(`Expected: "${test.expected}"`);
    console.log(`Got: "${result}"`);
    console.log(`Test ${passed ? 'PASSED' : 'FAILED'}\n`);
}); 