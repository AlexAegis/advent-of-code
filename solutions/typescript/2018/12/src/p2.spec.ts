import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2018 - Day 12 - Part Two', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).to.equal(4400000000304);
	});

	it('should solve the example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.txt');
		expect(p2(resources.input)).to.equal(999999999374);
	});
});
