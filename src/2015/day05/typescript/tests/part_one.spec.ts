import { read } from '@root';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_one';

describe(`${year} - Day ${day} - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(runner((await read(year, day)()).input)).to.equal(results.one.input);
	});

	it(`should true that example 1 is nice`, async () => {
		expect(runner('ugknbfddgicrmopn')).to.equal(results.one.example);
	});

	it(`should true that example 2 is nice`, async () => {
		expect(runner('aaa')).to.equal(results.one.example2);
	});

	it(`should true that example 3 is naughty`, async () => {
		expect(runner('jchzalrnumimnmhp')).to.equal(results.one.example3);
	});

	it(`should true that example 4 is naughty`, async () => {
		expect(runner('haegwjzuvuyypxyu')).to.equal(results.one.example4);
	});

	it(`should true that example 5 is naughty`, async () => {
		expect(runner('dvszwmarrgswjxmb')).to.equal(results.one.example5);
	});
});
