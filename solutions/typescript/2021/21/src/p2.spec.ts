import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p2 } from './p2.js';

describe('2021 - Day 21 - Part Two', () => {
	describe('the input', () => {
		it('should resolve to 309196008717909', async () => {
			const { input } = await loadTaskResources(packageJson.aoc);
			expect(await p2(input)).to.equal(309196008717909);
		});
	});

	describe('example 1', () => {
		it('should resolve to 444356092776315', async () => {
			const { input } = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(await p2(input)).to.equal(444356092776315);
		});
	});
});
