import { read } from '@root/lib/typescript';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_two';

describe(`${year} - Day ${day} - Part Two`, () => {
	it(`should resolve to ${results.two.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.two.input);
	});

	it('should be that that the example resolves to 4', async () => {
		expect(await runner('R8, R4, R4, R8')).to.equal(4);
	});
});
