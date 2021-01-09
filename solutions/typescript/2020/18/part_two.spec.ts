import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2020 - Day 18 - Part Two', () => {
	it('should solve the input', async () => {
		expect(runner((await read(year, day)()).input)).to.equal(297139939002972);
	});

	it('should solve example 1', async () => {
		expect(runner((await read(year, day, 'example.1.txt')()).input)).to.equal(231);
	});

	it('should solve example 2', async () => {
		expect(runner((await read(year, day, 'example.2.txt')()).input)).to.equal(51);
	});

	it('should solve example 3', async () => {
		expect(runner((await read(year, day, 'example.3.txt')()).input)).to.equal(46);
	});

	it('should solve example 4', async () => {
		expect(runner((await read(year, day, 'example.4.txt')()).input)).to.equal(1445);
	});

	it('should solve example 5', async () => {
		expect(runner((await read(year, day, 'example.5.txt')()).input)).to.equal(669060);
	});

	it('should solve example 6', async () => {
		expect(runner((await read(year, day, 'example.6.txt')()).input)).to.equal(23340);
	});
});
