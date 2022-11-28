import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2021 - Day 8 - Part Two', () => {
	it('should resolve when using the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(1097568);
	});

	describe('example 1', () => {
		it('should resolve to 5353', async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
			expect(runner(input.input)).to.equal(5353);
		});
	});

	describe('example 2', () => {
		it('should resolve to 61229', async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.2.txt')();
			expect(runner(input.input)).to.equal(61229);
		});
	});
});
