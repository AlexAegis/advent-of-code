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

		it('should resolve to 4184', async () => {
			expect(await runner(input)).to.equal(4184);
		});
	});

	describe('example 1', () => {
		let input!: string;
		before(async () => {
			input = (await read(year, day, 'example.1.txt')()).input;
		});

		it('should resolve to 4140', async () => {
			expect(await runner(input)).to.equal(4140);
		});
	});
});
