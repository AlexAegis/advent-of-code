import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe('2019 - Day 1 - Part One', () => {
	it('should resolve to 3399947 when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).toEqual(3_399_947);
	});

	it('should be that that the first example resolves to 2', () => {
		expect(p1('12')).toEqual(2);
	});

	it('should be that that the second example resolves to 2', () => {
		expect(p1('14')).toEqual(2);
	});

	it('should be that that the third example resolves to 654', () => {
		expect(p1('1969')).toEqual(654);
	});

	it('should be that that the fourth example resolves to 33583', () => {
		expect(p1('100756')).toEqual(33_583);
	});
});
