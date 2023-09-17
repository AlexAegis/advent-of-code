import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe('2016 - Day 2 - Part One', () => {
	it('should resolve to 24862 when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).toEqual(24_862);
	});

	it('should be that that the first example resolves to 1985', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p1(resources.input)).toEqual(1985);
	});
});
