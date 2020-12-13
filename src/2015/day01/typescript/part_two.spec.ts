import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2015 - Day 1 - Part Two', () => {
	it('should solve the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(1795);
	});

	it('should be that that the first example resolves to 1', async () => {
		expect(await runner(')')).to.equal(1);
	});

	it('should be that that the second example resolves to 5', async () => {
		expect(await runner('()())')).to.equal(5);
	});
});
