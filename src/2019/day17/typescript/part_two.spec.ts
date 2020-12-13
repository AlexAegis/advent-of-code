import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2019 - Day 17 - Part Two', () => {
	it('should solve the input', async () => {
		expect(await runner(false)((await read(year, day)()).input)).to.equal(840248);
	});
});
