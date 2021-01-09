import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '.';
import { runner } from './part_two';

describe('2015 - Day 2 - Part Two', () => {
	it('should solve the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.two.input);
	});

	it('should be that that the first example resolves to 34', async () => {
		expect(await runner('2x3x4')).to.equal(34);
	});

	it('should be that that the second example resolves to 14', async () => {
		expect(await runner('1x1x10')).to.equal(14);
	});
});
