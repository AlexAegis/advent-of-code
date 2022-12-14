import { describe, expect, it } from 'vitest';
import { alphabeticalOrder } from './alphabetical-order.function.js';

describe('alphabeticalOrder', () => {
	describe('lowercase letters', () => {
		it('should return 1 for a', () => {
			expect(alphabeticalOrder('a')).toBe(1);
		});

		it('should return 2 for b', () => {
			expect(alphabeticalOrder('b')).toBe(2);
		});

		it('should return 26 for z', () => {
			expect(alphabeticalOrder('z')).toBe(26);
		});
	});

	describe('uppercase letters', () => {
		it('should return 27 for A', () => {
			expect(alphabeticalOrder('A')).toBe(27);
		});

		it('should return 28 for B', () => {
			expect(alphabeticalOrder('B')).toBe(28);
		});

		it('should return 26 for Z', () => {
			expect(alphabeticalOrder('Z')).toBe(52);
		});
	});

	describe('invalid cases', () => {
		it('should return 0 for the empty string', () => {
			expect(alphabeticalOrder('')).toBe(0);
		});
	});
});
