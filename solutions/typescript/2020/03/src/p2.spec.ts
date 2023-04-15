import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2020 - Day 3 - Part Two', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).to.equal(3154761400);
	});

	it('should be that that the first example resolves to 336', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p2(resources.input)).to.equal(336);
	});
});
