import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe('2021 - Day 12 - Part One', () => {
	it(`should resolve when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(4167);
	});

	describe('example 1', () => {
		it('should resolve to 10', async () => {
			expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(10);
		});
	});

	describe('example 2', () => {
		it('should resolve to 19', async () => {
			expect(await runner((await read(year, day, 'example.2.txt')()).input)).to.equal(19);
		});
	});

	describe('example 3', () => {
		it('should resolve to 226', async () => {
			expect(await runner((await read(year, day, 'example.3.txt')()).input)).to.equal(226);
		});
	});
});
