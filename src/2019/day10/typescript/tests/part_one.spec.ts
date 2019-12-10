import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_one';

describe(`${year} - Day ${day} - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner((await read(year, day)()).input)).to.equal(results.one.input);
	});

	it('should be that that the first example resolves to 8', async () => {
		expect(await runner((await read(year, day, 'example.1.txt')()).input)).to.equal(8);
	});

	it('should be that that the second example resolves to 33', async () => {
		expect(await runner((await read(year, day, 'example.2.txt')()).input)).to.equal(33);
	});

	it('should be that that the third example resolves to 35', async () => {
		expect(await runner((await read(year, day, 'example.3.txt')()).input)).to.equal(35);
	});

	it('should be that that the fourth example resolves to 41', async () => {
		expect(await runner((await read(year, day, 'example.4.txt')()).input)).to.equal(41);
	});

	it('should be that that the fifth example resolves to 210', async () => {
		expect(await runner((await read(year, day, 'example.5.txt')()).input)).to.equal(210);
	});
});
