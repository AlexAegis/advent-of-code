import { read } from '@root/lib/typescript';
import { expect } from 'chai';
import { day, results, year } from '..';
import { isNice, runner } from '../part_one';

describe(`${year} - Day ${day} - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(runner((await read(year, day)()).input)).to.equal(results.one.input);
	});

	it(`should true that example 1 is nice`, async () => {
		expect(isNice('ugknbfddgicrmopn')).to.equal(true);
	});

	it(`should true that example 2 is nice`, async () => {
		expect(isNice('aaa')).to.equal(true);
	});

	it(`should true that example 3 is naughty`, async () => {
		expect(isNice('jchzalrnumimnmhp')).to.equal(false);
	});

	it(`should true that example 4 is naughty`, async () => {
		expect(isNice('haegwjzuvuyypxyu')).to.equal(false);
	});

	it(`should true that example 5 is naughty`, async () => {
		expect(isNice('dvszwmarrgswjxmb')).to.equal(false);
	});
});
