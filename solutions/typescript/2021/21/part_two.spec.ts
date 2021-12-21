import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2021 - Day 21 - Part Two', () => {
	describe('the input', () => {
		let input!: string;
		before(async () => {
			input = (await read(year, day)()).input;
		});

		it('should resolve to 309196008717909', async () => {
			expect(await runner(input)).to.equal(309196008717909);
		});
	});

	describe('example 1', () => {
		let input!: string;
		before(async () => {
			input = (await read(year, day, 'example.1.txt')()).input;
		});

		it('should resolve to 444356092776315', async () => {
			expect(await runner(input)).to.equal(444356092776315);
		});
	});
});
