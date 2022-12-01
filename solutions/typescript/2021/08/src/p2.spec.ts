import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p2 } from './p2.js';

describe('2021 - Day 8 - Part Two', () => {
	it('should resolve when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).to.equal(1097568);
	});

	describe('example 1', () => {
		it('should resolve to 5353', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p2(resources.input)).to.equal(5353);
		});
	});

	describe('example 2', () => {
		it('should resolve to 61229', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
			expect(p2(resources.input)).to.equal(61229);
		});
	});
});
