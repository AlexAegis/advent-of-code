import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe('2020 - Day 19 - Part One', () => {
	it('should solve the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(208);
	});

	it('should solve example 1', async () => {
		expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(2);
	});

	it('should solve example 2', async () => {
		expect(await runner((await read(year, day, 'example.2.txt')()).input)).to.equal(2);
	});

	it('should solve example 3', async () => {
		expect(await runner((await read(year, day, 'example.3.txt')()).input)).to.equal(3);
	});
});
