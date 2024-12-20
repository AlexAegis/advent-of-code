import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p2 } from './p2.js';

describe('2015 - Day 2 - Part Two', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).toEqual(3_842_356);
	});

	it('should be that that the first example resolves to 34', () => {
		expect(p2('2x3x4')).toEqual(34);
	});

	it('should be that that the second example resolves to 14', () => {
		expect(p2('1x1x10')).toEqual(14);
	});
});
