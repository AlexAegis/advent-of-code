import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_one';

describe(`2018 - Day 9 - Part One`, () => {
	it(`should resolve to ${results.one.example0} when using the zeroth example`, async () => {
		expect(await runner((await read(year, day, 'example.0.txt')()).input)).to.equal(results.one.example0);
	});

	it(`should resolve to ${results.one.example1} when using the first example`, async () => {
		expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(results.one.example1);
	});

	it(`should resolve to ${results.one.example2} when using the second example`, async () => {
		expect(await runner((await read(year, day, 'example.2.txt')()).input)).to.equal(results.one.example2);
	});

	it(`should resolve to ${results.one.example3} when using the third example`, async () => {
		expect(await runner((await read(year, day, 'example.3.txt')()).input)).to.equal(results.one.example3);
	});

	it(`should resolve to ${results.one.example4} when using the fourth example`, async () => {
		expect(await runner((await read(year, day, 'example.4.txt')()).input)).to.equal(results.one.example4);
	});

	it(`should resolve to ${results.one.example5} when using the fifth example`, async () => {
		expect(await runner((await read(year, day, 'example.5.txt')()).input)).to.equal(results.one.example5);
	});

	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.one.input);
	});
});
