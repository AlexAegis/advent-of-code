import { describe, expect, it } from 'vitest';
import { gcd } from './gcd.function.js';

describe('gcd', () => {
	it('should return 20 with 120 and -20', () => {
		expect(gcd(120, -20)).toEqual(20);
	});

	it('should return 3 with 3, 3', () => {
		expect(gcd(3, 3)).toEqual(3);
	});

	it('should return 12 with 24, 36', () => {
		expect(gcd(24, 36)).toEqual(12);
	});
});
