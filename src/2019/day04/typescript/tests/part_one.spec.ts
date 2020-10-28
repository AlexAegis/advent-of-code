import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_one';

describe(`2019 - Day 4 - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.one.input);
	});

	it('should be that that the first example resolves to 1', async () => {
		expect(await runner('111111-111111')).to.equal(1);
	});

	it('should be that that the second example resolves to 0', async () => {
		expect(await runner('223450-223450')).to.equal(0);
	});

	it('should be that that the third example resolves to 0', async () => {
		expect(await runner('123789-123789')).to.equal(0);
	});
});
