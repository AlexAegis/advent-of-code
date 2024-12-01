import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe('2020 - Day 3 - Part One', () => {
	it('should resolve to 265 when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).toEqual(265);
	});

	it('should be that that the first example resolves to 7', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p1(resources.input)).toEqual(7);
	});
});
