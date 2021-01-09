import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '.';
import { runner } from './part_one';

describe('2018 - Day 2 - Part One', () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.one.input);
	});

	it(`should resolve to ${results.one.example} when using the example`, async () => {
		expect(await runner((await read(year, day, 'example.txt')()).input)).to.equal(
			results.one.example
		);
	});
});
