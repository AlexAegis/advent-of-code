import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2019 - Day 24 - Part Two', () => {
	it(
		'should solve the input',
		async () => {
			const resources = await loadTaskResources(packageJson.aoc);
			expect(p2()(resources.input)).toEqual(2120);
		},
		{ timeout: 20_000 },
	);

	it('should resolve to 99 when using the first example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p2(10)(resources.input)).toEqual(99);
	});
});
