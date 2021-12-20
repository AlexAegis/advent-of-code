import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2021 - Day 18 - Part Two', () => {
	describe('the input', () => {
		let input!: string;
		before(async () => {
			input = (await read(year, day)()).input;
		});

		it('should resolve to 4731 ', async () => {
			expect(await runner(input)).to.equal(4731);
		});
	});

	describe('example 1', () => {
		let input!: string;
		before(async () => {
			input = (await read(year, day, 'example.1.txt')()).input;
		});

		it('should resolve to 3993', async () => {
			expect(await runner(input)).to.equal(3993);
		});
	});
});
