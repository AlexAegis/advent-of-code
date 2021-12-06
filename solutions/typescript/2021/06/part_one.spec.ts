import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe('2021 - Day 6 - Part One', () => {
	it(`should resolve when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(361169);
	});

	describe('example', () => {
		it('should resolve to 26 after 18 days', async () => {
			expect(await runner((await read(year, day, 'example.1.txt')()).input, 18)).to.equal(26);
		});
		it('should resolve to 5934 after 80 days', async () => {
			expect(await runner((await read(year, day, 'example.1.txt')()).input, 80)).to.equal(
				5934
			);
		});
	});
});
