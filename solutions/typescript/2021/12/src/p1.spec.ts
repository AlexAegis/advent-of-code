import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe('2021 - Day 12 - Part One', () => {
	it(`should resolve when using the input`, async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).to.equal(4167);
	});

	describe('example 1', () => {
		it('should resolve to 10', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p1(resources.input)).to.equal(10);
		});
	});

	describe('example 2', () => {
		it('should resolve to 19', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
			expect(p1(resources.input)).to.equal(19);
		});
	});

	describe('example 3', () => {
		it('should resolve to 226', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.3.txt');
			expect(p1(resources.input)).to.equal(226);
		});
	});
});
