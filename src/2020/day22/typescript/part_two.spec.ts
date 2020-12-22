import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2020 - Day 22 - Part Two', () => {
	it('should solve the input', async () => {
		expect(runner((await read(year, day)()).input)).to.equal(32528);
	});

	it('should solve example 1', async () => {
		expect(runner((await read(year, day, 'example.1.txt')()).input)).to.equal(291);
	});

	it('should solve example 2', async () => {
		expect(runner((await read(year, day, 'example.2.txt')()).input)).to.equal(19);
	});
});
