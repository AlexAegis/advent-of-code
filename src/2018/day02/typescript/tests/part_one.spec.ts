import { runner } from '../part_one';
import { expect } from 'chai';
import { reader } from '@root';
import { year, day, results } from '..';

describe(`${year} - Day ${day} - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner((await reader(year, day)()).input)).to.equal(results.one.input);
	});

	it(`should resolve to ${results.one.example} when using the example`, async () => {
		expect(await runner((await reader(year, day, 'example.txt')()).input)).to.equal(results.one.example);
	});
});
