import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe('2018 - Day 9 - Part One', () => {
	it('should resolve to 361466 when using the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(361466);
	});

	it('should resolve to 32 when using the zeroth example', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.0.txt')();
		expect(runner(input.input)).to.equal(32);
	});

	it('should resolve to 8317 when using the first example', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
		expect(runner(input.input)).to.equal(8317);
	});

	it('should resolve to 146373 when using the second example', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.2.txt')();
		expect(runner(input.input)).to.equal(146373);
	});

	it('should resolve to 2764 when using the third example', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.3.txt')();
		expect(runner(input.input)).to.equal(2764);
	});

	it('should resolve to 54718 when using the fourth example', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.4.txt')();
		expect(runner(input.input)).to.equal(54718);
	});

	it('should resolve to 37305 when using the fifth example', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.5.txt')();
		expect(runner(input.input)).to.equal(37305);
	});
});
