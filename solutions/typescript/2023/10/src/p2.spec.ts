import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p2 } from './p2.js';

describe('2023 10 p2', () => {
	describe('the input', () => {
		it('should solve the input', async () => {
			const { input } = await loadTaskResources(packageJson.aoc);
			expect(p2(input)).toEqual(435);
		});
	});

	describe('example 1', () => {
		it('should be solved', async () => {
			const { input } = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p2(input)).toEqual(1);
		});
	});

	describe('example 2', () => {
		it('should be solved', async () => {
			const { input } = await loadTaskResources(packageJson.aoc, 'example.2.txt');
			expect(p2(input)).toEqual(4);
		});
	});

	describe('example 2b', () => {
		it('should be solved', async () => {
			const { input } = await loadTaskResources(packageJson.aoc, 'example.2b.txt');
			expect(p2(input)).toEqual(4);
		});
	});

	describe('example 3', () => {
		it('should be solved', async () => {
			const { input } = await loadTaskResources(packageJson.aoc, 'example.3.txt');
			expect(p2(input)).toEqual(10);
		});
	});
});
