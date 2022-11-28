import { read } from '@alexaegis/advent-of-code-lib';
import { beforeAll, describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p1.js';

describe('2021 - Day 18 - Part One', () => {
	describe('the input', () => {
		let input!: string;
		beforeAll(async () => {
			input = (await read(packageJson.aoc.year, packageJson.aoc.day)()).input;
		});

		it('should resolve to 4184', async () => {
			expect(await runner(input)).to.equal(4184);
		});
	});

	describe('example 1', () => {
		let input!: string;
		beforeAll(async () => {
			input = (await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')())
				.input;
		});

		it('should resolve to 4140', async () => {
			expect(await runner(input)).to.equal(4140);
		});
	});
});
