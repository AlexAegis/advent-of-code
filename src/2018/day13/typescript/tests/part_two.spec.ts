import { runner } from '../part_two';
import { expect } from 'chai';
import { year, day, results } from '..';
import { reader } from '@root';

describe(`${year} - Day ${day} - Part Two`, () => {
	it(`should resolve to ${results.two.input} when using the input`, async () => {
		expect(await runner((await reader(year, day)()).input)).to.equal(results.two.input);
	});

	it(`should resolve to ${results.two.example1} when using the example`, async () => {
		expect(await runner((await reader(year, day, 'example.1.txt')()).input)).to.equal(results.two.example1);
	});

	it(`should resolve to ${results.two.example2} when using the example`, async () => {
		expect(await runner((await reader(year, day, 'example.2.txt')()).input)).to.equal(results.two.example2);
	});
});
