import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2020 - Day 23 - Part Two', () => {
	it(
		'should solve the input',
		async () => {
			const { input } = await loadTaskResources(packageJson.aoc);
			expect(p2(input)).to.equal(286_194_102_744);
		},
		{ timeout: 20_000 },
	);

	it(
		'should solve the example',
		async () => {
			const { input } = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p2(input)).to.equal(149_245_887_792);
		},
		{ timeout: 20_000 },
	);
});
