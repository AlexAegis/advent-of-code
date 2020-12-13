import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe('2020 - Day 12 - Part One', () => {
	it('should solve the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(858);
	});

	it('should solve for the first example', async () => {
		expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(25);
	});
});
