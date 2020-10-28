import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_two';

describe(`2019 - Day 12 - Part Two`, () => {
	it(`should resolve to ${results.two.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.two.input);
	});

	it('should be that that the first example resolves to 2772', async () => {
		expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(2772);
	});

	it('should be that that the second example resolves to 4686774924', async () => {
		expect(await runner((await read(year, day, 'example.2.txt')()).input)).to.equal(4686774924);
	});
});
