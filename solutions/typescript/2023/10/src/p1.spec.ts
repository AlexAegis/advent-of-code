import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe('2023 10 p1', () => {
	describe('the input', () => {
		it('should solve the input', async () => {
			const resources = await loadTaskResources(packageJson.aoc);
			expect(p1(resources.input)).toEqual(6733);
		});
	});

	describe('example 1', () => {
		it('should be solved', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p1(resources.input)).toEqual(8);
		});
	});

	describe('example 2', () => {
		it('should be solved', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
			expect(p1(resources.input)).toEqual(23);
		});
	});

	describe('example 2b', () => {
		it('should be solved', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.2b.txt');
			expect(p1(resources.input)).toEqual(22);
		});
	});

	describe('example 3', () => {
		it('should be solved', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.3.txt');
			expect(p1(resources.input)).toEqual(80);
		});
	});
});
