import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p2 } from './p2.js';

describe('2020 - Day 7 - Part Two', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).toEqual(85_324);
	});

	it('should solve the first example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p2(resources.input)).toEqual(32);
	});

	it('should solve the second example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
		expect(p2(resources.input)).toEqual(126);
	});
});
