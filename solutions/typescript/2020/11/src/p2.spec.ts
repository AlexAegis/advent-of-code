import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2020 - Day 11 - Part Two', () => {
	it(
		'should solve the input',
		async () => {
			const resources = await loadTaskResources(packageJson.aoc);
			expect(p2(resources.input)).to.equal(2149);
		},
		{ timeout: 20_000 },
	);

	it(
		'should solve the first example',
		async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p2(resources.input)).to.equal(26);
		},
		{ timeout: 20_000 },
	);
});
