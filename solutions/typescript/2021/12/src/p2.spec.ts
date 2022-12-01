import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p2 } from './p2.js';

describe('2021 - Day 12 - Part Two', () => {
	it.skip(`should resolve when using the input`, async () => {
		// ? Disabled as it runs for a long time
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).to.equal(98441);
	});

	describe('example 1', () => {
		it('should resolve to 36', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p2(resources.input)).to.equal(36);
		});
	});

	describe('example 2', () => {
		it('should resolve to 103', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
			expect(p2(resources.input)).to.equal(103);
		});
	});

	describe('example 3', () => {
		it('should resolve to 3509', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.3.txt');
			expect(p2(resources.input)).to.equal(3509);
		});
	});
});
