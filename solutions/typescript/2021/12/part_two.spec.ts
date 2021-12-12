import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2021 - Day 12 - Part Two', () => {
	xit(`should resolve when using the input`, async () => {
		// ? Disabled as it runs for a long time
		expect(await runner((await read(year, day)()).input)).to.equal(98441);
	});

	describe('example 1', () => {
		it('should resolve to 36', async () => {
			expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(36);
		});
	});

	describe('example 2', () => {
		it('should resolve to 103', async () => {
			expect(await runner((await read(year, day, 'example.2.txt')()).input)).to.equal(103);
		});
	});

	describe('example 3', () => {
		it('should resolve to 3509', async () => {
			expect(await runner((await read(year, day, 'example.3.txt')()).input)).to.equal(3509);
		});
	});
});
