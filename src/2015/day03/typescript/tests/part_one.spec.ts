import { read } from '@root';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_one';

describe(`${year} - Day ${day} - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.one.input);
	});

	it('should be that that the first example resolves to 2', async () => {
		expect(await runner('>')).to.equal(2);
	});

	it('should be that that the second example resolves to 4', async () => {
		expect(await runner('^>v<')).to.equal(4);
	});

	it('should be that that the third example resolves to 2', async () => {
		expect(await runner('^v^v^v^v^v')).to.equal(2);
	});
});
