import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2019 - Day 1 - Part Two', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).toEqual(5_097_039);
	});

	it('should be that that the first example resolves to 2', () => {
		expect(p2('14')).toEqual(2);
	});

	it('should be that that the second example resolves to 966', () => {
		expect(p2('1969')).toEqual(966);
	});

	it('should be that that the third example resolves to 50346', () => {
		expect(p2('100756')).toEqual(50_346);
	});
});
