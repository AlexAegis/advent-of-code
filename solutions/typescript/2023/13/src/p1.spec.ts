import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { findReflectivePairings, p1 } from './p1.js';

describe('2023 13 p1', () => {
	describe('the input', () => {
		it('should solve the input', async () => {
			const resources = await loadTaskResources(packageJson.aoc);
			expect(p1(resources.input)).toEqual(37_718);
		});
	});

	describe('example 1', () => {
		it('should be solved', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p1(resources.input)).toEqual(405);
		});
	});

	describe('findReflectivePairings', () => {
		it('should be able to collect reflective pairs from the middle', () => {
			const result = findReflectivePairings(0, 8, 4);
			console.log(result);
			expect(result.length).toEqual(4);
			expect(result[0]).toEqual([4, 5]);
			expect(result[1]).toEqual([3, 6]);
			expect(result[2]).toEqual([2, 7]);
			expect(result[3]).toEqual([1, 8]);
		});

		it('should be able to collect reflective pairs from the start', () => {
			const result = findReflectivePairings(0, 8, 0);
			console.log(result);
			expect(result.length).toEqual(1);
			expect(result[0]).toEqual([0, 1]);
		});
	});
});
