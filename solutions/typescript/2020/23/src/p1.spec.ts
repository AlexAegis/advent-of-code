import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1array } from './p1.array.js';
import { p1 } from './p1.js';

describe('2020 - Day 23 - Part One', () => {
	it('should solve for the input', async () => {
		const { input } = await loadTaskResources(packageJson.aoc);
		expect(p1()(input)).to.equal(74_698_532);
	});

	it('should solve example 1 using 10 iterations', async () => {
		const { input } = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p1(10)(input)).to.equal(92_658_374);
	});

	it('should solve example 1 using the default iteration count', async () => {
		const { input } = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p1()(input)).to.equal(67_384_529);
	});

	describe('Array', () => {
		it('should solve for the input', async () => {
			const { input } = await loadTaskResources(packageJson.aoc);
			expect(p1array()(input)).to.equal(74_698_532);
		});

		it('should solve example 1 using 10 iterations', async () => {
			const { input } = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p1array(10)(input)).to.equal(92_658_374);
		});

		it('should solve example 1 using the default iteration count', async () => {
			const { input } = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p1array()(input)).to.equal(67_384_529);
		});
	});
});
