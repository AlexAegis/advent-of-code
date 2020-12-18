import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe('2020 - Day 18 - Part One', () => {
	it('should solve the input', async () => {
		expect(runner((await read(year, day)()).input)).to.equal(25190263477788);
	});

	it('should solve example 1', async () => {
		expect(runner((await read(year, day, 'example.1.txt')()).input)).to.equal(71);
	});

	it('should solve example 2', async () => {
		expect(runner((await read(year, day, 'example.2.txt')()).input)).to.equal(51);
	});

	it('should solve example 3', async () => {
		expect(runner((await read(year, day, 'example.3.txt')()).input)).to.equal(26);
	});

	it('should solve example 4', async () => {
		expect(runner((await read(year, day, 'example.4.txt')()).input)).to.equal(437);
	});

	it('should solve example 5', async () => {
		expect(runner((await read(year, day, 'example.5.txt')()).input)).to.equal(12240);
	});

	it('should solve example 6', async () => {
		expect(runner((await read(year, day, 'example.6.txt')()).input)).to.equal(13632);
	});
});
