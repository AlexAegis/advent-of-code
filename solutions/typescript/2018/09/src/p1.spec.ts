import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe('2018 - Day 9 - Part One', () => {
	it('should resolve to 361466 when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).toEqual(361_466);
	});

	it('should resolve to 32 when using the zeroth example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.0.txt');
		expect(p1(resources.input)).toEqual(32);
	});

	it('should resolve to 8317 when using the first example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p1(resources.input)).toEqual(8317);
	});

	it('should resolve to 146373 when using the second example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
		expect(p1(resources.input)).toEqual(146_373);
	});

	it('should resolve to 2764 when using the third example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.3.txt');
		expect(p1(resources.input)).toEqual(2764);
	});

	it('should resolve to 54718 when using the fourth example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.4.txt');
		expect(p1(resources.input)).toEqual(54_718);
	});

	it('should resolve to 37305 when using the fifth example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.5.txt');
		expect(p1(resources.input)).toEqual(37_305);
	});
});
