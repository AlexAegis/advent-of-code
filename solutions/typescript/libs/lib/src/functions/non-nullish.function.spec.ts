import { describe, expect, it } from 'vitest';
import { nonNullish } from './non-nullish.function.js';

describe('Non Nullish', () => {
	it('should return true for non nullish values', () => {
		expect(nonNullish(1)).toEqual(true);
		expect(nonNullish(0)).toEqual(true);
		expect(nonNullish('')).toEqual(true);
	});

	it('should return false for nullish values', () => {
		expect(nonNullish(undefined)).toEqual(false);
		// eslint-disable-next-line unicorn/no-null
		expect(nonNullish(null)).toEqual(false);
	});
});
