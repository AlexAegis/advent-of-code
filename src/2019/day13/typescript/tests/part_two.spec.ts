import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_two';

describe('2019 - Day 13 - Part Two', () => {
	it('should solve the input', async () => {
		expect(await runner(false)((await read(year, day)()).input)).to.equal(results.two.input);
	});
});
