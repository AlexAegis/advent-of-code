import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two.memoized';

describe('2020 - Day 10 - Part Two (Memoized)', () => {
	it('should solve the input', async () => {
		expect(runner((await read(year, day)()).input)).to.equal(169255295254528);
	});

	it('should solve the first example', async () => {
		expect(runner((await read(year, day, 'example.1.txt')()).input)).to.equal(8);
	});

	it('should solve the second example', async () => {
		expect(runner((await read(year, day, 'example.2.txt')()).input)).to.equal(19208);
	});
});
