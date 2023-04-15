import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe('2022 06 p1', () => {
	describe('the input', () => {
		it('should solve the input', async () => {
			const resources = await loadTaskResources(packageJson.aoc);
			expect(p1(resources.input)).to.equal(1876);
		});
	});

	describe('example 1', () => {
		it('should be solved', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(p1(resources.input)).to.equal(7);
		});
	});

	describe('example 2', () => {
		it('should be solved', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
			expect(p1(resources.input)).to.equal(5);
		});
	});

	describe('example 3', () => {
		it('should be solved', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.3.txt');
			expect(p1(resources.input)).to.equal(6);
		});
	});

	describe('example 4', () => {
		it('should be solved', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.4.txt');
			expect(p1(resources.input)).to.equal(10);
		});
	});

	describe('example 5', () => {
		it('should be solved', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.5.txt');
			expect(p1(resources.input)).to.equal(11);
		});
	});
});
