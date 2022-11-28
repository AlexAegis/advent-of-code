import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe('2020 - Day 19 - Part One', () => {
	it('should solve the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(208);
	});

	it('should solve example 1', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
		expect(runner(input.input)).to.equal(2);
	});

	it('should solve example 2', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.2.txt')();
		expect(runner(input.input)).to.equal(2);
	});

	it('should solve example 3', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.3.txt')();
		expect(runner(input.input)).to.equal(3);
	});
});
