import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe('2020 - Day 18 - Part One', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).to.equal(25190263477788);
	});

	it('should solve example 1', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p1(resources.input)).to.equal(71);
	});

	it('should solve example 2', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
		expect(p1(resources.input)).to.equal(51);
	});

	it('should solve example 3', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.3.txt');
		expect(p1(resources.input)).to.equal(26);
	});

	it('should solve example 4', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.4.txt');
		expect(p1(resources.input)).to.equal(437);
	});

	it('should solve example 5', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.5.txt');
		expect(p1(resources.input)).to.equal(12240);
	});

	it('should solve example 6', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.6.txt');
		expect(p1(resources.input)).to.equal(13632);
	});
});
