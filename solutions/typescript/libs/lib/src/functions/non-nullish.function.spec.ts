import { describe, expect, it } from 'vitest';
import { nonNullish } from './non-nullish.function.js';

describe('Non Nullish', () => {
	it('should return true for non nullish values', async () => {
		expect(nonNullish(1)).to.be.true;
		expect(nonNullish(0)).to.be.true;
		expect(nonNullish('')).to.be.true;
	});

	it('should return false for nullish values', async () => {
		expect(nonNullish(undefined)).to.be.false;
		expect(nonNullish(null)).to.be.false;
	});
});
