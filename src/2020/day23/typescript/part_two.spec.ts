import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2020 - Day 23 - Part Two', () => {
	it('should solve the input', async () => {
		const input = (await read(year, day)()).input;
		expect(runner(input)).to.equal(286194102744);
	}).timeout(20000);

	it('should solve the example', async () => {
		const input = (await read(year, day, 'example.1.txt')()).input;
		expect(runner(input)).to.equal(149245887792);
	}).timeout(20000);
});
