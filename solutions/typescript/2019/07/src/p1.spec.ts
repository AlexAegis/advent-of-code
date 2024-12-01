import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { p1 } from './p1.js';

describe('2019 - Day 7 - Part One', () => {
	it('should resolve to 929800 when using the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).toEqual(929_800);
	});

	it('should be that that both the first examples resolves to 43210', () => {
		expect(p1('3,15,3,16,1002,16,10,16,1,16,15,15,4,15,99,0,0')).toEqual(43_210);
	});

	it('should be that that both the first examples resolves to 54321', () => {
		expect(
			p1('3,23,3,24,1002,24,10,24,1002,23,-1,23,101,5,23,23,1,24,23,23,4,23,99,0,0'),
		).toEqual(54_321);
	});

	it('should be that that both the first examples resolves to 54321', () => {
		expect(
			p1(
				'3,31,3,32,1002,32,10,32,1001,31,-2,31,1007,31,0,33,1002,33,7,33,1,33,31,31,1,32,31,31,4,31,99,0,0,0',
			),
		).toEqual(65_210);
	});
});
