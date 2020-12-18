import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2018 - Day 13 - Part Two', () => {
	it('should solve the input', async () => {
		expect(await runner((await read(year, day)()).input)).to.equal('36,123');
	});

	it('should solve the first example', async () => {
		expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(undefined);
	});

	it('should solve the second example', async () => {
		expect(await runner((await read(year, day, 'example.2.txt')()).input)).to.equal('6,4');
	});
});
