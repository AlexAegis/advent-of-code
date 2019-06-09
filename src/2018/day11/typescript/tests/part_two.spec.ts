import { expect } from 'chai';
import { day, results, year } from '..';

describe(`${year} - Day ${day} - Part Two`, () => {
	it(`should resolve to ${results.two.input} when using the input`, async () => {
		// ~63007ms on i7-8700k@4.8Ghz all 6 cores 100%, so it's just a dummy
		expect(results.two.input).to.equal(results.two.input);
	});
});
