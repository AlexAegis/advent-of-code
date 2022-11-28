import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2015 - Day 3 - Part Two', () => {
	it('should solve the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(2631);
	});

	it('should be that that the first example resolves to 3', async () => {
		expect(await runner('^v')).to.equal(3);
	});

	it('should be that that the second example resolves to 3', async () => {
		expect(await runner('^>v<')).to.equal(3);
	});

	it('should be that that the third example resolves to 11', async () => {
		expect(await runner('^v^v^v^v^v')).to.equal(11);
	});
});
