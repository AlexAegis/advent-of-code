import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2015 - Day 4 - Part Two', () => {
	it(
		'should solve the input',
		async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
			expect(runner(input.input)).to.equal(9958218);
		},
		{ timeout: 20000 }
	);

	it(
		'should resolve to 6742839 when using the example',
		async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.txt')();
			expect(runner(input.input)).to.equal(6742839);
		},
		{ timeout: 20000 }
	);

	it(
		'should resolve to 5714438 when using the example',
		async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.2.txt')();
			expect(runner(input.input)).to.equal(5714438);
		},
		{ timeout: 20000 }
	);
});
