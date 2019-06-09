import { runner } from '../part_one';
import { expect } from 'chai';
import { reader } from '@root';
import { year, day, results } from '..';

describe(`${year} - Day ${day} - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner((await reader(year, day)()).input)).to.equal(results.one.input);
	});

	it(`should resolve to ${results.one.example1} when using the example`, async () => {
		expect(await runner((await reader(year, day, 'example.1.txt')()).input)).to.equal(results.one.example1);
	});

	it(`should resolve to ${results.one.example2} when using the example`, async () => {
		expect(await runner((await reader(year, day, 'example.2.txt')()).input)).to.equal(results.one.example2);
	});
});
