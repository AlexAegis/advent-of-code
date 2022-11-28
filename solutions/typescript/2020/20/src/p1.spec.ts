import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe('2020 - Day 20 - Part One', () => {
	it('should solve for the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(22878471088273);
	});

	it('should solve for the first example', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
		expect(runner(input.input)).to.equal(20899048083289);
	});
});
