import { runner } from '../part_two';
import { expect } from 'chai';
import { reader } from '@root';
import { year, day, results } from '..';

describe(`${year} - Day ${day} - Part Two`, () => {
	it(`should resolve to ${results.two.input} when using the input`, async () => {
		expect(await runner((await reader(year, day)()).input)).to.equal(results.two.input);
	});
});
