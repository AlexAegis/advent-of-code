import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2021 - Day 2 - Part Two', () => {
	it('should resolve when using the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(1971232560);
	});

	describe('example', () => {
		it('should resolve to 900', async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
			expect(runner(input.input)).to.equal(900);
		});
	});
});
