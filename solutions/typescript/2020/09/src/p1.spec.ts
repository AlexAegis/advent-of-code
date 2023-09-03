import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import type { Args } from './args.interface.js';
import { hasComponents, p1 } from './p1.js';

describe('2020 - Day 9 - Part One', () => {
	const preamble = Array.from({ length: 25 }, (_, i) => i + 1);

	it('should solve the input', async () => {
		const { input, args } = await loadTaskResources<Args>(packageJson.aoc);
		expect(p1(input, args)).to.equal(217_430_975);
	});

	it('should solve for the first example', async () => {
		const { input, args } = await loadTaskResources<Args>(packageJson.aoc, 'example.1.txt');
		expect(p1(input, args)).to.equal(127);
	});

	it('should find a pair in the preamble that adds to 26', () =>
		expect(hasComponents(26, preamble)).to.be.true);

	it('should find a pair in the preamble that adds to 49', () =>
		expect(hasComponents(49, preamble)).to.be.true);

	it('should not find a pair in the preamble that adds to 100', () =>
		expect(hasComponents(100, preamble)).to.be.false);

	it('should not find a pair in the preamble that adds to 50', () =>
		expect(hasComponents(50, preamble)).to.be.false);
});
