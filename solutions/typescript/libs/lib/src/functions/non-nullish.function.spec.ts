import { describe, expect, it } from 'vitest';
import { nonNullish } from './non-nullish.function.js';

describe('Non Nullish', () => {
	it('should return true for non nullish values', () => {
		expect(nonNullish(1)).to.be.true;
		expect(nonNullish(0)).to.be.true;
		expect(nonNullish('')).to.be.true;
	});

	it('should return false for nullish values', () => {
		expect(nonNullish(undefined)).to.be.false;
		// eslint-disable-next-line unicorn/no-null
		expect(nonNullish(null)).to.be.false;
	});
});
