import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p2 } from './p2.js';

describe('2015 - Day 1 - Part Two', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(await p2(resources.input)).to.equal(1795);
	});

	it('should be that that the first example resolves to 1', async () => {
		expect(await p2(')')).to.equal(1);
	});

	it('should be that that the second example resolves to 5', async () => {
		expect(await p2('()())')).to.equal(5);
	});
});