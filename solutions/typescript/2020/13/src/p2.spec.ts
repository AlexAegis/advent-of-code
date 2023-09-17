import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2020 - Day 13 - Part Two', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).toEqual(305_068_317_272_992);
	});

	it('should solve the first example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p2(resources.input)).toEqual(1_068_781);
	});

	it('should solve the second example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
		expect(p2(resources.input)).toEqual(3417);
	});

	it('should solve the third example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.3.txt');
		expect(p2(resources.input)).toEqual(754_018);
	});

	it('should solve the fourth example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.4.txt');
		expect(p2(resources.input)).toEqual(779_210);
	});

	it('should solve the fifth example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.5.txt');
		expect(p2(resources.input)).toEqual(1_261_476);
	});
	it('should solve the sixth example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.6.txt');
		expect(p2(resources.input)).toEqual(1_202_161_486);
	});
});
