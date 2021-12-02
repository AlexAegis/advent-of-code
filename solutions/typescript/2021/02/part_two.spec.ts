import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2021 - Day 2 - Part Two', () => {
	it('should resolve when using the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(1971232560);
	});

	describe('example', () => {
		it('should resolve to 900', async () => {
			expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(900);
		});
	});
});
