import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe('2017 - Day 1 - Part One', () => {
	it('should resolve to 1177 when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).toEqual(1177);
	});

	it('should be that that the first example resolves to 3', () => {
		expect(p1('1122')).toEqual(3);
	});

	it('should be that that the second example resolves to 3', () => {
		expect(p1('1111')).toEqual(4);
	});

	it('should be that that the third example resolves to 0', () => {
		expect(p1('1234')).toEqual(0);
	});

	it('should be that that the fourth example resolves to 9', () => {
		expect(p1('91212129')).toEqual(9);
	});
});
