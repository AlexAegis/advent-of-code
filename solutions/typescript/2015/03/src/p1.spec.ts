import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe('2015 - Day 3 - Part One', () => {
	it('should resolve to 2572 when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).to.equal(2572);
	});

	it('should be that that the first example resolves to 2', () => {
		expect(p1('>')).to.equal(2);
	});

	it('should be that that the second example resolves to 4', () => {
		expect(p1('^>v<')).to.equal(4);
	});

	it('should be that that the third example resolves to 2', () => {
		expect(p1('^v^v^v^v^v')).to.equal(2);
	});
});
