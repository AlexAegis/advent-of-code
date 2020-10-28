import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_one';

describe(`2015 - Day 2 - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.one.input);
	});

	it('should be that that the first example resolves to 58', async () => {
		expect(await runner('2x3x4')).to.equal(58);
	});

	it('should be that that the second example resolves to 43', async () => {
		expect(await runner('1x1x10')).to.equal(43);
	});
});
