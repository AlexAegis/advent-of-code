import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2017 - Day 2 - Part Two', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).to.equal(250);
	});

	it('should be that that the second example resolves to 18', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
		expect(p2(resources.input)).to.equal(9);
	});
});
