import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import type { Args } from './args.interface.js';
import { p2 } from './p2.js';

describe('2020 - Day 9 - Part Two', () => {
	it('should solve the input', async () => {
		const { input, args } = await loadTaskResources<Args>(packageJson.aoc);
		expect(p2(input, args)).to.equal(28_509_180);
	});

	it('should solve the first example', async () => {
		const { input, args } = await loadTaskResources<Args>(packageJson.aoc, 'example.1.txt');
		expect(p2(input, args)).to.equal(62);
	});
});
