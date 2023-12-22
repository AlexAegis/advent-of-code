import { Interval } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import { findReflectivePairings } from './matrix-reflection.js';

describe('findReflectivePairings', () => {
	it('should be able to collect reflective pairs from the middle', () => {
		const result = findReflectivePairings(Interval.closed(0, 8), 4);
		expect(result.length).toEqual(4);
		expect(result[0]).toEqual([4, 5]);
		expect(result[1]).toEqual([3, 6]);
		expect(result[2]).toEqual([2, 7]);
		expect(result[3]).toEqual([1, 8]);
	});

	it('should be able to collect reflective pairs from the start', () => {
		const result = findReflectivePairings(Interval.closed(0, 8), 0);
		expect(result.length).toEqual(1);
		expect(result[0]).toEqual([0, 1]);
	});
});
