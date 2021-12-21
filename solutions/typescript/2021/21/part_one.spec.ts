import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe('2021 - Day 18 - Part One', () => {
	describe('the input', () => {
		let input!: string;
		before(async () => {
			input = (await read(year, day)()).input;
		});

		it('should resolve to 752745', async () => {
			expect(await runner(input)).to.equal(752745);
		});
	});

	describe('example 1', () => {
		let input!: string;
		before(async () => {
			input = (await read(year, day, 'example.1.txt')()).input;
		});

		it('should resolve to 739785', async () => {
			expect(await runner(input)).to.equal(739785);
		});
	});
});
