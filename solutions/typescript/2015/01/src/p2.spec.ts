import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2015 - Day 1 - Part Two', () => {
	it('should solve the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(await runner(input.input)).to.equal(1795);
	});

	it('should be that that the first example resolves to 1', async () => {
		expect(await runner(')')).to.equal(1);
	});

	it('should be that that the second example resolves to 5', async () => {
		expect(await runner('()())')).to.equal(5);
	});
});
