import { read } from '@root';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_two';

describe(`${year} - Day ${day} - Part Two`, () => {
	it(`should resolve to ${results.two.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.two.input);
	}).timeout(10000);

	it(`should resolve to ${results.two.example} when using the example`, async () => {
		expect(await runner((await read(year, day, 'example.txt')()).input)).to.equal(results.two.example);
	}).timeout(10000);
});
