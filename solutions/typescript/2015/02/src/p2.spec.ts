import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };

import { runner } from './p2.js';

describe('2015 - Day 2 - Part Two', () => {
	it('should solve the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(await runner(input.input)).to.equal(3842356);
	});

	it('should be that that the first example resolves to 34', async () => {
		expect(await runner('2x3x4')).to.equal(34);
	});

	it('should be that that the second example resolves to 14', async () => {
		expect(await runner('1x1x10')).to.equal(14);
	});
});
