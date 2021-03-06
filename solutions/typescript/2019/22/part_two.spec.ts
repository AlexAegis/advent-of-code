import { read } from '@lib';
import { expect } from 'chai';
import { day, year } from '.';
import { runner } from './part_two';

describe('2019 - Day 22 - Part Two', () => {
	it('should resolve to 81781678911487 when using the input', async () => {
		expect(await runner()((await read(year, day)()).input)).to.equal(81781678911487);
	});

	it('should be that that the first example resolves to 104465755608520', async () => {
		expect(await runner()((await read(year, day, 'example.1.txt')()).input)).to.equal(
			104465755608520
		);
	});

	it('should be that that the second example resolves to 118925585929508', async () => {
		expect(await runner()((await read(year, day, 'example.2.txt')()).input)).to.equal(
			118925585929508
		);
	});

	it('should be that that the third example resolves to 21734143743040', async () => {
		expect(await runner()((await read(year, day, 'example.3.txt')()).input)).to.equal(
			21734143743040
		);
	});

	it('should be that that the fourth example resolves to 117607927195067', async () => {
		expect(await runner()((await read(year, day, 'example.4.txt')()).input)).to.equal(
			117607927195067
		);
	});
});
