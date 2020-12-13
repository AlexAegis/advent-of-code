import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe(`2020 - Day 13 - Part Two`, () => {
	it(`should solve the input`, async () => {
		expect(runner((await read(year, day)()).input)).to.equal(305068317272992);
	});

	it('should solve the first example', async () => {
		expect(runner((await read(year, day, 'example.1.txt')()).input)).to.equal(1068781);
	});

	it('should solve the second example', async () => {
		expect(runner((await read(year, day, 'example.2.txt')()).input)).to.equal(3417);
	});

	it('should solve the third example', async () => {
		expect(runner((await read(year, day, 'example.3.txt')()).input)).to.equal(754018);
	});

	it('should solve the fourth example', async () => {
		expect(runner((await read(year, day, 'example.4.txt')()).input)).to.equal(779210);
	});

	it('should solve the fifth example', async () => {
		expect(runner((await read(year, day, 'example.5.txt')()).input)).to.equal(1261476);
	});
	it('should solve the sixth example', async () => {
		expect(runner((await read(year, day, 'example.6.txt')()).input)).to.equal(1202161486);
	});
});
