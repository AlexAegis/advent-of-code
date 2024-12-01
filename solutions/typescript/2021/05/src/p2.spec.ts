import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p2 } from './p2.js';

describe('2021 - Day 5 - Part Two', () => {
	it('should resolve when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).toEqual(22_364);
	});

	describe('example', () => {
		it('should resolve to 12', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p2(resources.input)).toEqual(12);
		});
	});
});
