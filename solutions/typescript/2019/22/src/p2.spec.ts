import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2019 - Day 22 - Part Two', () => {
	it('should resolve to 81781678911487 when using the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner()(input.input)).to.equal(81781678911487);
	});

	it('should be that that the first example resolves to 104465755608520', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
		expect(runner()(input.input)).to.equal(104465755608520);
	});

	it('should be that that the second example resolves to 118925585929508', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.2.txt')();
		expect(runner()(input.input)).to.equal(118925585929508);
	});

	it('should be that that the third example resolves to 21734143743040', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.3.txt')();
		expect(runner()(input.input)).to.equal(21734143743040);
	});

	it('should be that that the fourth example resolves to 117607927195067', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.4.txt')();
		expect(runner()(input.input)).to.equal(117607927195067);
	});
});
