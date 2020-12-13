import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_two';

describe('2018 - Day 1 - Part Two', () => {
	it('should solve the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.two.input);
	});

	it('should resolve to ${results.two.example} when using the example', async () => {
		expect(await runner((await read(year, day, 'example.txt')()).input)).to.equal(
			results.two.example
		);
	});
});
