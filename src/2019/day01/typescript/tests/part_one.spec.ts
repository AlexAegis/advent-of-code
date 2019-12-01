import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_one';

describe(`${year} - Day ${day} - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.one.input);
	});

	it('should be that that the first example resolves to 2', async () => {
		expect(await runner('12')).to.equal(2);
	});

	it('should be that that the second example resolves to 2', async () => {
		expect(await runner('14')).to.equal(2);
	});

	it('should be that that the third example resolves to 654', async () => {
		expect(await runner('1969')).to.equal(654);
	});

	it('should be that that the fourth example resolves to 33583', async () => {
		expect(await runner('100756')).to.equal(33583);
	});
});
