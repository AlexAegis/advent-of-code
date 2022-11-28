import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe('2019 - Day 12 - Part One', () => {
	it(`should resolve to 8625 when using the input`, async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner()(input.input)).to.equal(8625);
	});

	it('should be that that the first examples resolves to 179 after 10 steps', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
		expect(runner(10)(input.input)).to.equal(179);
	});

	it('should be that that the second examples resolves to 1940 after a 100 steps', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.2.txt')();
		expect(runner(100)(input.input)).to.equal(1940);
	});
});
