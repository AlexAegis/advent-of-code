import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe('2019 - Day 10 - Part One', () => {
	it('should resolve to 230 when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).toEqual(230);
	});

	it('should be that that the first example resolves to 8', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p1(resources.input)).toEqual(8);
	});

	it('should be that that the second example resolves to 33', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
		expect(p1(resources.input)).toEqual(33);
	});

	it('should be that that the third example resolves to 35', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.3.txt');
		expect(p1(resources.input)).toEqual(35);
	});

	it('should be that that the fourth example resolves to 41', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.4.txt');
		expect(p1(resources.input)).toEqual(41);
	});

	it('should be that that the fifth example resolves to 210', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.5.txt');
		expect(p1(resources.input)).toEqual(210);
	});
});
