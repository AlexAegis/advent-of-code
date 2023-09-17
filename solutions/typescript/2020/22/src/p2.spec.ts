import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2020 - Day 22 - Part Two', () => {
	it(
		'should solve the input',
		async () => {
			const resources = await loadTaskResources(packageJson.aoc);
			expect(p2(resources.input)).toEqual(32_528);
		},
		{ timeout: 20_000 },
	);

	it('should solve example 1', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p2(resources.input)).toEqual(291);
	});

	it('should solve example 2', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
		expect(p2(resources.input)).toEqual(19);
	});
});
