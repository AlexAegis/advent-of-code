import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { isNice, p2 } from './p2.js';

describe('2015 - Day 5 - Part Two', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p2(resources.input)).toEqual(51);
	});

	it('should true that example 1 is nice', () => {
		expect(isNice('qjhvhtzxzqqjkmpb')).toEqual(true);
	});

	it('should true that example 2 is nice', () => {
		expect(isNice('xxyxx')).toEqual(true);
	});

	it('should true that example 3 is naughty', () => {
		expect(isNice('uurcxstgmygtbstg')).toEqual(false);
	});

	it('should true that example 4 is naughty', () => {
		expect(isNice('ieodomkazucvgmuy')).toEqual(false);
	});
});
