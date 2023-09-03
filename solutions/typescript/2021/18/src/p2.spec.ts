import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2021 - Day 18 - Part Two', () => {
	describe('the input', () => {
		it('should resolve to 4731 ', async () => {
			const { input } = await loadTaskResources(packageJson.aoc);
			expect(p2(input)).to.equal(4731);
		});
	});

	describe('example 1', () => {
		it('should resolve to 3993', async () => {
			const { input } = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p2(input)).to.equal(3993);
		});
	});
});
