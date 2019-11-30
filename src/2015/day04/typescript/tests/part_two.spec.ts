// import { read } from '@lib';
// import { expect } from 'chai';
import * as isCI from 'is-ci';
import { day, results, year } from '..';
// import { runner } from '../part_two';

describe(`${year} - Day ${day} - Part Two`, () => {
	it(`should resolve to ${results.two.input} when using the input`, async () => {
		if (!isCI) {
			// expect(await runner((await read(year, day)()).input)).to.equal(results.two.input);
		}
	}).timeout(20000);

	it(`should resolve to ${results.two.example} when using the example`, async () => {
		if (!isCI) {
			// expect(await runner((await read(year, day, 'example.txt')()).input)).to.equal(results.two.example);
		}
	}).timeout(20000);

	it(`should resolve to ${results.two.example2} when using the example`, async () => {
		if (!isCI) {
			// expect(await runner((await read(year, day, 'example.2.txt')()).input)).to.equal(results.two.example2);
		}
	}).timeout(20000);
});
