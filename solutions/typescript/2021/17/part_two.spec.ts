import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2021 - Day 17 - Part Two', () => {
	describe('the input', () => {
		let input!: string;
		before(async () => {
			input = (await read(year, day)()).input;
		});

		it('should resolve to 3202 ', async () => {
			expect(await runner(input)).to.equal(3202);
		});
	});

	describe('target area: x=20..30, y=-10..-5', () => {
		const input = 'target area: x=20..30, y=-10..-5';

		it('should resolve to 112', async () => {
			expect(await runner(input)).to.equal(112);
		});
	});
});
