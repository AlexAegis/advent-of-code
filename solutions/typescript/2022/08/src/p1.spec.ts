import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe('2022 08 p1', () => {
	describe('the input', () => {
		it('should solve the input', async () => {
			const resources = await loadTaskResources(packageJson.aoc);
			expect(p1(resources.input)).toEqual(1779);
		});
	});

	describe('example 1', () => {
		it('should be solved', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p1(resources.input)).toEqual(21);
		});
	});
});
