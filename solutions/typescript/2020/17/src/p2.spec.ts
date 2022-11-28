import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2020 - Day 17 - Part Two', () => {
	it(
		'should solve the input',
		async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
			expect(runner(input.input)).to.equal(1868);
		},
		{ timeout: 20000 }
	);

	it(
		'should solve the first example',
		async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
			expect(runner(input.input)).to.equal(848);
		},
		{ timeout: 20000 }
	);
});
