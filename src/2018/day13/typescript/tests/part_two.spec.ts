import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_two';

describe('2018 - Day 13 - Part Two', () => {
	it('should solve the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.two.input);
	});

	it('should solve the first example', async () => {
		expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(
			results.two.example1
		);
	});

	it('should solve the second example', async () => {
		expect(await runner((await read(year, day, 'example.2.txt')()).input)).to.equal(
			results.two.example2
		);
	});
});
