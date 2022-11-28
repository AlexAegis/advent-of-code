import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2020 - Day 18 - Part Two', () => {
	it('should solve the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(297139939002972);
	});

	it('should solve example 1', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
		expect(runner(input.input)).to.equal(231);
	});

	it('should solve example 2', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.2.txt')();
		expect(runner(input.input)).to.equal(51);
	});

	it('should solve example 3', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.3.txt')();
		expect(runner(input.input)).to.equal(46);
	});

	it('should solve example 4', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.4.txt')();
		expect(runner(input.input)).to.equal(1445);
	});

	it('should solve example 5', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.5.txt')();
		expect(runner(input.input)).to.equal(669060);
	});

	it('should solve example 6', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.6.txt')();
		expect(runner(input.input)).to.equal(23340);
	});
});
