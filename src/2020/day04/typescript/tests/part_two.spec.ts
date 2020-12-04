import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '..';
import { runner } from '../part_two';

describe(`2020 - Day 4 - Part Two`, () => {
	it(`should solve the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(224);
	});

	it('should solve the first example', async () => {
		expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(336);
	});

	it('should solve the all valid example', async () => {
		expect(await runner((await read(year, day, 'example.valid.txt')()).input)).to.equal(4);
	});

	it('should solve the all invalid example', async () => {
		expect(await runner((await read(year, day, 'example.invalid.txt')()).input)).to.equal(0);
	});
});
