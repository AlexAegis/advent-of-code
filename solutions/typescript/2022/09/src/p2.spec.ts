import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2022 09 p2', () => {
	describe('the input', () => {
		it('should solve the input', async () => {
			const { input } = await loadTaskResources(packageJson.aoc);
			expect(p2(input)).to.equal(2533);
		});
	});

	describe('example 1', () => {
		it('should be solved', async () => {
			const { input } = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p2(input)).to.equal(1);
		});
	});

	describe('example 2', () => {
		it('should be solved', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
			expect(p2(resources.input)).to.equal(36);
		});
	});
});
