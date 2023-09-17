import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2016 - Day 1 - Part Two', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).toEqual(159);
	});

	it('should be that that the example resolves to 4', () => {
		expect(p2('R8, R4, R4, R8')).toEqual(4);
	});
});
