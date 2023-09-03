import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe('2019 - Day 22 - Part One', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1()(resources.input)).to.equal(6831);
	});

	it('should solve for the first example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
		expect(p1()(resources.input)).to.equal(4126);
	});

	it('should solve for the second example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.2.txt');
		expect(p1()(resources.input)).to.equal(5922);
	});

	it('should solve for the third example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.3.txt');
		expect(p1()(resources.input)).to.equal(7115);
	});

	it('should solve for the fourth example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.4.txt');
		expect(p1()(resources.input)).to.equal(1219);
	});
});
