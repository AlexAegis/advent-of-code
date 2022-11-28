import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import type { Args } from './args.interface.js';
import { runner } from './p2.js';

describe('2020 - Day 9 - Part Two', () => {
	it('should solve the input', async () => {
		const { input, args } = await read<Args>(packageJson.aoc.year, packageJson.aoc.day)();
		expect(await runner(input, args)).to.equal(28509180);
	});

	it('should solve the first example', async () => {
		const { input, args } = await read<Args>(
			packageJson.aoc.year,
			packageJson.aoc.day,
			'example.1.txt'
		)();
		expect(await runner(input, args)).to.equal(62);
	});
});
