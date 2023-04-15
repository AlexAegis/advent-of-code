import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p1 } from './p1.js';

describe('2016 - Day 1 - Part One', () => {
	it(`should resolve to 300 when using the input`, async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(await p1(resources.input)).to.equal(300);
	});

	it('should be that that the first example resolves to 5', async () => {
		expect(await p1('R2, L3')).to.equal(5);
	});

	it('should be that that the second example resolves to 2', async () => {
		expect(await p1('R2, R2, R2')).to.equal(2);
	});

	it('should be that that the third example resolves to 12', async () => {
		expect(await p1('R5, L5, R5, R3')).to.equal(12);
	});
});
