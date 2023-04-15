import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1g } from './p1.graph.js';
import { p1 } from './p1.js';

describe('2020 - Day 24 - Part One', () => {
	it('should solve for the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).to.equal(479);
	});

	it('should solve for the first example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p1(resources.input)).to.equal(10);
	});

	describe('Graph', () => {
		it('should solve for the input', async () => {
			const resources = await loadTaskResources(packageJson.aoc);

			expect(await p1g(resources.input)).to.equal(479);
		});

		it('should solve for the first example', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(await p1g(resources.input)).to.equal(10);
		});
	});
});
