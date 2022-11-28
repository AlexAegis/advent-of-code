import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe('2019 - Day 10 - Part One', () => {
	it(`should resolve to 230 when using the input`, async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(230);
	});

	it('should be that that the first example resolves to 8', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
		expect(runner(input.input)).to.equal(8);
	});

	it('should be that that the second example resolves to 33', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.2.txt')();
		expect(runner(input.input)).to.equal(33);
	});

	it('should be that that the third example resolves to 35', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.3.txt')();
		expect(runner(input.input)).to.equal(35);
	});

	it('should be that that the fourth example resolves to 41', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.4.txt')();
		expect(runner(input.input)).to.equal(41);
	});

	it('should be that that the fifth example resolves to 210', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.5.txt')();
		expect(runner(input.input)).to.equal(210);
	});
});
