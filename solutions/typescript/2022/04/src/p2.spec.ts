import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { closedRangeIntersectLength, p2 } from './p2.js';

describe('2022 04 p2', () => {
	describe('the input', () => {
		it('should solve the input', async () => {
			const { input } = await loadTaskResources(packageJson.aoc);
			expect(p2(input)).toEqual(852);
		});
	});

	describe('example 1', () => {
		it('should be solved', async () => {
			const { input } = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p2(input)).toEqual(4);
		});
	});

	describe('closedRangeIntersectLength', () => {
		it('should work for fully overlapping ranges', () => {
			expect(closedRangeIntersectLength([1, 9], [2, 8])).toBe(7);
		});

		it('should work for fully overlapping ranges the other way around', () => {
			expect(closedRangeIntersectLength([4, 5], [2, 8])).toBe(2);
		});

		it('should work for partially overlapping ranges', () => {
			expect(closedRangeIntersectLength([1, 5], [2, 6])).toBe(4);
		});

		it('should work for edge overlaps', () => {
			expect(closedRangeIntersectLength([1, 5], [5, 6])).toBe(1);
		});

		it('should return 0 for non overlapping ranges', () => {
			expect(closedRangeIntersectLength([1, 5], [7, 9])).toBe(0);
		});

		it('should return 1 for single value ranges', () => {
			expect(closedRangeIntersectLength([1, 1], [1, 1])).toBe(1);
		});
	});
});
