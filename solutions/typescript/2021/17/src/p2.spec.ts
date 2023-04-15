import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2021 - Day 17 - Part Two', () => {
	describe('the input', () => {
		it('should resolve to 3202 ', async () => {
			const { input } = await loadTaskResources(packageJson.aoc);
			expect(await p2(input)).to.equal(3202);
		});
	});

	describe('target area: x=20..30, y=-10..-5', () => {
		const input = 'target area: x=20..30, y=-10..-5';

		it('should resolve to 112', async () => {
			expect(await p2(input)).to.equal(112);
		});
	});
});
