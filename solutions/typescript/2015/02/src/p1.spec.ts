import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe('2015 - Day 2 - Part One', () => {
	it('should resolve to 1606483 when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).toEqual(1_606_483);
	});

	it('should be that that the first example resolves to 58', () => {
		expect(p1('2x3x4')).toEqual(58);
	});

	it('should be that that the second example resolves to 43', () => {
		expect(p1('1x1x10')).toEqual(43);
	});
});
