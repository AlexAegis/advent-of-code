import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '.';
import { runner } from './part_two';

describe('2019 - Day 24 - Part Two', () => {
	it('should solve the input', async () => {
		expect(await runner()((await read(year, day)()).input)).to.equal(results.two.input);
	}).timeout(20000);

	it('should resolve to 99 when using the first example', async () => {
		expect(await runner(10)((await read(year, day, 'example.1.txt')()).input)).to.equal(99);
	});
});
// `[a-zA-Z0-9 ]+`
