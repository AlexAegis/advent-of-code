import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { isNice, p1 } from './p1.js';

describe('2015 - Day 5 - Part One', () => {
	it('should resolve to 236 when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(await p1(resources.input)).to.equal(236);
	});

	it('should true that example 1 is nice', async () => {
		expect(isNice('ugknbfddgicrmopn')).to.equal(true);
	});

	it('should true that example 2 is nice', async () => {
		expect(isNice('aaa')).to.equal(true);
	});

	it('should true that example 3 is naughty', async () => {
		expect(isNice('jchzalrnumimnmhp')).to.equal(false);
	});

	it('should true that example 4 is naughty', async () => {
		expect(isNice('haegwjzuvuyypxyu')).to.equal(false);
	});

	it('should true that example 5 is naughty', async () => {
		expect(isNice('dvszwmarrgswjxmb')).to.equal(false);
	});
});
