import { describe, expect, it } from 'vitest';
import { identity } from './identity.function.js';

describe('identity', () => {
	it('should be true for a non-nullish value', () => {
		expect(identity(1)).toEqual(true);
	});

	it('should be true for a nullish but non-null value', () => {
		expect(identity(0)).toEqual(true);
	});

	it('should be false for undefined', () => {
		expect(identity(undefined)).toEqual(false);
	});

	it('should be false for null', () => {
		// eslint-disable-next-line unicorn/no-null
		expect(identity(null)).toEqual(false);
	});
});
