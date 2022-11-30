import { read } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p2 } from './p2.js';

describe('2021 01 p2', () => {
	describe('the input', () => {
		it('should solve the input', async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day)();
			expect(p2(input.input)).to.equal(0);
		});
	});

	describe('example 1', () => {
		it('should be solved', async () => {
			const input = await read(packageJson.aoc.year, packageJson.aoc.day, 'example.1.txt')();
			expect(p2(input.input)).to.equal(0);
		});
	});
});
