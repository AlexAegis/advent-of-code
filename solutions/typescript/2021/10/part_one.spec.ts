import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe('2021 - Day 10 - Part One', () => {
	it(`should resolve when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(193275);
	});

	describe('example 1', () => {
		it('should resolve to 26397', async () => {
			expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(26397);
		});
	});
});
