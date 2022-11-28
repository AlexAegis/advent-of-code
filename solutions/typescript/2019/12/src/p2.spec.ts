import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2019 - Day 12 - Part Two', () => {
	it('should solve the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(332477126821644);
	});

	it('should be that that the first example resolves to 2772', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
		expect(runner(input.input)).to.equal(2772);
	});

	it('should be that that the second example resolves to 4686774924', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.2.txt')();
		expect(runner(input.input)).to.equal(4686774924);
	});
});
