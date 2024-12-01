import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe('2020 - Day 19 - Part One', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).toEqual(208);
	});

	it('should solve example 1', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p1(resources.input)).toEqual(2);
	});

	it('should solve example 2', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
		expect(p1(resources.input)).toEqual(2);
	});

	it('should solve example 3', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.3.txt');
		expect(p1(resources.input)).toEqual(3);
	});
});
