import { describe, expect, it } from 'vitest';
import { identity } from './identity.function';

describe('identity', () => {
	it('should be true for a non-nullish value', () => {
		expect(identity(1)).to.be.true;
	});

	it('should be true for a nullish but non-null value', () => {
		expect(identity(0)).to.be.true;
	});

	it('should be false for undefined', () => {
		expect(identity(undefined)).to.be.false;
	});

	it('should be false for null', () => {
		expect(identity(null)).to.be.false;
	});
});
