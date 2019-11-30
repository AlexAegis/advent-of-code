import { read } from '@root/lib/typescript';
import { expect } from 'chai';
import { Args, day, results, year } from '..';
import { runner } from '../part_two';

describe(`${year} - Day ${day} - Part Two`, () => {
	it(`should resolve to ${results.two.input} when using the input`, async () => {
		const { input, args } = await read<Args>(year, day)();
		expect(await runner(input, args)).to.equal(results.two.input);
	});

	it(`should resolve to ${results.two.example} when using the example`, async () => {
		const { input, args } = await read<Args>(year, day, 'example.txt')();
		expect(await runner(input, args)).to.equal(results.two.example);
	});
});
