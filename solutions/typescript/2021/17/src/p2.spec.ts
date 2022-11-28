import { read } from '@alexaegis/advent-of-code-lib';
import { beforeAll, describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { runner } from './p2.js';

describe('2021 - Day 17 - Part Two', () => {
	describe('the input', () => {
		let input!: string;
		beforeAll(async () => {
			input = (await read(packageJson.aoc.year, packageJson.aoc.day)()).input;
		});

		it('should resolve to 3202 ', async () => {
			expect(await runner(input)).to.equal(3202);
		});
	});

	describe('target area: x=20..30, y=-10..-5', () => {
		const input = 'target area: x=20..30, y=-10..-5';

		it('should resolve to 112', async () => {
			expect(await runner(input)).to.equal(112);
		});
	});
});
