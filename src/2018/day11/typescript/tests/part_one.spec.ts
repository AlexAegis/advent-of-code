import { expect } from 'chai';
import { day, inputs, results, year } from '..';
import { runner } from '../part_one';

describe(`${year} - Day ${day} - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner(inputs.one.input.input)).to.equal(results.one.input);
	});

	it(`should resolve to ${results.one.example} when using the example`, async () => {
		expect(await runner(inputs.one.example.input)).to.equal(results.one.example);
	});
});
