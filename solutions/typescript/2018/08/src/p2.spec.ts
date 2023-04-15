import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2018 - Day 8 - Part Two', () => {
	it('should resolve to 28237 when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(await p2(resources.input)).to.equal(28237);
	});

	it('should resolve to 66 when using the example', async () => {
		const resources = await loadTaskResources(packageJson.aoc, 'example.txt');
		expect(await p2(resources.input)).to.equal(66);
	});
});
