import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '.';
import { runner } from './part_one';

describe(`2019 - Day 6 - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.one.input);
	}).timeout(20000);

	it('should be that that the first example resolves to 42', async () => {
		expect(await runner('COM)B\nB)C\nC)D\nD)E\nE)F\nB)G\nG)H\nD)I\nE)J\nJ)K\nK)L')).to.equal(
			42
		);
	}).timeout(20000);
});
