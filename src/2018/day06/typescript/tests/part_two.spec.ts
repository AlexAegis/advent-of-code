import { runner } from '../part_two';
import { expect } from 'chai';
import { reader } from '@root';
import { year, day, results, Args } from '..';

describe(`${year} - Day ${day} - Part Two`, () => {
	it(`should resolve to ${results.two.input} when using the input`, async () => {
		const { input, args } = await reader<Args>(year, day)();
		expect(await runner(input, args || { limit: 2 })).to.equal(results.two.input);
	});

	it(`should resolve to ${results.two.example} when using the example`, async () => {
		const { input, args } = await reader<Args>(year, day, 'example.txt')();
		expect(await runner(input, args || { limit: 2 })).to.equal(results.two.example);
	});
});
