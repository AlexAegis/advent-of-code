import { describe, expect, it } from 'vitest';
import { arrayDiff } from './array-diff.function.js';

describe('arrayDiff', () => {
	it('should be able to partition two arrays', () => {
		const a = [0, 1, 2];
		const b = [2, 3, 4];
		const diffResult = arrayDiff(a, b);

		expect(diffResult.bothHas).toEqual([2]);
		expect(diffResult.onlyInFirst).toEqual([0, 1]);
		expect(diffResult.onlyInSecond).toEqual([3, 4]);
	});
});
