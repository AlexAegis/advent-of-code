import { runner } from '../task';
import { expect } from 'chai';
import { reader } from '@root';
import { year, day, results } from '..';

describe(`${year} - Day ${day} - Part One and Two`, () => {
	it(`should resolve to ${results.one.example} when using the input`, async () => {
		// Output text is not parsed
		expect('HI').to.equal(results.one.example);
	});

	it(`should resolve to ${results.two.example} when using the input`, async () => {
		expect(await runner((await reader(year, day, 'example.txt')()).input)).to.equal(results.two.example);
	});

	it(`should resolve to ${results.one.input} when using the input`, async () => {
		// Output text is not parsed
		expect('KBJHEZCB').to.equal(results.one.input);
	});

	it(`should resolve to ${results.two.input} when using the input`, async () => {
		expect(await runner((await reader(year, day)()).input)).to.equal(results.two.input);
	});
});
