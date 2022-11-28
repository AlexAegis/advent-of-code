import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2020 - Day 13 - Part Two', () => {
	it('should solve the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(305068317272992);
	});

	it('should solve the first example', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
		expect(runner(input.input)).to.equal(1068781);
	});

	it('should solve the second example', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.2.txt')();
		expect(runner(input.input)).to.equal(3417);
	});

	it('should solve the third example', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.3.txt')();
		expect(runner(input.input)).to.equal(754018);
	});

	it('should solve the fourth example', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.4.txt')();
		expect(runner(input.input)).to.equal(779210);
	});

	it('should solve the fifth example', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.5.txt')();
		expect(runner(input.input)).to.equal(1261476);
	});
	it('should solve the sixth example', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.6.txt')();
		expect(runner(input.input)).to.equal(1202161486);
	});
});
