import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2021 - Day 4 - Part Two', () => {
	it('should resolve when using the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(31892);
	});

	describe('example', () => {
		it('should resolve to 1924', async () => {
			expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(1924);
		});
	});
});
