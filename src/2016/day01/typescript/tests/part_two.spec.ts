import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_two';

describe('2016 - Day 1 - Part Two', () => {
	it('should solve the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.two.input);
	});

	it('should be that that the example resolves to 4', async () => {
		expect(await runner('R8, R4, R4, R8')).to.equal(4);
	});
});
