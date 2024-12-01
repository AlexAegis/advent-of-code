import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { areClosedRangesFullyOverlapping, p1 } from './p1.js';

describe('2022 04 p1', () => {
	describe('the input', () => {
		it('should solve the input', async () => {
			const resources = await loadTaskResources(packageJson.aoc);
			expect(p1(resources.input)).toEqual(433);
		});
	});

	describe('example 1', () => {
		it('should be solved', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p1(resources.input)).toEqual(2);
		});
	});

	describe('isFullyOverlapping', () => {
		it('should be true when the second is fully inside the first', () => {
			expect(areClosedRangesFullyOverlapping([2, 8], [3, 7])).toEqual(true);
		});

		it('should be true when the first is fully inside the second', () => {
			expect(areClosedRangesFullyOverlapping([4, 6], [3, 7])).toEqual(true);
		});

		it('should be true when the first is the same as the second', () => {
			expect(areClosedRangesFullyOverlapping([4, 6], [4, 6])).toEqual(true);
		});

		it('should be true when the only one side is the same as in the other', () => {
			expect(areClosedRangesFullyOverlapping([4, 7], [4, 6])).toEqual(true);
		});

		it('should be true when every value is the same', () => {
			expect(areClosedRangesFullyOverlapping([1, 1], [1, 1])).toEqual(true);
		});

		it('should be true when the first range has one element', () => {
			expect(areClosedRangesFullyOverlapping([1, 1], [1, 5])).toEqual(true);
		});

		it('should be false when they are not overlapping at all', () => {
			expect(areClosedRangesFullyOverlapping([1, 2], [3, 4])).toEqual(false);
		});

		it('should be false when they are only partially overlapping', () => {
			expect(areClosedRangesFullyOverlapping([1, 5], [3, 8])).toEqual(false);
		});
	});
});
