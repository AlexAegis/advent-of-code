import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe('2019 - Day 12 - Part One', () => {
	it(`should resolve to 8625 when using the input`, async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1()(resources.input)).to.equal(8625);
	});

	it('should be that that the first examples resolves to 179 after 10 steps', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p1(10)(resources.input)).to.equal(179);
	});

	it('should be that that the second examples resolves to 1940 after a 100 steps', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
		expect(p1(100)(resources.input)).to.equal(1940);
	});
});
