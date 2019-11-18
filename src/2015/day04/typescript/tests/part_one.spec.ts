import { read } from '@root';
import { expect } from 'chai';
import * as isCI from 'is-ci';
import { day, results, year } from '..';
import { runner } from '../part_one';

describe(`${year} - Day ${day} - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		if (!isCI) {
			expect(await runner((await read(year, day)()).input)).to.equal(results.one.input);
		}
	}).timeout(20000);

	it(`should resolve to ${results.one.example} when using the example`, async () => {
		if (!isCI) {
			expect(await runner((await read(year, day, 'example.txt')()).input)).to.equal(results.one.example);
		}
	}).timeout(20000);

	it(`should resolve to ${results.one.example} when using the second example`, async () => {
		if (!isCI) {
			expect(await runner((await read(year, day, 'example.2.txt')()).input)).to.equal(results.one.example2);
		}
	}).timeout(20000);
});
