import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe('2021 - Day 18 - Part One', () => {
	describe('the input', () => {
		it('should resolve to 752745', async () => {
			const { input } = await loadTaskResources(packageJson.aoc);
			expect(p1(input)).toEqual(752_745);
		});
	});

	describe('example 1', () => {
		it('should resolve to 739785', async () => {
			const { input } = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p1(input)).toEqual(739_785);
		});
	});
});
