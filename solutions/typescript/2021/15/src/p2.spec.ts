import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p2 } from './p2.js';

describe('2021 - Day 15 - Part Two', () => {
	it.skip('should resolve when using the input', async () => {
		// Runs too long
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).to.equal(2925);
	});

	describe('example 1', () => {
		it('should resolve to 315', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p2(resources.input)).to.equal(315);
		});
	});
});
