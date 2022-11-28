import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe('2015 - Day 4 - Part One', () => {
	it(
		'should resolve to 346386 when using the input',
		async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
			expect(runner(input.input)).to.equal(346386);
		},
		{ timeout: 20000 }
	);

	it(
		'should resolve to 609043 when using the example',
		async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.txt')();
			expect(runner(input.input)).to.equal(609043);
		},
		{ timeout: 20000 }
	);

	it(
		'should resolve to 1048970 when using the second example',
		async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.2.txt')();
			expect(runner(input.input)).to.equal(1048970);
		},
		{ timeout: 20000 }
	);
});
