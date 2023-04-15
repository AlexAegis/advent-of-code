import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe(`2015 - Day 2 - Part One`, () => {
	it(`should resolve to 1606483 when using the input`, async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(await p1(resources.input)).to.equal(1606483);
	});

	it('should be that that the first example resolves to 58', async () => {
		expect(await p1('2x3x4')).to.equal(58);
	});

	it('should be that that the second example resolves to 43', async () => {
		expect(await p1('1x1x10')).to.equal(43);
	});
});
