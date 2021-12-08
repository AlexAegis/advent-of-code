import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2021 - Day 8 - Part Two', () => {
	it('should resolve when using the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(1097568);
	});

	describe('example 1', () => {
		it('should resolve to 5353', async () => {
			expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(5353);
		});
	});

	describe('example 2', () => {
		it('should resolve to 61229', async () => {
			expect(await runner((await read(year, day, 'example.2.txt')()).input)).to.equal(61229);
		});
	});
});
