import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe('2019 - Day 17 - Part One', () => {
	it('should solve the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(4864);
	});
});
