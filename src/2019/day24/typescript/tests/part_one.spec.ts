import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_one';

describe(`${year} - Day ${day} - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.one.input);
	});

	it(`should resolve to 2129920 when using the first example`, async () => {
		expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(2129920);
	});
});
