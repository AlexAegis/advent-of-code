import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2020 - Day 23 - Part Two', () => {
	it(
		'should solve the input',
		async () => {
			const input = (await read(packageJson.aoc.year, packageJson.aoc.day)()).input;
			expect(runner(input)).to.equal(286194102744);
		},
		{ timeout: 20000 }
	);

	it(
		'should solve the example',
		async () => {
			const input = (await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')())
				.input;
			expect(runner(input)).to.equal(149245887792);
		},
		{ timeout: 20000 }
	);
});
