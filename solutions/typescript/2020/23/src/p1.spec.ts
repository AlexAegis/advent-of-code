import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner as arrayRunner } from './p1.array.js';
import { runner } from './p1.js';

describe('2020 - Day 23 - Part One', () => {
	it('should solve for the input', async () => {
		const input = (await read(packageJson.aoc.year, packageJson.aoc.day)()).input;
		expect(runner()(input)).to.equal(74698532);
	});

	it('should solve example 1', async () => {
		const input = (await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')())
			.input;
		expect(runner(10)(input)).to.equal(92658374);
	});

	it('should solve example 2', async () => {
		const input = (await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')())
			.input;
		expect(runner()(input)).to.equal(67384529);
	});

	describe('Array', () => {
		it('should solve for the input', async () => {
			const input = (await read(packageJson.aoc.year, packageJson.aoc.day)()).input;
			expect(arrayRunner()(input)).to.equal(74698532);
		});

		it('should solve example 1', async () => {
			const input = (await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')())
				.input;
			expect(arrayRunner(10)(input)).to.equal(92658374);
		});

		it('should solve example 2', async () => {
			const input = (await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')())
				.input;
			expect(arrayRunner()(input)).to.equal(67384529);
		});
	});
});
