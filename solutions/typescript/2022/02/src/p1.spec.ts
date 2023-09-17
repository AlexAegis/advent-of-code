import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe('2022 02 p1', () => {
	describe('the input', () => {
		it('should solve the input', async () => {
			const resources = await loadTaskResources(packageJson.aoc);
			expect(p1(resources.input)).toEqual(11_063);
		});
	});

	describe('input 2', () => {
		it('should solve the input', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'input.2.txt');
			expect(p1(resources.input)).toEqual(9651);
		});
	});

	describe('example 1', () => {
		it('should be solved', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p1(resources.input)).toEqual(15);
		});
	});
});
