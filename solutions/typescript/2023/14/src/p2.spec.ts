import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { findCycle, p2 } from './p2.js';

describe.skip('2023 14 p2', () => {
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

	describe('findCycle', () => {
		it('should find a simple repeating pattern', () => {
			const vals = [1, 2, 3, 4, 3, 4, 3, 4];
			const cycle = findCycle(vals);
			expect(cycle).toEqual([3, 4]);
		});

		it('should find a more complex repeating pattern', () => {
			const vals = [1, 2, 3, 4, 4, 3, 4, 4, 3, 4, 4];
			const cycle = findCycle(vals);
			expect(cycle).toEqual([3, 4, 4]);
		});
	});
});
