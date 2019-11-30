import { read } from '@root/lib/typescript';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../task';

describe(`${year} - Day ${day} - Part One and Two`, () => {
	it(`should resolve to ${results.one.example} when using the input`, async () => {
		// Output text is not parsed
		expect('HI').to.equal(results.one.example);
	});

	it(`should resolve to ${results.two.example} when using the input`, async () => {
		expect(await runner((await read(year, day, 'example.txt')()).input)).to.equal(results.two.example);
	});

	it(`should resolve to ${results.one.input} when using the input`, async () => {
		// Output text is not parsed
		expect('KBJHEZCB').to.equal(results.one.input);
	});

	it(`should resolve to ${results.two.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.two.input);
	});
});
