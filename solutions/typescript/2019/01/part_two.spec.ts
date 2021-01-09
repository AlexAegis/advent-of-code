import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '.';
import { runner } from './part_two';

describe('2019 - Day 1 - Part Two', () => {
	it('should solve the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.two.input);
	});

	it('should be that that the first example resolves to 2', async () => {
		expect(await runner('14')).to.equal(2);
	});

	it('should be that that the second example resolves to 966', async () => {
		expect(await runner('1969')).to.equal(966);
	});

	it('should be that that the third example resolves to 50346', async () => {
		expect(await runner('100756')).to.equal(50346);
	});
});
