import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import packageJson from '../package.json';
import packageJson from '../package.json';
import { day, results, year } from '..';
import { runner } from '../part_one';

describe(`${year} - Day ${day} - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(runner(input.input)).to.equal(Infinity);
	});

	it('should be that that both the first examples resolves to 0', async () => {
		expect(await runner('')).to.equal(0);
	});
});
