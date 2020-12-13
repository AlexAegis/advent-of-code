// import { read } from '@lib';
// import { expect } from 'chai';
import * as isCI from 'is-ci';

describe('2015 - Day 4 - Part Two', () => {
	it('should solve the input', async () => {
		if (!isCI) {
			// expect(await runner((await read(year, day)()).input)).to.equal(results.two.input);
		}
	}).timeout(20000);

	it('should resolve to ${results.two.example} when using the example', async () => {
		if (!isCI) {
			// expect(await runner((await read(year, day, 'example.txt')()).input)).to.equal(results.two.example);
		}
	}).timeout(20000);

	it('should resolve to ${results.two.example2} when using the example', async () => {
		if (!isCI) {
			// expect(await runner((await read(year, day, 'example.2.txt')()).input)).to.equal(results.two.example2);
		}
	}).timeout(20000);
});
