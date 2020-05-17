import { read } from '@lib';
import { expect } from 'chai';
import { day, results, year } from '..';
import { runner } from '../part_one';

describe(`${year} - Day ${day} - Part One`, () => {
	it(`should resolve to ${results.one.input} when using the input`, async () => {
		expect(await runner()((await read(year, day)()).input)).to.equal(results.one.input);
	});

	it('should be that that the first example resolves to 4126', async () => {
		expect(await runner()((await read(year, day, 'example.1.txt')()).input)).to.equal(4126);
	});

	it('should be that that the second example resolves to 5922', async () => {
		expect(await runner()((await read(year, day, 'example.2.txt')()).input)).to.equal(5922);
	});

	it('should be that that the third example resolves to 7115', async () => {
		expect(await runner()((await read(year, day, 'example.3.txt')()).input)).to.equal(7115);
	});

	it('should be that that the fourth example resolves to 1219', async () => {
		expect(await runner()((await read(year, day, 'example.4.txt')()).input)).to.equal(1219);
	});
});
