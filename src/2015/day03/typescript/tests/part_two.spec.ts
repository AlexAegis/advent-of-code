import { read } from '@root/lib/typescript';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_two';

describe(`${year} - Day ${day} - Part Two`, () => {
	it(`should resolve to ${results.two.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.two.input);
	});

	it('should be that that the first example resolves to 3', async () => {
		expect(await runner('^v')).to.equal(3);
	});

	it('should be that that the second example resolves to 3', async () => {
		expect(await runner('^>v<')).to.equal(3);
	});

	it('should be that that the third example resolves to 11', async () => {
		expect(await runner('^v^v^v^v^v')).to.equal(11);
	});
});
