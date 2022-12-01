import { describe, expect, it } from 'vitest';
import { integerLength, integerLengthMath } from './integer-length.function.js';

describe('Integer length', () => {
	it('should work with numbers larger than 1', async () => {
		expect(integerLength(123)).to.equal(3);
		expect(integerLength(7653)).to.equal(4);
		expect(integerLength(85476847)).to.equal(8);
	});

	it('should work with 1', async () => {
		expect(integerLength(1)).to.equal(1);
	});

	it('should work with 0', async () => {
		expect(integerLength(0)).to.equal(1);
	});

	it('should work with negative numbers', async () => {
		expect(integerLength(-34312)).to.equal(5);
	});
});

describe('Integer length (Math)', () => {
	it('should work with numbers larger than 1', async () => {
		expect(integerLengthMath(123)).to.equal(3);
		expect(integerLengthMath(7653)).to.equal(4);
		expect(integerLengthMath(85476847)).to.equal(8);
	});

	it('should work with 1', async () => {
		expect(integerLengthMath(1)).to.equal(1);
	});

	it('should work with 0', async () => {
		expect(integerLengthMath(0)).to.equal(0);
	});

	it('should work with negative numbers', async () => {
		expect(integerLengthMath(-34312)).to.equal(5);
	});
});
