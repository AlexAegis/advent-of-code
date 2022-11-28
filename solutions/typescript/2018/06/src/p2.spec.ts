import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import type { Args } from './model/args.interface.js';
import { runner } from './p2.js';

describe('2018 - Day 6 - Part Two', () => {
	it('should solve the input', async () => {
		const { input, args } = await read<Args>(packageJson.aoc.year, packageJson.aoc.day)();

		expect(await runner(input, args)).to.equal(42998);
	});

	it('should resolve to ${results.two.example} when using the example', async () => {
		const { input, args } = await read<Args>(
			packageJson.aoc.year,
			packageJson.aoc.day,
			'example.txt'
		)();
		expect(await runner(input, args)).to.equal(16);
	});
});
