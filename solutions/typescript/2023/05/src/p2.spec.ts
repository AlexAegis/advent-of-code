import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2, refract } from './p2.js';
import { toRange, type Range } from './parse.js';

type StrippedRange = Omit<Range, 'from' | 'to' | 'slope'>;
const stripRange = (range: Range): StrippedRange => {
	return {
		destinationRange: range.destinationRange,
		sourceRangeStart: range.sourceRangeStart,
		rangeLength: range.rangeLength,
	};
};

describe.skip('2023 05 p2', () => {
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

	describe('refraction', () => {
		it('should refract into 3 ranges when B source is enveloped into A destination', () => {
			const a: Range = toRange('2 2 4');
			const b: Range = toRange('7 3 2');
			const result = refract([a, a], [b]).map(stripRange);
			console.log(result);
			expect(result).toContainEqual<StrippedRange>(stripRange(toRange('5 5 1')));
			expect(result).toContainEqual<StrippedRange>(stripRange(toRange('7 3 2')));
			expect(result).toContainEqual<StrippedRange>(stripRange(toRange('2 2 1')));
		});

		it('should refract into 1 range when a target is enveloped into b source', () => {
			const a: Range = toRange('2 2 2');
			const b: Range = toRange('1 0 6');
			const result = refract([a], [b]).map(stripRange);

			expect(result).toContainEqual<StrippedRange>(stripRange(toRange('3 2 2')));
			expect(result.length).toEqual(1);
		});
	});
});
