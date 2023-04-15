import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe('2021 - Day 18 - Part One', () => {
	describe('the input', () => {
		it('should resolve to 4184', async () => {
			const { input } = await loadTaskResources(packageJson.aoc);
			expect(await p1(input)).to.equal(4184);
		});
	});

	describe('example 1', () => {
		it('should resolve to 4140', async () => {
			const { input } = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(await p1(input)).to.equal(4140);
		});
	});
});
