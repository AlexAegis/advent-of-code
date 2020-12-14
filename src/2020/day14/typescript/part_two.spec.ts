import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2020 - Day 14 - Part Two', () => {
	it('should solve the input', async () => {
		expect(runner((await read(year, day)()).input)).to.equal(4200656704538);
	});

	it('should solve the second example', async () => {
		expect(runner((await read(year, day, 'example.2.txt')()).input)).to.equal(208);
	});
});
