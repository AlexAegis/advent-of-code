import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p2 } from './p2.js';

describe('2020 - Day 18 - Part Two', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).to.equal(297139939002972);
	});

	it('should solve example 1', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p2(resources.input)).to.equal(231);
	});

	it('should solve example 2', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
		expect(p2(resources.input)).to.equal(51);
	});

	it('should solve example 3', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.3.txt');
		expect(p2(resources.input)).to.equal(46);
	});

	it('should solve example 4', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.4.txt');
		expect(p2(resources.input)).to.equal(1445);
	});

	it('should solve example 5', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.5.txt');
		expect(p2(resources.input)).to.equal(669060);
	});

	it('should solve example 6', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.6.txt');
		expect(p2(resources.input)).to.equal(23340);
	});
});
