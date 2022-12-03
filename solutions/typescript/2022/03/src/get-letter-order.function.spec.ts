import { describe, expect, it } from 'vitest';
import { getLetterOrder } from './get-letter-order.function.js';

describe('getLetterOrder', () => {
	describe('lowercase letters', () => {
		it('should return 1 for a', () => {
			expect(getLetterOrder('a')).toBe(1);
		});

		it('should return 2 for b', () => {
			expect(getLetterOrder('b')).toBe(2);
		});

		it('should return 26 for z', () => {
			expect(getLetterOrder('z')).toBe(26);
		});
	});

	describe('uppercase letters', () => {
		it('should return 27 for A', () => {
			expect(getLetterOrder('A')).toBe(27);
		});

		it('should return 28 for B', () => {
			expect(getLetterOrder('B')).toBe(28);
		});

		it('should return 26 for Z', () => {
			expect(getLetterOrder('Z')).toBe(52);
		});
	});

	describe('invalid cases', () => {
		it('should return 0 for the empty string', () => {
			expect(getLetterOrder('')).toBe(0);
		});
	});
});
