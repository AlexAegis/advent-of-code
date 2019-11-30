import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_one';

describe(`${year} - Day ${day} - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.one.input);
	});

	it('should be that that the first example resolves to 5', async () => {
		expect(await runner('R2, L3')).to.equal(5);
	});

	it('should be that that the second example resolves to 2', async () => {
		expect(await runner('R2, R2, R2')).to.equal(2);
	});

	it('should be that that the third example resolves to 12', async () => {
		expect(await runner('R5, L5, R5, R3')).to.equal(12);
	});
});
