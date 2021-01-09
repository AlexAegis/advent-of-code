import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe('2020 - Day 11 - Part One', () => {
	it('should solve the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(2406);
	}).timeout(20000);

	it('should solve for the first example', async () => {
		expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(37);
	}).timeout(20000);
});
