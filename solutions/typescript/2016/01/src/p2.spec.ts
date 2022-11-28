import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2016 - Day 1 - Part Two', () => {
	it('should solve the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(159);
	});

	it('should be that that the example resolves to 4', async () => {
		expect(await runner('R8, R4, R4, R8')).to.equal(4);
	});
});
