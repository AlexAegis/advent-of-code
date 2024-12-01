import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe('2020 - Day 7 - Part One', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).toEqual(197);
	});

	it('should solve for the first example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p1(resources.input)).toEqual(4);
	});

	it('should solve for the second example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
		expect(p1(resources.input)).toEqual(0);
	});
});
