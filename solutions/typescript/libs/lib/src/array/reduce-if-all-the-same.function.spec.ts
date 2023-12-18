import { describe, expect, it } from 'vitest';
import { reduceIfAllTheSame } from './reduce-if-all-the-same.function.js';

describe('reduceIfAllTheSame', () => {
	it('should return undefined for empty arrays', () => {
		const result = reduceIfAllTheSame<unknown>([]);
		expect(result).toBeUndefined();
	});

	it('should return undefined for arrays where items are different', () => {
		const result = reduceIfAllTheSame([1, 1, 2]);
		expect(result).toBeUndefined();
	});

	it('should return 1 for arrays where items are 1', () => {
		const result = reduceIfAllTheSame([1, 1, 1]);
		expect(result).toEqual(1);
	});

	it('should return 1 for arrays where there is only one item', () => {
		const result = reduceIfAllTheSame([1]);
		expect(result).toEqual(1);
	});

	describe('minimumLength', () => {
		it('should return undefined even if all of them are the same, if the minimumLength is larger', () => {
			const result = reduceIfAllTheSame([1, 1, 1], 5);
			expect(result).toEqual(undefined);
		});
	});
});
