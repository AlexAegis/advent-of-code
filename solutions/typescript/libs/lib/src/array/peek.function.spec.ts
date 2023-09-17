import { describe, expect, it } from 'vitest';
import { peek } from './peek.function.js';

describe('peek', () => {
	it('should return the last value', () => {
		const array = [0, 1, 2, 3, 4, 5, 6];

		expect(peek(array)).toEqual(6);
	});

	it('should return undefined for an empty array', () => {
		expect(peek([])).toEqual(undefined);
	});
});
