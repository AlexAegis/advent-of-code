import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2020 - Day 23 - Part Two', () => {
	it(
		'should solve the input',
		async () => {
			const { input } = await loadTaskResources(packageJson.aoc);
			expect(p2(input)).to.equal(286194102744);
		},
		{ timeout: 20000 }
	);

	it(
		'should solve the example',
		async () => {
			const { input } = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p2(input)).to.equal(149245887792);
		},
		{ timeout: 20000 }
	);
});
