import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner as graphRunner } from './p1.graph.js';
import { runner } from './p1.js';

describe('2020 - Day 24 - Part One', () => {
	it('should solve for the input', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
		expect(runner(input.input)).to.equal(479);
	});

	it('should solve for the first example', async () => {
		const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
		expect(runner(input.input)).to.equal(10);
	});

	describe('Graph', () => {
		it('should solve for the input', async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day)();

			expect(await graphRunner(input.input)).to.equal(479);
		});

		it('should solve for the first example', async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
			expect(await graphRunner(input.input)).to.equal(10);
		});
	});
});
