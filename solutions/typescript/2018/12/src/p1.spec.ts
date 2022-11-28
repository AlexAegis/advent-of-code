import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe(`2018 - Day 12 - Part One`, () => {
	it(`should resolve to 3230 when using the input`, async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(3230);
	});

	it(`should resolve to 325 when using the example`, async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.txt')();
		expect(runner(input.input)).to.equal(325);
	});
});
