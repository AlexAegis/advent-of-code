import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe(`2016 - Day 2 - Part One`, () => {
	it(`should resolve to 24862 when using the input`, async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(24862);
	});

	it('should be that that the first example resolves to 1985', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
		expect(runner(input.input)).to.equal(1985);
	});
});
