import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe('2018 - Day 13 - Part One', () => {
	it('should solve the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal('28,107');
	});

	it('should solve example 1', async () => {
		expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal('7,3');
	});

	it('should solve example 2', async () => {
		expect(await runner((await read(year, day, 'example.2.txt')()).input)).to.equal('2,0');
	});
});
