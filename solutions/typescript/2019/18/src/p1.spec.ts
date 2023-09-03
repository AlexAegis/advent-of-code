import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe('2019 - Day 18 - Part One', () => {
	it('should resolve to 0 when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).to.equal(0);
	});

	it('should be that that both the first examples resolves to 0', () => {
		expect(p1('')).to.equal(0);
	});
});
