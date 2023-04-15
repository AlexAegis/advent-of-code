import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe('2021 - Day 6 - Part One', () => {
	it(`should resolve when using the input`, async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).to.equal(361169);
	});

	describe('example', () => {
		it('should resolve to 26 after 18 days', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(await p1(resources.input, 18)).to.equal(26);
		});
		it('should resolve to 5934 after 80 days', async () => {
			const resources = await loadTaskResources(packageJson.aoc, 'example.1.txt');
			expect(await p1(resources.input, 80)).to.equal(5934);
		});
	});
});
