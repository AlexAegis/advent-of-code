import { read } from '@root/lib/typescript';
import { expect } from 'chai';
import { day, results, year } from '..';
import { isNice, runner } from '../part_two';

describe(`${year} - Day ${day} - Part Two`, () => {
	it(`should resolve to ${results.two.input} when using the input`, async () => {
		expect(runner((await read(year, day)()).input)).to.equal(results.two.input);
	});

	it(`should true that example 1 is nice`, async () => {
		expect(isNice('qjhvhtzxzqqjkmpb')).to.equal(true);
	});

	it(`should true that example 2 is nice`, async () => {
		expect(isNice('xxyxx')).to.equal(true);
	});

	it(`should true that example 3 is naughty`, async () => {
		expect(isNice('uurcxstgmygtbstg')).to.equal(false);
	});

	it(`should true that example 4 is naughty`, async () => {
		expect(isNice('ieodomkazucvgmuy')).to.equal(false);
	});
});
