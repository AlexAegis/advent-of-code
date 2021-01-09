import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2020 - Day 17 - Part Two', () => {
	it('should solve the input', async () => {
		expect(runner((await read(year, day)()).input)).to.equal(1868);
	}).timeout(20000);

	it('should solve the first example', async () => {
		expect(runner((await read(year, day, 'example.1.txt')()).input)).to.equal(848);
	}).timeout(20000);
});
