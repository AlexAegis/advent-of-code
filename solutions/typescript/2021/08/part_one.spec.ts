import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe('2021 - Day 8 - Part One', () => {
	it(`should resolve when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(473);
	});

	describe('example 1', () => {
		it('should resolve to 0', async () => {
			expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(0);
		});
	});

	describe('example 2', () => {
		it('should resolve to 26', async () => {
			expect(await runner((await read(year, day, 'example.2.txt')()).input)).to.equal(26);
		});
	});
});
