import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '.';
import { runner } from './part_one';

describe(`2017 - Day 1 - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.one.input);
	});

	it('should be that that the first example resolves to 3', async () => {
		expect(await runner('1122')).to.equal(3);
	});

	it('should be that that the second example resolves to 3', async () => {
		expect(await runner('1111')).to.equal(4);
	});

	it('should be that that the third example resolves to 0', async () => {
		expect(await runner('1234')).to.equal(0);
	});

	it('should be that that the fourth example resolves to 9', async () => {
		expect(await runner('91212129')).to.equal(9);
	});
});
