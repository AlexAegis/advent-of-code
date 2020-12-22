import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe('2020 - Day 22 - Part One', () => {
	it('should solve for the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(31455);
	});

	it('should solve for example 1', async () => {
		expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(306);
	});
});
