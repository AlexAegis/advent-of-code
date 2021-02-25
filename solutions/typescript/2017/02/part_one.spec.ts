import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_one';

describe('2017 - Day 2 - Part One', () => {
	it('should resolve to  when using the input', async () => {
		expect(runner((await read(year, day)()).input)).to.equal(47136);
	});

	it('should be that that the first example resolves to 18', async () => {
		expect(runner((await read(year, day, 'example.1.txt')()).input)).to.equal(18);
	});

	it('should be that that the second example resolves to 18', async () => {
		expect(runner((await read(year, day, 'example.2.txt')()).input)).to.equal(18);
	});
});
