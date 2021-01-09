import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2020 - Day 19 - Part Two', () => {
	it('should solve the input', async () => {
		expect(runner((await read(year, day)()).input)).to.equal(316);
	});

	it('should solve example 3', async () => {
		expect(runner((await read(year, day, 'example.3.txt')()).input)).to.equal(12);
	});
});
