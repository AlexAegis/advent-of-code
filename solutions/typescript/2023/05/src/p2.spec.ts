import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2023 05 p2', () => {
	describe('the input', () => {
		it('should solve the input', async () => {
			const { input } = await loadTaskResources(packageJson.aoc);
			expect(p2(input)).toEqual(0);
		});
	});

	describe('example 1', () => {
		it('should be solved', async () => {
			const { input } = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p2(input)).toEqual(0);
		});
	});
	/*
	describe('refraction', () => {
		it('should refract into 3 ranges when b target is enveloped into a target', () => {
			const a: Range = {
				sourceRangeStart: 2,
				destinationRange: 2,
				rangeLength: 4,
			};
			const b: Range = {
				sourceRangeStart: 3,
				destinationRange: 7,
				rangeLength: 2,
			};
			const result = refract(a, b);

			expect(result).toContainEqual<Range>({
				sourceRangeStart: 5,
				destinationRange: 5,
				rangeLength: 1,
			});
			expect(result).toContainEqual<Range>({
				sourceRangeStart: 3,
				destinationRange: 7,
				rangeLength: 2,
			});
			expect(result).toContainEqual<Range>({
				sourceRangeStart: 2,
				destinationRange: 2,
				rangeLength: 1,
			});
			expect(result.length).toEqual(3);
		});

		it('should refract into 1 range when a target is enveloped into b source', () => {
			const a: Range = {
				sourceRangeStart: 2,
				destinationRange: 2,
				rangeLength: 2,
			};
			const b: Range = {
				sourceRangeStart: 0,
				destinationRange: 1,
				rangeLength: 6,
			};
			const result = refract(a, b);

			expect(result).toContainEqual<Range>({
				sourceRangeStart: 2,
				destinationRange: 3,
				rangeLength: 2,
			});
			expect(result.length).toEqual(1);
		});
	});*/
});
