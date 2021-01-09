import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '.';
import { runner } from './part_one';

describe('2019 - Day 12 - Part One', () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner()((await read(year, day)()).input)).to.equal(results.one.input);
	});

	it('should be that that the first examples resolves to 179 after 10 steps', async () => {
		expect(await runner(10)((await read(year, day, 'example.1.txt')()).input)).to.equal(179);
	});

	it('should be that that the second examples resolves to 1940 after a 100 steps', async () => {
		expect(await runner(100)((await read(year, day, 'example.2.txt')()).input)).to.equal(1940);
	});
});
