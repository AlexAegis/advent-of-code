import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2019 - Day 4 - Part Two', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).to.equal(1148);
	});

	it('should be that that the first example resolves to 1', () => {
		expect(p2('112233-112233')).to.equal(1);
	});

	it('should be that that the second example resolves to 0', () => {
		expect(p2('123444-123444')).to.equal(0);
	});

	it('should be that that the third example resolves to 1', () => {
		expect(p2('111122-111122')).to.equal(1);
	});
});
