import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p2memoized } from './p2.memoized.js';

describe('2020 - Day 10 - Part Two (Memoized)', () => {
	it('should solve the input', async () => {
		const { input } = await loadTaskResources(packageJson.aoc);
		expect(p2memoized(input)).toEqual(169_255_295_254_528);
	});

	it('should solve the first example', async () => {
		const { input } = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p2memoized(input)).toEqual(8);
	});

	it('should solve the second example', async () => {
		const { input } = await loadTaskResources(packageJson.aoc, 'example.2.txt');
		expect(p2memoized(input)).toEqual(19_208);
	});
});
