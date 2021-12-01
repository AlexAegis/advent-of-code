import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe('2021 - Day 1 - Part One', () => {
	it(`should resolve when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(1451);
	});

	describe('example', () => {
		it('should resolve to 7', async () => {
			expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(7);
		});
	});
});
