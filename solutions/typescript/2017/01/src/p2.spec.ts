import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { p2 } from './p2.js';

describe('2017 - Day 1 - Part Two', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).to.equal(1060);
	});

	it('should be that that the first example resolves to 3', () => {
		expect(p2('1212')).to.equal(6);
	});

	it('should be that that the second example resolves to 3', () => {
		expect(p2('1221')).to.equal(0);
	});

	it('should be that that the third example resolves to 0', () => {
		expect(p2('123425')).to.equal(4);
	});

	it('should be that that the fourth example resolves to 9', () => {
		expect(p2('123123')).to.equal(12);
	});

	it('should be that that the fifth example resolves to 4', () => {
		expect(p2('12131415')).to.equal(4);
	});
});
