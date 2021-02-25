import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2017 - Day 2 - Part Two', () => {
	it('should solve the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(250);
	});

	it('should be that that the second example resolves to 18', async () => {
		expect(runner((await read(year, day, 'example.2.txt')()).input)).to.equal(9);
	});
});
