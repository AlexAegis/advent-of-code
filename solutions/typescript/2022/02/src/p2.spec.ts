import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p2 } from './p2.js';

describe('2022 02 p2', () => {
	describe('the input', () => {
		it('should solve the input', async () => {
			const { input } = await loadTaskResources(packageJson.aoc);
			expect(p2(input)).toEqual(10_349);
		});
	});

	describe('input 2', () => {
		it('should solve the input', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'input.2.txt');
			expect(p2(resources.input)).toEqual(10_560);
		});
	});

	describe('example 1', () => {
		it('should be solved', async () => {
			const { input } = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p2(input)).toEqual(12);
		});
	});
});
