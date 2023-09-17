import { describe, expect, it } from 'vitest';
import { divisible } from './divisible.function.js';

describe('divisible', () => {
	it('should return true if divisible', () => {
		expect(divisible(4, 2)).toEqual(true);
	});

	it('should return false if not divisible', () => {
		expect(divisible(4, 3)).toEqual(false);
	});
});
