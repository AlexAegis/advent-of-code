import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe(`2019 - Day 6 - Part One`, () => {
	it(
		`should resolve to 223251 when using the input`,
		async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
			expect(runner(input.input)).to.equal(223251);
		},
		{ timeout: 20000 }
	);

	it(
		'should be that that the first example resolves to 42',
		async () => {
			expect(
				await runner('COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L')
			).to.equal(42);
		},
		{ timeout: 20000 }
	);
});
