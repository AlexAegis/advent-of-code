import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_two';

describe(`${year} - Day ${day} - Part Two`, () => {
	it(`should resolve to ${results.two.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.two.input);
	});

	it('should be that that the first example resolves to 3', async () => {
		expect(await runner('1212')).to.equal(6);
	});

	it('should be that that the second example resolves to 3', async () => {
		expect(await runner('1221')).to.equal(0);
	});

	it('should be that that the third example resolves to 0', async () => {
		expect(await runner('123425')).to.equal(4);
	});

	it('should be that that the fourth example resolves to 9', async () => {
		expect(await runner('123123')).to.equal(12);
	});

	it('should be that that the fifth example resolves to 4', async () => {
		expect(await runner('12131415')).to.equal(4);
	});
});
