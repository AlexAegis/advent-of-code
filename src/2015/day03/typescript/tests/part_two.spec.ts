import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_two';

describe('2015 - Day 3 - Part Two', () => {
	it('should solve the input', async () => {
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
