import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2018 - Day 5 - Part Two', () => {
	it(
		'should solve the input',
		async () => {
			const resources = await loadTaskResources(packageJson.aoc);
			expect(p2(resources.input)).toEqual(6394);
		},
		{ timeout: 10_000 },
	);

	it(
		'should resolve to 4 when using the example',
		async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.txt');
			expect(p2(resources.input)).toEqual(4);
		},
		{ timeout: 10_000 },
	);
});
