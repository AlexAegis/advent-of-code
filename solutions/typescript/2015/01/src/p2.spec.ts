import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2015 - Day 1 - Part Two', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).to.equal(1795);
	});

	it('should be that that the first example resolves to 1', () => {
		expect(p2(')')).to.equal(1);
	});

	it('should be that that the second example resolves to 5', () => {
		expect(p2('()())')).to.equal(5);
	});
});
