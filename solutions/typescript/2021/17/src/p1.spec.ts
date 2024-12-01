import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe('2021 - Day 17 - Part One', () => {
	describe('the input', () => {
		it('should resolve to 3202 ', async () => {
			const { input } = await loadTaskResources(packageJson.aoc);
			expect(p1(input)).toEqual(5995);
		});
	});

	describe('target area: x=20..30, y=-10..-5', () => {
		const input = 'target area: x=20..30, y=-10..-5';

		it('should resolve to 45', () => {
			expect(p1(input)).toEqual(45);
		});
	});
});
