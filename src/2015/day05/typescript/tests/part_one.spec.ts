import { read } from '@root';
import { expect } from 'chai';
import { day, inputs, results, year } from '..';
import { runner } from '../part_one';

describe(`${year} - Day ${day} - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.one.input);
	});

	it(`should true that example 1 is nice`, async () => {
		expect(await runner(inputs.one.example.input)).to.equal(results.one.example);
	});

	it(`should true that example 2 is nice`, async () => {
		expect(await runner((inputs.one.example2 && inputs.one.example2.input) || '')).to.equal(results.one.example2);
	});

	it(`should true that example 3 is naughty`, async () => {
		expect(await runner((inputs.one.example3 && inputs.one.example3.input) || '')).to.equal(results.one.example3);
	});

	it(`should true that example 4 is naughty`, async () => {
		expect(await runner((inputs.one.example4 && inputs.one.example4.input) || '')).to.equal(results.one.example4);
	});

	it(`should true that example 5 is naughty`, async () => {
		expect(await runner((inputs.one.example5 && inputs.one.example5.input) || '')).to.equal(results.one.example5);
	});
});
