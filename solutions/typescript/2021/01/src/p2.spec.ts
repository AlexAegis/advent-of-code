import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2021 - Day 1 - Part Two', () => {
	it('should resolve when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).to.equal(1395);
	});

	describe('example', () => {
		it('should resolve to 5', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p2(resources.input)).to.equal(5);
		});
	});
});
