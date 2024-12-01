import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json' assert { type: 'json' };
import { calculateSeatId, p1 } from './p1.class.js';

describe('2020 - Day 5 - Part One', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).toEqual(848);
	});

	it('should get the seat id of the first example', () => {
		expect(calculateSeatId('FBFBBFFRLR')).toEqual(357);
	});

	it('should get the seat id of the second example', () => {
		expect(calculateSeatId('BFFFBBFRRR')).toEqual(567);
	});

	it('should get the seat id of the third example', () => {
		expect(calculateSeatId('FFFBBBFRRR')).toEqual(119);
	});

	it('should get the seat id of the fourth example', () => {
		expect(calculateSeatId('BBFFBBFRLL')).toEqual(820);
	});
});
