import { loadTaskResources } from '@alexaegis/advent-of-code-lib';
import { describe, expect, it } from 'vitest';
import packageJson from '../package.json';
import { calculateSeatId, p1 } from './p1.class.js';

describe('2020 - Day 5 - Part One', () => {
	it('should solve the input', async () => {
		const resources = await loadTaskResources(packageJson.aoc);
		expect(p1(resources.input)).to.equal(848);
	});

	it('should get the seat id of the first example', async () => {
		expect(calculateSeatId('FBFBBFFRLR')).to.equal(357);
	});

	it('should get the seat id of the second example', async () => {
		expect(calculateSeatId('BFFFBBFRRR')).to.equal(567);
	});

	it('should get the seat id of the third example', async () => {
		expect(calculateSeatId('FFFBBBFRRR')).to.equal(119);
	});

	it('should get the seat id of the fourth example', async () => {
		expect(calculateSeatId('BBFFBBFRLL')).to.equal(820);
	});
});
