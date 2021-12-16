import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2021 - Day 15 - Part Two', () => {
	xit('should resolve when using the input', async () => {
		// Runs too long
		expect(await runner((await read(year, day)()).input)).to.equal(2925);
	});

	describe('example 1', () => {
		it('should resolve to 215', async () => {
			expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(315);
		});
	});
});
