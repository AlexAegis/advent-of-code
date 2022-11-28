import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2018 - Day 5 - Part Two', () => {
	it(
		'should solve the input',
		async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
			expect(runner(input.input)).to.equal(6394);
		},
		{ timeout: 10000 }
	);

	it(
		'should resolve to 4 when using the example',
		async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.txt')();
			expect(runner(input.input)).to.equal(4);
		},
		{ timeout: 10000 }
	);
});
